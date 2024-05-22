"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalCenterDto = exports.SolutionsMCS = exports.PointsMedicalCenterDto = void 0;
class PointsMedicalCenterDto {
    constructor() {
        this.adult_population = 0;
        this.child_population = 0;
        this.max_found_year = 0;
        this.foundation_year = 0;
        this.staffing = 0;
        this.state = 0;
        this.each_pers_staffing = 0;
        // age_staffing = 0
        // deteroation = 0
    }
}
exports.PointsMedicalCenterDto = PointsMedicalCenterDto;
class SolutionsMCS {
    constructor() {
        this.adult_population = 0;
        this.child_population = 0;
        this.foundation_year = 0;
        this.staffing = 0;
        this.state = 0;
        this.sum = 0;
    }
}
exports.SolutionsMCS = SolutionsMCS;
class MedicalCenterDto {
}
exports.MedicalCenterDto = MedicalCenterDto;
//# sourceMappingURL=points_medical_center.dto.js.map