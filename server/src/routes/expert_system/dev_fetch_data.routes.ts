import express, {Router} from 'express'
import {getMedicalCenters} from "../../services/medical_center.service";
import {getLocalitiesByDistrictId} from "../../services/locality.service";
import {DevService} from "../../services/dev.service";
import {getOrganizationsByDistrictId} from "../../services/organization.service";
import {checkUserRoleOrErr, verifyUserToken} from "../../services/auth.service";
import {Roles} from "../../roles";
import {MedicalCenterDto} from "../../dto/points_medical_center.dto";

const router = Router()
export default (app: Router) => {
    app.use('/dev_fetch_data', router)
// /api/cluster get distances from openrouteservice
    router.post(
        '/openrouteservice_distances',
        verifyUserToken,
        async (req: express.Request, res: express.Response) => {
            checkUserRoleOrErr(req, res, Roles.ADMIN)
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
                    const mc:MedicalCenterDto = {}
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
                res.status(400).json({error: error});
            }
        }
    )

}

