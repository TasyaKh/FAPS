import {Router} from 'express'
import {
    getPointsMedicalCentersOfDistrict,
    setPointsMedicalCenters
} from "../../services/database/points_medical_center.service.js";
import {getPointsLocalitiesOfDistrict, setPointsLocalities} from '../../services/database/points_locality.service.ts';
import {PointsConditions, PointsValues} from "../../classes/points.js";

const router = Router()

// /api/points
router.post(
    '/',
    [],
    async (req, res) => {

        const values = new PointsValues()

        const {min_dist_mc, population_FAP, population_Ambulatory} = req.body;

        await setConditionsLocality()
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


export default router

