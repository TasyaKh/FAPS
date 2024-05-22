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
const distance_service_1 = require("../../services/distance.service");
const celebrate_1 = require("celebrate");
const distance_dto_1 = require("../../dto/distance.dto");
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/distance', router);
    // /api/distance/mc
    router.post('/mc', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const distService = new distance_service_1.DistanceService();
        try {
            const requestBody = req.body;
            const dist = new distance_dto_1.DistanceDto();
            dist.locality_id = requestBody.locality_id;
            let distances = yield distService.getDistToMc(res, dist);
            res.json(distances);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }));
    // /api/distance/localities-nearest-faps
    router.get('/localities-nearest-faps', (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            district_id: celebrate_1.Joi.number(),
            population_id: celebrate_1.Joi.number()
        }),
    }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const dto = req.query;
        const dS = new distance_service_1.DistanceService();
        const lMc = yield dS.getLocalitiesAndNearMcs(dto);
        return res.json(lMc);
    }));
};
//# sourceMappingURL=distance.routes.js.map