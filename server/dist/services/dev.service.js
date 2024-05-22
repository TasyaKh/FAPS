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
exports.DevService = void 0;
const distance_service_1 = require("./distance.service");
const findDistandeOpenRoute_service_1 = require("./outside/findDistandeOpenRoute.service");
const distance_dto_1 = require("../dto/distance.dto");
class DevService {
    haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = this.degToRad(lat2 - lat1);
        const dLon = this.degToRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degToRad(lat1)) * Math.cos(this.degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    degToRad(degrees) {
        return degrees * (Math.PI / 180);
    }
    // получить расстояния между заданным НП и мед учреждениями и мохранить в бд
    findAndSaveDistancesToLocality(locality, mcs) {
        return __awaiter(this, void 0, void 0, function* () {
            const dS = new distance_service_1.DistanceService();
            const dist = new findDistandeOpenRoute_service_1.DistanceOpenRoute();
            let localitiyCoords = [locality["longitude"], locality["latitude"]];
            // med_centers
            for (let k = 0; k < (mcs === null || mcs === void 0 ? void 0 : mcs.length); k++) {
                const mc = mcs[k];
                let fapCoords = [mc["longitude"], mc["latitude"]];
                // find distances
                yield dist.findDist2Points(localitiyCoords, fapCoords)
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    // prepare dist object
                    const distance = new distance_dto_1.DistanceDto();
                    distance.distance = result.distance;
                    distance.duration = result.duration;
                    distance.locality_id = locality.id;
                    distance.mc_id = mc.id;
                    // save distances
                    return yield dS.saveDistance(distance).catch(console.log);
                })).catch(console.log);
            }
        });
    }
    findAndSaveDistanceToOrg(locality, orgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const dist = new findDistandeOpenRoute_service_1.DistanceOpenRoute();
            let localitiyCoords = [locality["longitude"], locality["latitude"]];
            let minDistOrg;
            for (let k = 0; k < (orgs === null || orgs === void 0 ? void 0 : orgs.length); k++) {
                const org = orgs[k];
                let orgCoords = [org["longitude"], org["latitude"]];
                // find distances
                yield dist.findDist2Points(localitiyCoords, orgCoords)
                    .then((result) => {
                    // prepare dist object
                    if (minDistOrg == null || minDistOrg.distance > result.distance) {
                        const distance = new distance_dto_1.DistanceDto();
                        distance.distance = result.distance;
                        distance.duration = result.duration;
                        distance.locality_id = locality.id;
                        distance.mc_facility_id = org.id;
                        minDistOrg = distance;
                    }
                }).catch((err) => { console.log(err); });
            }
            // save distances
            const dS = new distance_service_1.DistanceService();
            let r = yield dS.saveDistance(minDistOrg).catch(console.log);
        });
    }
    filterMCsHaversine(locality, mcs, rangeKm) {
        return __awaiter(this, void 0, void 0, function* () {
            let medicalCenters = [];
            // med_centers
            for (let k = 0; k < (mcs === null || mcs === void 0 ? void 0 : mcs.length); k++) {
                const mc = mcs[k];
                // find haversineDistance
                const distance = this.haversineDistance(locality[1], locality[0], mc["latitude"], mc["longitude"]);
                if (distance <= rangeKm) {
                    medicalCenters.push(mc);
                }
            }
            return medicalCenters;
        });
    }
}
exports.DevService = DevService;
//# sourceMappingURL=dev.service.js.map