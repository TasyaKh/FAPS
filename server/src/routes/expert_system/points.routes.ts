import {Router} from 'express'
import {celebrate, Joi} from "celebrate";
import {ConditionsLocalityDto} from "../../dto/conditions_locality.dto";
import {PointsService} from "../../services/database/points.service";
import {UserService} from "../../services/database/user.service";
import {LocalitiesAndNearMcsDto} from "../../dto/distance.dto";
import {checkUserRoleOrErr, verifyUserToken} from "../../services/database/auth.service";
import {Roles} from "../../roles";
import {MedicalCenterDto, PointsMedicalCenterDto} from "../../dto/points_medical_center.dto";

const router = Router()

export default (app: Router) => {
    // --------------------------------------------------------------------------------------------------------------
    // localities
    // --------------------------------------------------------------------------------------------------------------
    app.use('/points', router)
    // /api/points
    router.get(
        '/solutions-localities',
        verifyUserToken,
        celebrate({
            params: Joi.object({
                district_id: Joi.number(),
            }),
        }),
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            const userId = req.user.id
            const body = req.query as LocalitiesAndNearMcsDto

            const pointsService = new PointsService()
            const result = await pointsService.getSolutionsLocalities(userId, body)

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

    // get conditions-localities
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

    // --------------------------------------------------------------------------------------------------------------
    // medical centers
    // --------------------------------------------------------------------------------------------------------------
    // get api/points-mcs
    router.get(
        '/points-mcs',
        verifyUserToken,
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            const userId = req.user.id
            const pointsService = new PointsService()
            try {
                const data = await pointsService.getPointsMCS(userId);
                return res.status(200).json(data)
            } catch (err) {
                res.status(500).json({message: err})
                console.log(err)
            }
        }
    )

    // post api/points-mcs
    router.post(
        '/points-mcs',
        verifyUserToken,
        celebrate({
            params: Joi.object({
                adult_population: Joi.number(),
                child_population: Joi.number(),
                max_found_year: Joi.number(),
                foundation_year: Joi.number(),
                staffing: Joi.number(),
                state: Joi.number(),
                each_pers_staffing: Joi.number(),
            }),
        }),

        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            const userId = req.user.id

            const pointsService = new PointsService()
            try {
                const uS = new UserService()
                const user = await uS.getUser(userId)
                await pointsService.createOrUpdatePointsMCS(user, req.body as PointsMedicalCenterDto);
            } catch (err) {
                res.status(500).json({message: err})
                console.log(err)
            }

            res.status(200).json({message: "Сохранено"})
        }
    )

    // /api/solutions-mcs
    router.get(
        '/solutions-mcs',
        verifyUserToken,
        celebrate({
            params: Joi.object({
                district_id: Joi.number(),
            }),
        }),
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            const userId = req.user.id
            const body: MedicalCenterDto = req.query

            const pointsService = new PointsService()
            const result = await pointsService.getSolutionsMCS(userId, body, res)

            res.json(result)
        }
    )
}

