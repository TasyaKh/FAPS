export default class PointsMedicalCenter {

    // adult_population = 0,
    // child_population = 0,
    foundation_year = 0
    staffing = 0
    state = 0
    age_staffing = 0
    deteroation = 0

    getSum() {
        return (this.foundation_year + this.staffing + this.state + this.age_staffing +
            this.deteroation)
    }
}