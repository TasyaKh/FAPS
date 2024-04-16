import {LocalitiesAndNearMcsDto} from "../../dto/distance.dto";
import {PointsService} from "./points.service";
import {Workbook} from "exceljs";
import express from "express";
import {MedicalCenterDto} from "../../dto/points_medical_center.dto";

export class UploadsService {

    // excel get solutions for localities
    async getExcelSolutionsLocalities(userId: number, res: express.Response, locsAndNearMcsDto: LocalitiesAndNearMcsDto) {
        const pointsService = new PointsService()
        const solutionsLocs = await pointsService.getSolutionsLocalities(userId, locsAndNearMcsDto)

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'solutions_localities.xlsx',
        );

        const workbook = new Workbook()
        const worksheet = workbook.addWorksheet('НП-ы (рекомендации)');

        worksheet.columns = [
            {header: 'НП', key: 'locality_name', width: 15},
            {header: 'Взрослое насел.', key: 'population_population_adult', width: 15},
            {header: 'Детское насел.', key: 'population_population_child', width: 15},
            {header: 'МП', key: 'medical_center_name', width: 40},
            {header: 'Медик', key: 'mc_staffing', width: 15},
            {header: 'Тип МП', key: 'mc_type_name', width: 15},
            {header: 'МП, км', key: 'min_distance', width: 15},
            {header: 'МП, время', key: 'min_duration', width: 15},
            {header: 'Результат (Рекомендации)', key: 'solutions', width: 50},

        ];

        const headerIndex = worksheet.columns.findIndex((header) => header.key === 'solutions');

        if (headerIndex !== -1) {
            // Set the wordWrap property for the individual cell style
            worksheet.getCell(1, headerIndex + 1).style = {
                font: {bold: true},
                alignment: {wrapText: true},
            };
        }

        worksheet.getRow(1).font = {bold: true};

        // Add some data to the worksheet

        let indexRow = 1;
        for (const i in solutionsLocs) {
            const solutionsLoc = solutionsLocs[i];
            const arrData = [];

            const solutions = solutionsLoc.solutions.map((sol) => sol.name)
            arrData.push(
                solutionsLoc.data.locality_name ?? '-',
                solutionsLoc.data.population_population_adult ?? '-',
                solutionsLoc.data.population_population_child ?? '-',
                solutionsLoc.data.medical_center_name ?? '-',
                solutionsLoc.data.mc_staffing ? (solutionsLoc.data.mc_staffing > 0 ? 'да' : 'нет') : '-',
                solutionsLoc.data.mc_type_name ?? '-',
                solutionsLoc.data.min_distance ? (solutionsLoc.data.min_distance / 1000).toFixed(2) : '-',
                solutionsLoc.data.min_duration ? (solutionsLoc.data.min_duration / 1000).toFixed(2) : '-',
                solutions.length > 0 ? solutions.join(', \n') : '-',
            );

            worksheet.getRow(indexRow).getCell("I").alignment = {wrapText: true};
            worksheet.getRow(indexRow).getCell("D").alignment = {wrapText: true};
            worksheet.addRow(arrData);

            indexRow++;
        }

        await workbook.xlsx.write(res);
        res.end();
    }

    // excel get solutions for localities
    async getExcelSolutionsMCS(userId: number, res: express.Response, medicalCenterDto: MedicalCenterDto) {
        const pointsService = new PointsService()
        const solutionsMCS = await pointsService.getSolutionsMCS(userId, medicalCenterDto, res)

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'mcs.xlsx',
        );

        const workbook = new Workbook()
        const worksheet = workbook.addWorksheet('МП-ы (баллы)');

        worksheet.columns = [
            {header: 'МП', key: 'name', width: 40},
            {header: 'Взрослое насел.', key: 'adult_population', width: 8},
            {header: 'Детское насел.', key: 'child_population', width: 8},
            {header: 'Год', key: 'foundation_year', width: 8},
            {header: 'Медик', key: 'staffing', width: 8},
            {header: 'Состояние', key: 'state', width: 8},
            {header: 'Сумма', key: 'sum', width: 8},
        ];

        const headerIndex = worksheet.columns.findIndex((header) => header.key === 'sum');

        if (headerIndex !== -1) {
            // Set the wordWrap property for the individual cell style
            worksheet.getCell(1, headerIndex + 1).style = {
                font: {bold: true},
            };
        }

        worksheet.getRow(1).font = {bold: true};

        // Add some data to the worksheet

        let indexRow = 1;
        for (const i in solutionsMCS) {
            const solutionMCS = solutionsMCS[i];
            const arrData = [];

            arrData.push(
                solutionMCS.mc.name ?? '-',
                solutionMCS.adult_population ?? '-',
                solutionMCS.child_population ?? '-',
                solutionMCS.foundation_year ?? '-',
                solutionMCS.staffing ?? '-',
                solutionMCS.state ?? '-',
                !isNaN(solutionMCS.sum) ? solutionMCS.sum : '-',
            );

            worksheet.getRow(indexRow).getCell("A").alignment = {wrapText: true};
            worksheet.addRow(arrData);

            indexRow++;
        }

        await workbook.xlsx.write(res);
        res.end();
    }
}
