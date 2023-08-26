export default class PointsMedicalCenter {
    constructor() {
        // adult_population = 0,
        // child_population = 0,
        this.foundation_year = 0;
        this.staffing = 0;
        this.state = 0;
        this.age_staffing = 0;
        this.deteroation = 0;
    }
    getSum() {
        return (this.foundation_year + this.staffing + this.state + this.age_staffing +
            this.deteroation);
    }
}
//# sourceMappingURL=points_medical_center.entity.js.map