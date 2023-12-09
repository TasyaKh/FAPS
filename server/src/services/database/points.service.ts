import {ConditionsLocalityDto} from "../../classes/conditions_locality.dto";
import AppDataSource from "../../typeorm.config";
import {ConditionsLocality} from "../../entities/conditions_locality.entity";
import {User} from "../../entities/user.entity";
import {CustomSolutionsLocalities, LocalitiesAndNearMcsDto} from "../../classes/distance.dto";
import {DistanceService} from "./distance.service";
import {RuleEngine} from "../rules";

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

    async  getSolutionsLocalities(body:LocalitiesAndNearMcsDto){

        // get localities and nearest faps
        const dS = new DistanceService()

        const lMcs = await dS.getLocalitiesAndNearMcs(body)

        // get conditions from database
        const pointsService = new PointsService()
        // TODO: default user 1
        const existingConditions = await pointsService.getConditionsLocality(1)

        // init rules
        const rE = new RuleEngine()
        if(existingConditions)
            rE.setConditions(existingConditions)
        rE.initializeRules()

        const result:CustomSolutionsLocalities[] = []
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
}
