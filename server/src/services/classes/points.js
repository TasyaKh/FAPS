// класс для значений баллов
export class PointsValues {
    constructor(
        pointsAdult = null,
        pointsChild = null,
        pointsStaffing = null,
        pointsState = null,
        pointsPMSP = null,
        pointsAge = null,
        // 0-20% (хорошее)
        deteroationGood = null,
        // 21-41%(удовл.)
        deteroationMedium = null,
        //41-60% (неудовл.)
        deteroationBad = null,
        // 61-80% (ветхое)
        deteroationOld = null,
        // 81-100% (неприг.)
        pointsUnfit = null) {

        this.pointsAdult = pointsAdult
        this.pointsChild = pointsChild
        this.pointsStaffing = pointsStaffing
        this.pointsState = pointsState
        this.pointsPMSP = pointsPMSP
        this.pointsAge = pointsAge
        // 0-20% (хорошее)
        this.deteroationGood = deteroationGood
        // 21-41%(удовл.)
        this.deteroationMedium = deteroationMedium
        //41-60% (неудовл.)
        this.deteroationBad = deteroationBad
        // 61-80% (ветхое)
        this.deteroationOld = deteroationOld
        // 81-100% (неприг.)
        this.pointsUnfit = pointsUnfit
    }

}

// класс для условия начисления баллов
export class PointsConditions {
    constructor(
        staffingPersent = null,
        PMSPKm = null,
        ageYears = null
    ) {
        this.staffingPersent = staffingPersent
        this.PMSPKm = PMSPKm
        this.ageYears = ageYears
    }
}