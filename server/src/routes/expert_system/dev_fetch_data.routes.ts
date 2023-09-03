import express, {Router} from 'express'
import {DistanceOpenRoute} from "../../services/findDistandeOpenRoute.service.js";
import {getMedicalCenters} from "../../services/database/medical_center.service.js";
import MC from "../../enities/medical_center.entity.js";
import {DistanceService} from "../../services/database/distance.service.js";
import Distance from "../../enities/distance.entity.js";
import {getLocalitiesByDistrictId} from "../../services/database/locality.service.js";
import {DevService} from "../../services/database/dev.service.js";
import {getOrganizationsByDistrictId} from "../../services/database/organization.service.js";

const router = Router()

// /api/cluster get distances from openrouteservice
router.post(
    '/openrouteservice_distances',
    [],
    async (req: express.Request, res: express.Response) => {

        const dev = new DevService()

        try {
            const requestBody = req.body;


            let localities: any = null  //населенные пункты
            let mcs: any = null         //мед центры
            let mcsDistrict = null    //районные больницы

            if (requestBody.district_id) {
                // get localities of discrict
                localities = await getLocalitiesByDistrictId(requestBody.district_id)
                // get medical facilities
                mcsDistrict = await getOrganizationsByDistrictId(requestBody.district_id)

            }

            // get mc_centers by disctrict
            if (requestBody.region_id) {
                const mc = new MC()
                mc.region_id = requestBody.region_id
                // mc.district_id = requestBody.district_id
                mcs = await getMedicalCenters(mc, res)
            }


            for (let i = 0; i < localities?.length; i++) {
                const l = localities[i]
                let localitiesCoords: number[] = [l["longitude"], l["latitude"]]

                // расстояние до районных больниц

                await dev.findAndSaveDistanceToOrg(l, mcsDistrict)

                // filter medical centers by circled distance
                const mcsFiltered = await dev.filterMCsHaversine(localitiesCoords, mcs, requestBody.distance)

                // if(l.id === 133)console.log(mcsFiltered)
                // найти расстояния от заданного нп до мед учреждений
                await dev.findAndSaveDistancesToLocality(l, mcsFiltered)
            }

            // await dev.findAndSaveDistances(localities, mcs)

            res.json(mcs)

        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }
        //res.json(r)
    }
)

export default router

