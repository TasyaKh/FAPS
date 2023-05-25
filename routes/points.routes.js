import { Router } from 'express'
import { setPointsMedicalCenters } from './services/points_medical_center.service.js'
import { setPointsLocalities, getPointsLocalitiesOfDistrict } from './services/points_locality.service.js'

import {PointsConditions, PointsValues } from './services/classes/points.js'

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

    
    setPointsMedicalCenters(req, res, values, conditions)
    const r = await setPointsLocalities(req, res, values, conditions)
    res.json(r)
  }
)

router.post(
  '/localities',
  [],
  async (req, res) => {
     const r = await getPointsLocalitiesOfDistrict(req, res)
     res.json(r)
  }
)


export default router

