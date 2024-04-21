import {DistanceDto, LocalitiDistToNearectMC, LocalitiesAndNearMcsDto} from "../dto/distance.dto";
import AppDataSource from "../typeorm.config";
import Distance from "../entities/distance.entity";
import express from "express";
import Locality from "../entities/locality.entity";
import MedicalCenter from "../entities/medical_center.entity";
import {MedicalFacility} from "../entities/medical_facility.entity";
import {Type} from "../entities/types.entity";
import {Population} from "../entities/population.entity";
import {SelectQueryBuilder} from "typeorm";

export class DistanceService {

    async saveDistance(distance: DistanceDto) {

        const entityManager = AppDataSource.createEntityManager()

        await this.delDistance(distance)

        const query: string = `INSERT INTO distance (
        distance, duration, locality_id, mc_id, mc_facility_id) 
        VALUES (?, ?, ?, ?, ?)`

        try {
            return await entityManager.query(query, distance.getArray())
        } catch (err) {
            return false
        }

    }

    // получить расстояния до мед учреждений по заданым параметрам
    async getDistToMc(res: express.Response, distance: DistanceDto) {

        const distRepository = AppDataSource.getRepository(Distance);
        let distances: Distance[]
        try {
            let query = distRepository.createQueryBuilder('distance')
                .select(['distance.id', 'distance.duration', 'distance.distance', 'mc.id', 'mc.name', 'mc.staffing',
                    'mc.longitude', 'mc.latitude'])
                .leftJoin('distance.medical_center', 'mc')
                .where('distance.mc_id IS NOT NULL')
                .limit(distance.limit)
                .orderBy(' distance.distance', 'ASC')

            distance.locality_id ? query.andWhere('distance.locality_id = :locality_id',
                {locality_id: distance.locality_id}) : query

            distances = await query.getMany()
        } catch (err) {
            res.status(500).json({error: err})
        }

        return distances
    }

// Удалить существующие записи
    async delDistance(distance: DistanceDto) {
        let res: any
        const entityManager = AppDataSource.createEntityManager()

        // del Existig Localities
        const query: string = `DELETE FROM distance
        WHERE locality_id = ? and ((mc_id = ? and mc_id is not null)
         or (mc_facility_id = ? and mc_facility_id is not null))`

        try {
            res = await entityManager.query(query, [
                distance.locality_id, distance.mc_id, distance.mc_facility_id])
        } catch (err) {
            console.log(err, distance)
            return false
        }

        return res
    }

    async getLocalitiesAndNearMcs(locsAndNearMcsDto: LocalitiesAndNearMcsDto) {

        try {
            const localityRepository = AppDataSource.getRepository(Locality);
            let query = localityRepository
                .createQueryBuilder('locality')
                .select([
                    'locality.id',
                    'locality.district_id',
                    'locality.longitude',
                    'locality.latitude',
                    'locality.name',
                    'population.id',
                    'population.population_adult',
                    'population.population_child',
                    'COALESCE(dtmc.distance, 0) AS min_distance',
                    'dtmc.duration AS min_duration',

                    'mc.id AS mc_id',
                    'mc.longitude AS mc_longitude',
                    'mc.latitude AS mc_latitude',
                    'mc.name AS medical_center_name',
                    'mc.staffing AS mc_staffing',
                    'mc_type.name',
                    'mc_locality.id',
                    'mc_population.population_adult',


                    'mcf.id AS mcf_id',
                    'mcf.longitude AS mcf_longitude',
                    'mcf.latitude AS mcf_latitude',
                    'mcf.name AS mcf_name',
                    'mcf_type.name',

                    'dtmcf.distance AS min_facility_distance',
                    'dtmcf.duration AS min_facility_duration',
                ])
                .leftJoin('locality.population', 'population')
                .leftJoin(
                    subQuery => {
                        return subQuery
                            .select(['locality_id', 'MIN(distance) AS min_distance'])
                            .from(Distance, 'distance')
                            .where('mc_id IS NOT NULL AND mc_facility_id IS NULL')
                            .groupBy('locality_id');
                    },
                    'md',
                    'md.locality_id = locality.id'
                )
                // medical center
                .leftJoin(Distance, 'dtmc', 'dtmc.locality_id = locality.id AND dtmc.distance = md.min_distance')
                .leftJoin(MedicalCenter, 'mc', 'mc.id = dtmc.mc_id')
                .leftJoin(Type, 'mc_type', 'mc_type.id = mc.type_id')
                .leftJoin(Locality, 'mc_locality', 'mc_locality.id = mc.locality_id')
                .leftJoin(Population, 'mc_population', 'mc_locality.id = mc_population.locality_id')
                .leftJoin(
                    subQuery => {
                        return subQuery
                            .select(['locality_id', 'MIN(distance) AS min_distance'])
                            .from(Distance, 'distance')
                            .where('mc_facility_id IS NOT NULL AND mc_id IS NULL')
                            .groupBy('locality_id');
                    },
                    'mfd',
                    'mfd.locality_id = locality.id'
                )
                // medical organization
                .leftJoin(
                    Distance,
                    'dtmcf',
                    'dtmcf.locality_id = locality.id AND dtmcf.distance = mfd.min_distance'
                )
                .leftJoin(MedicalFacility, 'mcf', 'mcf.id = dtmcf.mc_facility_id')
                .leftJoin(Type, 'mcf_type', 'mcf_type.id = mcf.type_id')


            query = this.filterLocalitiesAndNearMcs(query, locsAndNearMcsDto)
            return query.getRawMany<LocalitiDistToNearectMC>()

        } catch (err) {
            console.log(err)
            return false
        }
    }

    private filterLocalitiesAndNearMcs(query: SelectQueryBuilder<Locality>, dto: LocalitiesAndNearMcsDto) {

        // district_id
        if (dto.district_id) {
            query.andWhere('locality.district_id = :district_id',
                {district_id: dto.district_id})
            // region_id
        } else if (dto.region_id) {
            query.leftJoin('locality.district', 'district')
                .andWhere('district.region_id = :region_id', {region_id: dto.region_id})
        }

        // search
        dto.search ?
            query.andWhere('LOWER(locality.name) LIKE :name', {name: `%${dto.search}%`})
            : null

        // ORDERS
        // population_population_adult_order
        dto.locality_name_order ? query.orderBy('locality.name',
            dto.locality_name_order) : query
        // population_population_adult_order
        dto.population_population_adult_order ? query.orderBy('population.population_adult',
            dto.population_population_adult_order) : query
        // medical_center_name_order
        dto.medical_center_name_order ? query.orderBy('mc.name',
            dto.medical_center_name_order) : query
        // mc_staffing_order
        dto.mc_staffing_order ? query.orderBy('mc.staffing',
            dto.mc_staffing_order) : query
        // mc_type_name_order
        dto.mc_type_name_order ? query.orderBy('mc_type.name',
            dto.mc_type_name_order) : query
        // min_distance_order
        dto.min_distance_order ? query.orderBy('dtmc.distance',
            dto.min_distance_order) : query
        // min_duration_order
        dto.min_duration_order ? query.orderBy('dtmc.duration',
            dto.min_duration_order) : query

        return query
    }

}