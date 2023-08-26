var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { PointsConditions, PointsValues } from "../../services/classes/points.js";
import { getPointsMedicalCentersOfDistrict, setPointsMedicalCenters } from "../../services/points_medical_center.service.js";
import { getPointsLocalitiesOfDistrict, setPointsLocalities } from '../../services/points_locality.service.js';
const router = Router();
// /api/points
router.post('/', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const values = new PointsValues();
    const conditions = new PointsConditions();
    values.pointsAdult = (_a = req.body.pointsAdult) !== null && _a !== void 0 ? _a : 0;
    values.pointsChild = (_b = req.body.pointsChild) !== null && _b !== void 0 ? _b : 0;
    values.pointsStaffing = (_c = req.body.pointsStaffing) !== null && _c !== void 0 ? _c : 0;
    values.pointsState = (_d = req.body.pointsState) !== null && _d !== void 0 ? _d : 0;
    values.pointsPMSP = (_e = req.body.pointsPMSP) !== null && _e !== void 0 ? _e : 0;
    values.pointsAge = (_f = req.body.pointsAge) !== null && _f !== void 0 ? _f : 0;
    values.deteroationGood = (_g = req.body.deteroationGood) !== null && _g !== void 0 ? _g : 0;
    values.deteroationMedium = (_h = req.body.deteroationMedium) !== null && _h !== void 0 ? _h : 0;
    values.deteroationBad = (_j = req.body.deteroationBad) !== null && _j !== void 0 ? _j : 0;
    values.deteroationOld = (_k = req.body.deteroationOld) !== null && _k !== void 0 ? _k : 0;
    values.pointsUnfit = (_l = req.body.pointsUnfit) !== null && _l !== void 0 ? _l : 0;
    conditions.PMSPKm = (_m = req.body.PMSPKm) !== null && _m !== void 0 ? _m : 0;
    conditions.ageYears = (_o = req.body.ageYears) !== null && _o !== void 0 ? _o : 0;
    conditions.staffingPersent = (_p = req.body.staffingPersent) !== null && _p !== void 0 ? _p : 0;
    setPointsMedicalCenters(req, res, values, conditions);
    const r = yield setPointsLocalities(req, res, values, conditions);
    res.json({
        success: true
    });
    //res.json(r)
}));
// getPointsLocalitiesOfDistrict
router.post('/localities', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const r = yield getPointsLocalitiesOfDistrict(req, res);
    res.json(r);
}));
//getPointsMedicalCentersOfDistrict
router.post('/medical-centers', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const r = yield getPointsMedicalCentersOfDistrict(req, res);
    res.json(r);
}));
export default router;
//# sourceMappingURL=points.routes.js.map