"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const medical_center_service_1 = require("../../services/medical_center.service");
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/medical-centers', router);
    // /api/medical-centers
    router.get('', (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            district_id: celebrate_1.Joi.number(),
        }),
    }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.query;
        const result = yield (0, medical_center_service_1.getMedicalCenters)(body, res);
        res.json(result);
    }));
};
//# sourceMappingURL=medical_centers.routes.js.map