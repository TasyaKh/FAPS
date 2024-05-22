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
const uploads_service_1 = require("../../services/uploads.service");
const celebrate_1 = require("celebrate");
const auth_service_1 = require("../../services/auth.service");
const roles_1 = require("../../roles");
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/uploads', router);
    // /api/uploads/excel/solutions-localities
    router.get('/excel/solutions-localities', auth_service_1.verifyUserToken, (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            district_id: celebrate_1.Joi.number(),
        }),
    }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            const userId = req.user.id;
            const body = req.query;
            const uploadsService = new uploads_service_1.UploadsService();
            try {
                yield uploadsService.getExcelSolutionsLocalities(userId, res, body);
            }
            catch (err) {
                res.status(500).json({ message: err });
            }
        }
    }));
    // /api/uploads/excel/solutions-mcs
    router.get('/excel/solutions-mcs', auth_service_1.verifyUserToken, (0, celebrate_1.celebrate)({
        params: celebrate_1.Joi.object({
            district_id: celebrate_1.Joi.number(),
        }),
    }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            const userId = req.user.id;
            const body = req.query;
            const uploadsService = new uploads_service_1.UploadsService();
            try {
                yield uploadsService.getExcelSolutionsMCS(userId, res, body);
            }
            catch (err) {
                res.status(500).json({ message: err });
            }
        }
    }));
};
//# sourceMappingURL=uploads.routes.js.map