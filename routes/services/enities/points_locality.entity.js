export default class PointsLocality {
    constructor(
        availability_PMSP = 0,
        availability_SMP = 0,
        population_adult = 0,
        population_child = 0,
        water_supply = 0,
        sewerage = 0,
        heating = 0,
        internet = 0,
    ) {

        this.availability_PMSP = availability_PMSP
        this.availability_SMP = availability_SMP
        this.population_adult = population_adult
        this.population_child = population_child
        this.water_supply = water_supply
        this.sewerage = sewerage
        this.heating = heating
        this.internet = internet

    }

    getSum() {
        return this.availability_PMSP + this.availability_SMP +
            this.population_adult + this.population_child +
            this.water_supply + this.sewerage +
            this.heating + this.internet
    }
}