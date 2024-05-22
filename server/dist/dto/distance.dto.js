"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSolutionsLocalities = exports.LocalitiDistToNearectMC = exports.LocalitiesAndNearMcsDto = exports.DistanceDto = void 0;
class DistanceDto {
    constructor() {
        this.limit = 6;
    }
    getArray() {
        return [this.distance, this.duration, this.locality_id, this.mc_id, this.mc_facility_id];
    }
}
exports.DistanceDto = DistanceDto;
// ************************************************************************************************************************
// addition dtos
class LocalitiesAndNearMcsDto {
}
exports.LocalitiesAndNearMcsDto = LocalitiesAndNearMcsDto;
// ************************************************************************************************************************
// not entity
class LocalitiDistToNearectMC {
}
exports.LocalitiDistToNearectMC = LocalitiDistToNearectMC;
class CustomSolutionsLocalities {
}
exports.CustomSolutionsLocalities = CustomSolutionsLocalities;
//# sourceMappingURL=distance.dto.js.map