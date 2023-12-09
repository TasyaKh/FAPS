import {Router} from 'express'
import {celebrate, Joi} from "celebrate";
import {ConditionsLocalityDto} from "../../classes/conditions_locality.dto";
import {PointsService} from "../../services/database/points.service";
import {UserService} from "../../services/database/user.service";
import {LocalitiesAndNearMcsDto} from "../../classes/distance.dto";

const router = Router()

export default (app: Router) => {
    app.use('/points', router)
// /api/points
    router.get(
        '/solutions-localities',
        celebrate({
            params: Joi.object({
                district_id: Joi.number(),
            }),
        }),
        async (req, res) => {
            const body = req.query as LocalitiesAndNearMcsDto

            const pointsService = new PointsService()
            const result = await pointsService.getSolutionsLocalities(body)

            res.json(result)
        }
    )

    router.post(
        '/conditions-localities',
        celebrate({
            params: Joi.object({
                min_dist_mc: Joi.number(),
                population_FAP: Joi.number(),
                population_Ambulatory: Joi.number(),
            }),
        }),
        async (req, res) => {
            const pointsService = new PointsService()
            try {
                const uS = new UserService()
                // TODO: default user 1
                const user = await uS.getUser(1)
                await pointsService.createOrUpdateConditionsLocality(user, req.body as ConditionsLocalityDto);
            }catch (err){
                res.status(500).json({message: err})
                console.log(err)
            }
            res.status(200).json({message:"saved"})
        }
    )

    router.get(
        '/conditions-localities',
       [],
        async (req, res) => {
            const pointsService = new PointsService()
            try {
                // TODO: default user 1
               const data =  await pointsService.getConditionsLocality(1);
               return  res.status(200).json(data)
            } catch (err) {
                res.status(500).json({message: err})
                console.log(err)
            }

        }
    )


// getPointsLocalitiesOfDistrict
//     router.post(
//         '/localities',
//         [],
//         async (req, res) => {
//             //
//             // const r = await getPointsLocalitiesOfDistrict(req, res)
//             // res.json(r)
//         }
//     )

//getPointsMedicalCentersOfDistrict
//     router.post(
//         '/medical-centers',
//         [],
//         async (req, res) => {
//             // const r = await getPointsMedicalCentersOfDistrict(req, res)
//             // res.json(r)
//         }
//     )


}

