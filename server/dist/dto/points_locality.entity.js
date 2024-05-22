"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PointsLocality {
    constructor() {
        this.availability_PMSP = 0;
        this.availability_SMP = 0;
        this.population_adult = 0;
        this.population_child = 0;
        this.water_supply = 0;
        this.sewerage = 0;
        this.heating = 0;
        this.internet = 0;
    }
    getSum() {
        return this.availability_PMSP + this.availability_SMP +
            this.population_adult + this.population_child +
            this.water_supply + this.sewerage +
            this.heating + this.internet;
    }
}
exports.default = PointsLocality;
//# sourceMappingURL=points_locality.entity.js.map