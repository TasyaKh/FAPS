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
const medical_center_service_1 = require("../../services/medical_center.service");
const locality_service_1 = require("../../services/locality.service");
const dev_service_1 = require("../../services/dev.service");
const organization_service_1 = require("../../services/organization.service");
const auth_service_1 = require("../../services/auth.service");
const roles_1 = require("../../roles");
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/dev', router);
    // /api/dev_fetch_data/openrouteservice_distances get distances from openrouteservice
    router.post('/openrouteservice_distances', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.ADMIN);
        if (granted) {
            const dev = new dev_service_1.DevService();
            try {
                const requestBody = req.body;
                let localities = null; //населенные пункты
                let mcs = null; //мед центры
                let mcsDistrict = null; //районные больницы
                // get by district_id
                if (requestBody.district_id) {
                    // get localities in discrict
                    localities = yield (0, locality_service_1.getLocalitiesByDistrictId)(requestBody.district_id);
                    // get medical facilities
                    mcsDistrict = yield (0, organization_service_1.getOrganizationsByDistrictId)(requestBody.district_id);
                }
                // get by region_id
                if (requestBody.region_id) {
                    const mc = {};
                    mc.region_id = requestBody.region_id;
                    mcs = yield (0, medical_center_service_1.getMedicalCenters)(mc, res);
                }
                for (let i = 0; i < (localities === null || localities === void 0 ? void 0 : localities.length); i++) {
                    const l = localities[i];
                    let localitiesCoords = [l.longitude, l.latitude];
                    // расстояние до районных больниц
                    yield dev.findAndSaveDistanceToOrg(l, mcsDistrict);
                    // filter medical centers by circled distance (Euclidean)
                    const mcsFiltered = yield dev.filterMCsHaversine(localitiesCoords, mcs, requestBody.distance);
                    // найти расстояния от заданного нп до мед учреждений
                    yield dev.findAndSaveDistancesToLocality(l, mcsFiltered);
                }
                res.json(localities);
            }
            catch (error) {
                res.status(400).json({ error: error });
            }
        }
    }));
};
//# sourceMappingURL=dev.routes.js.map