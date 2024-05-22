"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const points_service_1 = require("./points.service");
const exceljs_1 = require("exceljs");
class UploadsService {
    // excel get solutions for localities
    getExcelSolutionsLocalities(userId, res, locsAndNearMcsDto) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const pointsService = new points_service_1.PointsService();
            const solutionsLocs = yield pointsService.getSolutionsLocalities(userId, locsAndNearMcsDto);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'solutions_localities.xlsx');
            const workbook = new exceljs_1.Workbook();
            const worksheet = workbook.addWorksheet('НП-ы (рекомендации)');
            worksheet.columns = [
                { header: 'НП', key: 'locality_name', width: 15 },
                { header: 'Взрослое насел.', key: 'population_population_adult', width: 15 },
                { header: 'Детское насел.', key: 'population_population_child', width: 15 },
                { header: 'МП', key: 'medical_center_name', width: 40 },
                { header: 'Медик', key: 'mc_staffing', width: 15 },
                { header: 'Тип МП', key: 'mc_type_name', width: 15 },
                { header: 'МП, км', key: 'min_distance', width: 15 },
                { header: 'МП, время', key: 'min_duration', width: 15 },
                { header: 'Результат (Рекомендации)', key: 'solutions', width: 50 },
            ];
            const headerIndex = worksheet.columns.findIndex((header) => header.key === 'solutions');
            if (headerIndex !== -1) {
                // Set the wordWrap property for the individual cell style
                worksheet.getCell(1, headerIndex + 1).style = {
                    font: { bold: true },
                    alignment: { wrapText: true },
                };
            }
            worksheet.getRow(1).font = { bold: true };
            // Add some data to the worksheet
            let indexRow = 1;
            for (const i in solutionsLocs) {
                const solutionsLoc = solutionsLocs[i];
                const arrData = [];
                const solutions = solutionsLoc.solutions.map((sol) => sol.name);
                arrData.push((_a = solutionsLoc.data.locality_name) !== null && _a !== void 0 ? _a : '-', (_b = solutionsLoc.data.population_population_adult) !== null && _b !== void 0 ? _b : '-', (_c = solutionsLoc.data.population_population_child) !== null && _c !== void 0 ? _c : '-', (_d = solutionsLoc.data.medical_center_name) !== null && _d !== void 0 ? _d : '-', solutionsLoc.data.mc_staffing ? (solutionsLoc.data.mc_staffing > 0 ? 'да' : 'нет') : '-', (_e = solutionsLoc.data.mc_type_name) !== null && _e !== void 0 ? _e : '-', solutionsLoc.data.min_distance ? (solutionsLoc.data.min_distance / 1000).toFixed(2) : '-', solutionsLoc.data.min_duration ? (solutionsLoc.data.min_duration / 1000).toFixed(2) : '-', solutions.length > 0 ? solutions.join(', \n') : '-');
                worksheet.getRow(indexRow).getCell("I").alignment = { wrapText: true };
                worksheet.getRow(indexRow).getCell("D").alignment = { wrapText: true };
                worksheet.addRow(arrData);
                indexRow++;
            }
            yield workbook.xlsx.write(res);
            res.end();
        });
    }
    // excel get solutions for localities
    getExcelSolutionsMCS(userId, res, medicalCenterDto) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const pointsService = new points_service_1.PointsService();
            const solutionsMCS = yield pointsService.getSolutionsMCS(userId, medicalCenterDto, res);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'mcs.xlsx');
            const workbook = new exceljs_1.Workbook();
            const worksheet = workbook.addWorksheet('МП-ы (баллы)');
            worksheet.columns = [
                { header: 'МП', key: 'name', width: 40 },
                { header: 'Взрослое насел.', key: 'adult_population', width: 8 },
                { header: 'Детское насел.', key: 'child_population', width: 8 },
                { header: 'Год', key: 'foundation_year', width: 8 },
                { header: 'Медик', key: 'staffing', width: 8 },
                { header: 'Состояние', key: 'state', width: 8 },
                { header: 'Сумма', key: 'sum', width: 8 },
            ];
            const headerIndex = worksheet.columns.findIndex((header) => header.key === 'sum');
            if (headerIndex !== -1) {
                // Set the wordWrap property for the individual cell style
                worksheet.getCell(1, headerIndex + 1).style = {
                    font: { bold: true },
                };
            }
            worksheet.getRow(1).font = { bold: true };
            // Add some data to the worksheet
            let indexRow = 1;
            for (const i in solutionsMCS) {
                const solutionMCS = solutionsMCS[i];
                const arrData = [];
                arrData.push((_a = solutionMCS.mc.name) !== null && _a !== void 0 ? _a : '-', (_b = solutionMCS.adult_population) !== null && _b !== void 0 ? _b : '-', (_c = solutionMCS.child_population) !== null && _c !== void 0 ? _c : '-', (_d = solutionMCS.foundation_year) !== null && _d !== void 0 ? _d : '-', (_e = solutionMCS.staffing) !== null && _e !== void 0 ? _e : '-', (_f = solutionMCS.state) !== null && _f !== void 0 ? _f : '-', !isNaN(solutionMCS.sum) ? solutionMCS.sum : '-');
                worksheet.getRow(indexRow).getCell("A").alignment = { wrapText: true };
                worksheet.addRow(arrData);
                indexRow++;
            }
            yield workbook.xlsx.write(res);
            res.end();
        });
    }
}
exports.UploadsService = UploadsService;
//# sourceMappingURL=uploads.service.js.map