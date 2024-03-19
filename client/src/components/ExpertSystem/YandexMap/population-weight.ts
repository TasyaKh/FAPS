// get population weight (from 0-10)
export function getPopulationWeight(population: number) {
    // weight on base of population (from 0-10)
    let weight: number
    if (population > 0 && population <= 100) {
        weight = 1
    } else if (population <= 500) {
        weight = 2
    } else if (population <= 1000) {
        weight = 3
    } else if (population <= 5000) {
        weight = 4
    } else if (population <= 10000) {
        weight = 5
    } else if (population <= 20000) {
        weight = 6
    } else if (population <= 40000) {
        weight = 7
    } else if (population <= 80000) {
        weight = 8
    } else if (population <= 100000) {
        weight = 9
    } else {
        weight = 10
    }

    return weight
}
