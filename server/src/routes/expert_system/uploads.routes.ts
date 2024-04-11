import {Router} from 'express'
import {UploadsService} from "../../services/database/uploads.service";
import {celebrate, Joi} from "celebrate";
import {LocalitiesAndNearMcsDto} from "../../dto/distance.dto";
import {checkUserRoleOrErr, verifyUserToken} from "../../services/database/auth.service";
import {Roles} from "../../roles";

const router = Router()

export default (app: Router) => {
    app.use('/uploads', router)
// /api/uploads
    router.get(
        '/excel/solutions-localities',
        verifyUserToken,
        celebrate({
            params: Joi.object({
                district_id: Joi.number(),
            }),
        }),
        async (req, res) => {

            const userId = req.user.id
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            const body = req.query as LocalitiesAndNearMcsDto

            const uploadsService = new UploadsService()
            try {
                await uploadsService.getExcelSolutionsLocalities(userId, res, body)
            } catch (err) {
                res.status(500).json({message: err})
            }
        }
    )
}

