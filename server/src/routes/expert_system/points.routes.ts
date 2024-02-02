import {Router} from 'express'
import {celebrate, Joi} from "celebrate";
import {ConditionsLocalityDto} from "../../classes/conditions_locality.dto";
import {PointsService} from "../../services/database/points.service";
import {UserService} from "../../services/database/user.service";
import {LocalitiesAndNearMcsDto} from "../../classes/distance.dto";
import {checkUserRoleOrErr, verifyUserToken} from "../../services/database/auth.service";
import {Roles} from "../../roles";

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
    // update calculator points locality
    router.post(
        '/conditions-localities',
        verifyUserToken,
        celebrate({
            params: Joi.object({
                min_dist_mc: Joi.number(),
                population_FAP: Joi.number(),
                population_Ambulatory: Joi.number(),
            }),
        }),
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            const userId = req.user.id

            const pointsService = new PointsService()
            try {
                const uS = new UserService()
                const user = await uS.getUser(userId)
                await pointsService.createOrUpdateConditionsLocality(user, req.body as ConditionsLocalityDto);
            } catch (err) {
                res.status(500).json({message: err})
                console.log(err)
            }

            res.status(200).json({message: "Сохранено"})
        }
    )

    router.get(
        '/conditions-localities',
        verifyUserToken,
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            const userId = req.user.id
            const pointsService = new PointsService()
            try {
                const data = await pointsService.getConditionsLocality(userId);
                return res.status(200).json(data)
            } catch (err) {
                res.status(500).json({message: err})
                console.log(err)
            }
        }
    )
}

