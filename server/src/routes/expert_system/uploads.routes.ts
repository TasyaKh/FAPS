import {Router} from 'express'
import {UploadsService} from "../../services/database/uploads.service";
import {celebrate, Joi} from "celebrate";
import {LocalitiesAndNearMcsDto} from "../../classes/distance.dto";

const router = Router()

export default (app: Router) => {
    app.use('/uploads', router)
// /api/uploads
    router.get(
        '/excel/solutions-localities',
        celebrate({
            params: Joi.object({
                district_id: Joi.number(),
            }),
        }),
        async (req, res) => {
            const body = req.query as LocalitiesAndNearMcsDto

            const uploadsService = new UploadsService()
            try {
                await uploadsService.getExcelSolutionsLocalities(res, body)
            } catch (err) {
                res.status(500).json({message: err})
            }
        }
    )
}

