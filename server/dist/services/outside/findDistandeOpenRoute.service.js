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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistanceOpenRoute = void 0;
const config_1 = __importDefault(require("config"));
const axios_1 = __importDefault(require("axios"));
class DistanceOpenRoute {
    constructor() {
        this.url = config_1.default.get('url_openservice');
    }
    findDist2Points(from = [0, 0], to = [0, 0]) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // const query= "driving-car"
            const data = {
                locations: [from, to],
                metrics: ["distance", "duration"]
            };
            const resp = yield axios_1.default.post(`${this.url}matrix/driving-car`, data);
            return { distance: (_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.distances[0][1], duration: (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.durations[0][1] };
        });
    }
}
exports.DistanceOpenRoute = DistanceOpenRoute;
//# sourceMappingURL=findDistandeOpenRoute.service.js.map