var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Openrouteservice from 'openrouteservice-js';
export class Distance {
    findDist2Points() {
        return __awaiter(this, void 0, void 0, function* () {
            const Isochrones = new Openrouteservice.Isochrones({ api_key: "5b3ce3597851110001cf62484ded1c5cbb654cae9bcfc9e2a10711c8" });
            try {
                let response = yield Isochrones.calculate({
                    locations: [[8.690958, 49.404662], [8.687868, 49.390139]],
                    profile: 'driving-car',
                    range: [600],
                    units: 'km',
                    range_type: 'distance',
                    attributes: ['area'],
                    smoothing: 0.9,
                    avoidables: ['highways'],
                    avoid_polygons: {
                        type: 'Polygon',
                        coordinates: [
                            [
                                [8.683533668518066, 49.41987949639816],
                                [8.680272102355957, 49.41812070066643],
                                [8.683919906616211, 49.4132348262363],
                                [8.689756393432617, 49.41806486484901],
                                [8.683533668518066, 49.41987949639816]
                            ]
                        ]
                    },
                    area_units: 'km'
                });
                // Add your own result handling here
                console.log("response: ", response);
            }
            catch (err) {
                console.log("An error occurred: " + err.status);
                console.error(yield err.response.json());
            }
        });
    }
}
//# sourceMappingURL=findDistanceGraphopper.services.ts.map