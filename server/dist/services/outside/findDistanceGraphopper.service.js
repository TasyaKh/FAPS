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
exports.Distance = void 0;
const config_1 = __importDefault(require("config"));
class Distance {
    constructor() {
        this.defaultKey = config_1.default.get('api_graphopper');
        this.url = config_1.default.get('url_graphopper');
    }
    findDist2Points() {
        return __awaiter(this, arguments, void 0, function* (from = [0, 0], to = [0, 0]) {
            const query = new URLSearchParams({
                key: this.defaultKey
            }).toString();
            const resp = yield fetch(`${this.url}route?${query}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    points: [
                        from,
                        to
                    ],
                    // point_hints: [
                    //     'Lindenschmitstraße',
                    //     'Thalkirchener Str.'
                    // ],
                    snap_preventions: [
                        'motorway',
                        'ferry',
                        'tunnel'
                    ],
                    details: ['road_class', 'surface'],
                    vehicle: 'car',
                    locale: 'en',
                    instructions: true,
                    calc_points: true,
                    points_encoded: false
                })
            });
            const data = yield resp.json();
            console.log(data);
            return data;
        });
    }
    findDistanceMultipleLocalities(from_points, to_points) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new URLSearchParams({
                key: this.defaultKey
            }).toString();
            const resp = yield fetch(`${this.url}matrix?${query}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from_points: from_points,
                    to_points: to_points,
                    // from_point_hints: [
                    //     'Copenhagen Street',
                    //     'Richmond Avenue',
                    //     'White Lion Street'
                    // ],
                    // to_point_hints: ['Cannon', 'Cornhill'],
                    out_arrays: [
                        'weights',
                        'times',
                        'distances'
                    ],
                    vehicle: 'car'
                })
            });
            const data = yield resp.json();
            console.log(data);
        });
    }
}
exports.Distance = Distance;
//# sourceMappingURL=findDistanceGraphopper.service.js.map