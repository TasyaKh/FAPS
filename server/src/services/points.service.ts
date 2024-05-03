import {ConditionsLocalityDto} from "../dto/conditions_locality.dto";
import AppDataSource from "../typeorm.config";
import {ConditionsLocality} from "../entities/conditions_locality.entity";
import {User} from "../entities/user.entity";
import {CustomSolutionsLocalities, LocalitiesAndNearMcsDto} from "../dto/distance.dto";
import {DistanceService} from "./distance.service";
import {RuleEngine} from "./rules";
import {PointsMedicalCenter} from "../entities/points_medical_center.entity";
import {MedicalCenterDto, PointsMedicalCenterDto, SolutionsMCS} from "../dto/points_medical_center.dto";
import {getMedicalCenters} from "./medical_center.service";
import express from "express";

export class PointsService {

    async createOrUpdateConditionsLocality(user: User, conditionsLocalityDto: ConditionsLocalityDto) {

        const cLRepo = AppDataSource.getRepository(ConditionsLocality)
        const cLUser = await cLRepo.findOne({where: {user: user}})

        if (cLUser) {
            await this.updateConditionsLocality(cLUser.id, conditionsLocalityDto)
        } else {
            await this.createConditionsLocality(user, conditionsLocalityDto)
        }
    }

    async createConditionsLocality(user: User, conditionsLocalityDto: ConditionsLocalityDto) {
        const cLRepo = AppDataSource.getRepository(ConditionsLocality)
        const query = cLRepo.create({user: user, ...conditionsLocalityDto})
        return await cLRepo.insert(query)
    }

    async updateConditionsLocality(id: number, conditionsLocalityDto: ConditionsLocalityDto) {
        const cLRepo = AppDataSource.getRepository(ConditionsLocality)
        return await cLRepo.update(id, {...conditionsLocalityDto})
    }

    async getConditionsLocality(userId: number) {
        const cLRepo = AppDataSource.getRepository(ConditionsLocality)
        const query = cLRepo.createQueryBuilder("conditions_locality")
            .where("conditions_locality.user_id = :user_id", {user_id: userId});
        return await query.getOne()
    }

    async getSolutionsLocalities(userId: number, body: LocalitiesAndNearMcsDto) {

        // get localities and nearest faps
        const dS = new DistanceService()

        const lMcs = await dS.getLocalitiesAndNearMcs(body)

        const existingConditions = await this.getConditionsLocality(userId)

        // init rules
        const rE = new RuleEngine()
        if (existingConditions)
            rE.setConditions(existingConditions)
        rE.initializeRules()

        const result: CustomSolutionsLocalities[] = []
        if (lMcs)
            for (let i = 0; i < lMcs.length; i++) {
                const el = lMcs[i]
                rE.facts = {
                    populationMC: el.mc_population_population_adult,
                    populationNP: el.population_population_adult,
                    staffComposition: el.mc_staffing,
                    facilityType: el.mc_type_name,
                    distanceMc: el.min_distance / 1000 // convert to km
                }
                const reEvents = await rE.runEngine()
                result.push({data: el, solutions: reEvents})
            }

        return result
    }

    // --------------------------------------------------------------------------------------------------------------
    // medical centers
    // --------------------------------------------------------------------------------------------------------------
    async getPointsMCS(userId: number) {
        const mcRepo = AppDataSource.getRepository(PointsMedicalCenter)
        const query = mcRepo.createQueryBuilder("points_medical_center")
            .where("points_medical_center.user_id = :user_id", {user_id: userId});
        return await query.getOne()
    }

    async createPointsMCS(user: User, pMC: PointsMedicalCenterDto) {
        const mcRepo = AppDataSource.getRepository(PointsMedicalCenter)
        const query = mcRepo.create({user: user, ...pMC})
        return await mcRepo.insert(query)
    }

    async updatePointsMCS(id: number, pMC: PointsMedicalCenterDto) {
        const mcRepo = AppDataSource.getRepository(PointsMedicalCenter)
        return await mcRepo.update(id, {...pMC})
    }

    async createOrUpdatePointsMCS(user: User, pMC: PointsMedicalCenterDto) {

        const mcRepo = AppDataSource.getRepository(PointsMedicalCenter)
        const cLUser = await mcRepo.findOne({where: {user: user}})

        if (cLUser) {
            await this.updatePointsMCS(cLUser.id, pMC)
        } else {
            await this.createPointsMCS(user, pMC)
        }
    }


    async getSolutionsMCS(userId: number, body: MedicalCenterDto, res: express.Response) {

        const existingConditions = await this.getPointsMCS(userId)

        if (!existingConditions) {
            return null
        } else {
            const mcs = await getMedicalCenters(body, res)

            const points: SolutionsMCS[] = []

            mcs.forEach((mc, index) => {
                const p: SolutionsMCS = {}
                const currYear = new Date().getFullYear()
                if (currYear - mc?.founding_year >= existingConditions.max_found_year)
                    p.foundation_year = Number((existingConditions.foundation_year).toFixed(1))
                p.staffing = Number(((((1.0 - mc?.staffing) * 100) / existingConditions.each_pers_staffing) * existingConditions.staffing)
                    .toFixed(1))
                p.state = Number((mc.building_condition?.state === 'строится' ? existingConditions.state : 0)
                    .toFixed(1))
                p.adult_population = Number((mc.locality?.population?.population_adult * existingConditions.adult_population)
                    .toFixed(1))
                p.child_population = Number((mc.locality?.population?.population_child * existingConditions.child_population)
                    .toFixed(1))

                p.sum = p.foundation_year + p.staffing + p.state + p.adult_population + p.child_population
                p.mc = mc

                points.push(p)
            })

            return points
        }
    }
}
