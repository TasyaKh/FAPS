import {Router} from 'express'
import {celebrate, Joi} from "celebrate";
import {MedicalCenterDto} from "../../dto/points_medical_center.dto";
import {getMedicalCenters} from "../../services/medical_center.service";

const router = Router()

export default (app: Router) => {
    app.use('/medical-centers', router)
    // /api/medical-centers
    router.get(
        '',
        celebrate({
            params: Joi.object({
                district_id: Joi.number(),
            }),
        }),
        async (req, res) => {

            const body: MedicalCenterDto = req.query

            const result = await getMedicalCenters(body, res)
            res.json(result)
        }
    )
}

