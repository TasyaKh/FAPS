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
const points_service_1 = require("../../services/points.service");
const user_service_1 = require("../../services/user.service");
const auth_service_1 = require("../../services/auth.service");
const roles_1 = require("../../roles");
const router = (0, express_1.Router)();
exports.default = (app) => {
    // --------------------------------------------------------------------------------------------------------------
    // localities
    // --------------------------------------------------------------------------------------------------------------
    app.use('/points', router);
    // /api/points
    router.get('/solutions-localities', auth_service_1.verifyUserToken, (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            district_id: celebrate_1.Joi.number(),
        }),
    }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            const userId = req.user.id;
            const body = req.query;
            const pointsService = new points_service_1.PointsService();
            const result = yield pointsService.getSolutionsLocalities(userId, body);
            res.json(result);
        }
    }));
    // update calculator points locality
    router.post('/conditions-localities', auth_service_1.verifyUserToken, (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            min_dist_mc: celebrate_1.Joi.number(),
            population_FAP: celebrate_1.Joi.number(),
            population_Ambulatory: celebrate_1.Joi.number(),
        }),
    }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            const userId = req.user.id;
            const pointsService = new points_service_1.PointsService();
            try {
                const uS = new user_service_1.UserService();
                const user = yield uS.getUser(userId);
                yield pointsService.createOrUpdateConditionsLocality(user, req.body);
            }
            catch (err) {
                res.status(500).json({ message: err });
                console.log(err);
            }
            res.status(200).json({ message: "Сохранено" });
        }
    }));
    // get conditions-localities
    router.get('/conditions-localities', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            const userId = req.user.id;
            const pointsService = new points_service_1.PointsService();
            try {
                const data = yield pointsService.getConditionsLocality(userId);
                return res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json({ message: err });
                console.log(err);
            }
        }
    }));
    // --------------------------------------------------------------------------------------------------------------
    // medical centers
    // --------------------------------------------------------------------------------------------------------------
    // get api/points-mcs
    router.get('/points-mcs', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            const userId = req.user.id;
            const pointsService = new points_service_1.PointsService();
            try {
                const data = yield pointsService.getPointsMCS(userId);
                return res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json({ message: err });
                console.log(err);
            }
        }
    }));
    // post api/points-mcs
    router.post('/points-mcs', auth_service_1.verifyUserToken, (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            adult_population: celebrate_1.Joi.number(),
            child_population: celebrate_1.Joi.number(),
            max_found_year: celebrate_1.Joi.number(),
            foundation_year: celebrate_1.Joi.number(),
            staffing: celebrate_1.Joi.number(),
            state: celebrate_1.Joi.number(),
            each_pers_staffing: celebrate_1.Joi.number(),
        }),
    }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            const userId = req.user.id;
            const pointsService = new points_service_1.PointsService();
            try {
                const uS = new user_service_1.UserService();
                const user = yield uS.getUser(userId);
                yield pointsService.createOrUpdatePointsMCS(user, req.body);
            }
            catch (err) {
                res.status(500).json({ message: err });
                console.log(err);
            }
            res.status(200).json({ message: "Сохранено" });
        }
    }));
    // /api/solutions-mcs
    router.get('/solutions-mcs', auth_service_1.verifyUserToken, (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            district_id: celebrate_1.Joi.number(),
        }),
    }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            const userId = req.user.id;
            const body = req.query;
            const pointsService = new points_service_1.PointsService();
            const result = yield pointsService.getSolutionsMCS(userId, body, res);
            res.json(result);
        }
    }));
};
//# sourceMappingURL=points.routes.js.map