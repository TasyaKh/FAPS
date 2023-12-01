export default class PointsLocality {
    availability_PMSP = 0
    availability_SMP = 0
    population_adult = 0
    population_child = 0
    water_supply = 0
    sewerage = 0
    heating = 0
    internet = 0

    getSum() {
        return this.availability_PMSP + this.availability_SMP +
            this.population_adult + this.population_child +
            this.water_supply + this.sewerage +
            this.heating + this.internet
    }
}