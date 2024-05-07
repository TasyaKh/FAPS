import express, {Router} from 'express'
import {getMedicalCenters} from "../../services/medical_center.service";
import {getLocalitiesByDistrictId} from "../../services/locality.service";
import {DevService} from "../../services/dev.service";
import {getOrganizationsByDistrictId} from "../../services/organization.service";
import {checkUserRoleOrErr, verifyUserToken} from "../../services/auth.service";
import {Roles} from "../../roles";
import {MedicalCenterDto} from "../../dto/points_medical_center.dto";
import Locality from "../../entities/locality.entity";
import MedicalCenter from "../../entities/medical_center.entity";

const router = Router()
export default (app: Router) => {
    app.use('/dev', router)
    // /api/dev_fetch_data/openrouteservice_distances get distances from openrouteservice
    router.post(
        '/openrouteservice_distances',
        verifyUserToken,
        async (req: express.Request, res: express.Response) => {
            checkUserRoleOrErr(req, res, Roles.ADMIN)
            const dev = new DevService()

            try {
                const requestBody = req.body;

                let localities: Locality[] = null       //населенные пункты
                let mcs: MedicalCenter[] = null         //мед центры
                let mcsDistrict = null                  //районные больницы

                // get by district_id
                if (requestBody.district_id) {
                    // get localities in discrict
                    localities = await getLocalitiesByDistrictId(requestBody.district_id)
                    // get medical facilities
                    mcsDistrict = await getOrganizationsByDistrictId(requestBody.district_id)
                }

                // get by region_id
                if (requestBody.region_id) {
                    const mc: MedicalCenterDto = {}
                    mc.region_id = requestBody.region_id
                    mcs = await getMedicalCenters(mc, res)
                }

                for (let i = 0; i < localities?.length; i++) {
                    const l = localities[i]
                    let localitiesCoords: number[] = [l.longitude, l.latitude]

                    // расстояние до районных больниц
                    await dev.findAndSaveDistanceToOrg(l, mcsDistrict)

                    // filter medical centers by circled distance (Euclidean)
                    const mcsFiltered = await dev.filterMCsHaversine(localitiesCoords, mcs, requestBody.distance)

                    // найти расстояния от заданного нп до мед учреждений
                    await dev.findAndSaveDistancesToLocality(l, mcsFiltered)
                }
                res.json(localities)
            } catch (error) {
                res.status(400).json({error: error});
            }
        }
    )

}

