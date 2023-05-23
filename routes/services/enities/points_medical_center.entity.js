export default class PointsMedicalCenter {
    constructor(
        // adult_population = 0,
        // child_population = 0,
        foundation_year = 0,
        staffing = 0,
        state = 0,
        age_staffing = 0,
        deteroation = 0
    ) {

        // this.adult_population = adult_population,
        //     this.child_population = child_population,
        this.foundation_year = foundation_year
        this.staffing = staffing
        this.state = state
        this.age_staffing = age_staffing
        this.deteroation = deteroation
    }

    getSum() {
        const s = ( this.foundation_year + this.staffing + this.state + this.age_staffing +
            this.deteroation)
        // console.log(this.adult_population)

        return s
    }
}