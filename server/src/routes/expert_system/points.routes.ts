import {Router} from 'express'
import {
    getPointsMedicalCentersOfDistrict,
} from "../../services/database/points_medical_center.service";
import {getPointsLocalitiesOfDistrict} from '../../services/database/points_locality.service';
import { PointsValues} from "../../classes/points";

const router = Router()

export default (app: Router) => {
    app.use('/points', router)
// /api/points
    router.post(
        '/',
        [],
        async (req, res) => {

            const values = new PointsValues()

            const {min_dist_mc, population_FAP, population_Ambulatory} = req.body;

            // await setConditionsLocality()
            res.json({
                success: true
            })
            //res.json(r)
        }
    )

// getPointsLocalitiesOfDistrict
    router.post(
        '/localities',
        [],
        async (req, res) => {

            const r = await getPointsLocalitiesOfDistrict(req, res)
            res.json(r)
        }
    )

//getPointsMedicalCentersOfDistrict
    router.post(
        '/medical-centers',
        [],
        async (req, res) => {
            const r = await getPointsMedicalCentersOfDistrict(req, res)
            res.json(r)
        }
    )


}

