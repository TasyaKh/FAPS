import { Router } from 'express'
import { getPointsMedicalCentersOfDistrict, setPointsMedicalCenters } from './services/points_medical_center.service.js'
import { setPointsLocalities, getPointsLocalitiesOfDistrict } from './services/points_locality.service.js'
import { PointsConditions, PointsValues } from './services/classes/points.js'
// import {exec } from "child_process"

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
   
    // const pythonFile = "test.py"
    //  exec(`python ${pythonFile}`, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`Error executing Python file: ${error.message}`);
    //     return;
    //   }
    //   if (stderr) {
    //     console.error(`Python error: ${stderr}`);
    //     return;
    //   }
    //   console.log(`Python output: ${stdout}`);
    // });


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

