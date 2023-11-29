import { Router } from 'express'
import {getPointsMedicalCentersOfDistrict, setPointsMedicalCenters} from "../../services/database/points_medical_center.service.js";
import { getPointsLocalitiesOfDistrict, setPointsLocalities } from '../../services/database/points_locality.service.ts';
import {PointsConditions, PointsValues} from "../../classes/points.js";

const router = Router()

// /api/points
router.post(
  '/',
  [],
  async (req, res) => {

    const values = new PointsValues()

    const conditions = new PointsConditions()

    values.pointsAdult = req.body.pointsAdult ?? 0
    values.pointsChild = req.body.pointsChild ?? 0
    values.pointsStaffing = req.body.pointsStaffing ?? 0
    values.pointsState = req.body.pointsState ?? 0
    values.pointsPMSP = req.body.pointsPMSP ?? 0
    values.pointsAge = req.body.pointsAge ?? 0

    values.deteroationGood = req.body.deteroationGood ?? 0
    values.deteroationMedium = req.body.deteroationMedium ?? 0
    values.deteroationBad = req.body.deteroationBad ?? 0
    values.deteroationOld = req.body.deteroationOld ?? 0
    values.pointsUnfit = req.body.pointsUnfit ?? 0

    conditions.PMSPKm = req.body.PMSPKm ?? 0
    conditions.ageYears = req.body.ageYears ?? 0
    conditions.staffingPersent = req.body.staffingPersent ?? 0


    await setPointsMedicalCenters(req, res, values, conditions)
    await setPointsLocalities(req, res, values, conditions)
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

