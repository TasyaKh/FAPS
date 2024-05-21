import {Router} from 'express'
import {UploadsService} from "../../services/uploads.service";
import {celebrate, Joi} from "celebrate";
import {LocalitiesAndNearMcsDto} from "../../dto/distance.dto";
import {checkUserRoleOrErr, verifyUserToken} from "../../services/auth.service";
import {Roles} from "../../roles";
import {MedicalCenterDto} from "../../dto/points_medical_center.dto";

const router = Router()

export default (app: Router) => {
    app.use('/uploads', router)
    // /api/uploads/excel/solutions-localities
    router.get(
        '/excel/solutions-localities',
        verifyUserToken,
        celebrate({
            params: Joi.object({
                district_id: Joi.number(),
            }),
        }),
        async (req, res) => {
            const granted = checkUserRoleOrErr(req, res, Roles.EXPERT)
            if (granted) {
                const userId = req.user.id
                const body = req.query as LocalitiesAndNearMcsDto

                const uploadsService = new UploadsService()
                try {
                    await uploadsService.getExcelSolutionsLocalities(userId, res, body)
                } catch (err) {
                    res.status(500).json({message: err})
                }
            }
        }
    )
    // /api/uploads/excel/solutions-mcs
    router.get(
        '/excel/solutions-mcs',
        verifyUserToken,
        celebrate({
            params: Joi.object({
                district_id: Joi.number(),
            }),
        }),
        async (req, res) => {
            const granted = checkUserRoleOrErr(req, res, Roles.EXPERT)
            if (granted) {
                const userId = req.user.id
                const body = req.query as MedicalCenterDto

                const uploadsService = new UploadsService()
                try {
                    await uploadsService.getExcelSolutionsMCS(userId, res, body)
                } catch (err) {
                    res.status(500).json({message: err})
                }
            }
        }
    )
}

