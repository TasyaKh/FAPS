var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PointsMedicalCenter from './enities/points_medical_center.entity.js';
import connection from '../db.js';
export function getPointsMedicalCentersOfDistrict(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let r;
        try {
            if (req.body.district_id) {
                const query = `SELECT medical_center.name as mc_name, locality.name as locality_name,  pmc.foundation_year,
                   pmc.state, pmc.staffing, pmc.age_staffing, pmc.deteroation, pmc.sum
                   FROM points_medical_center as pmc
                                   LEFT JOIN medical_center
                                   ON pmc.medical_center_id = medical_center.id
                                   LEFT JOIN locality
                                   ON medical_center.locality_id = locality.id
                              
                                   WHERE district_id = ?`;
                const rows = yield new Promise((resolve, reject) => {
                    connection.query(query, [req.body.district_id], (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
                r = rows;
            }
            else {
                console.log("cant find district is null");
                res.status(500).json({ message: 'Район не найден' });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
        return r;
    });
}
// задать баллы медицинским пунктам
export function setPointsMedicalCenters(req, res, values, conditions) {
    return __awaiter(this, void 0, void 0, function* () {
        let query;
        try {
            if (req.body.district_id) {
                //get medical centers by district id
                query =
                    'SELECT `medical_center`.`id`, `medical_center`.`locality_id`, `medical_center`.`founding_year`,\n' +
                        '`medical_center`.`staffing`, `building_condition`.`state`, `building_condition`.`deteroation`\n' +
                        'FROM `medical_center`\n' +
                        'LEFT JOIN `locality`\n' +
                        'ON `medical_center`.`locality_id` = `locality`.`id`\n' +
                        'LEFT JOIN `building_condition`\n' +
                        'ON `medical_center`.`id` = `building_condition`.`medical_center_id`\n' +
                        'WHERE `locality`.`district_id` = ' + req.body.district_id;
                const rows = yield new Promise((resolve, reject) => {
                    connection.query(query, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
                for (let i = 0; i < rows.length; i++) {
                    yield setPointsMedicalCenter(values, conditions, rows[i]);
                }
            }
            else {
                console.log("cant find district is null, medical_center");
                res.status(500).json({ message: 'Район не найден' });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    });
}
// задать баллы  мед пунтку
function setPointsMedicalCenter(values, conditions, medCenter) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateQuery = `
        UPDATE points_medical_center
        SET foundation_year = ?, state = ?, staffing = ?,
        age_staffing = ?, deteroation = ?, sum = ?
        WHERE medical_center_id = ?
      `;
        const insertQuery = `
        INSERT INTO points_medical_center (medical_center_id, foundation_year,
             state, staffing, age_staffing, deteroation, sum)
        VALUES (?, ?, ?, ?, ?, ?, ?);`;
        // Check if the record exists
        // проверить существование мед учреждения в таблице с баллами
        connection.query(`SELECT EXISTS (SELECT 1 FROM points_medical_center WHERE
         points_medical_center.medical_center_id = ?) AS exist`, [medCenter.id], (error, results) => {
            if (error) {
                console.error('Error checking record existence:', error);
                return;
            }
            const pointsMedicalCenter = calculatePointsMC(values, conditions, medCenter);
            // console.log(" medCenter.id " + medCenter.id + "  " + results)
            // console.log((results))
            if (results[0].exist > 0) {
                //   values for update
                const updateV = [pointsMedicalCenter.foundation_year,
                    pointsMedicalCenter.state, pointsMedicalCenter.staffing,
                    pointsMedicalCenter.age_staffing, pointsMedicalCenter.deteroation,
                    pointsMedicalCenter.getSum(),
                    medCenter.id];
                // Update the existing record
                connection.query(updateQuery, updateV, (error) => {
                    if (error) {
                        console.error('Error updating record points_medical_center:', error);
                    }
                    else {
                        console.log('Record points_medical_center updated successfully');
                    }
                });
            }
            else {
                const insertV = [medCenter.id, pointsMedicalCenter.foundation_year,
                    pointsMedicalCenter.state, pointsMedicalCenter.staffing,
                    pointsMedicalCenter.age_staffing, pointsMedicalCenter.deteroation, pointsMedicalCenter.getSum()];
                // Insert a new record
                connection.query(insertQuery, insertV, (error) => {
                    if (error) {
                        console.error('Error inserting record points_medical_center:', error);
                    }
                    else {
                        console.log('Record points_medical_center inserted successfully');
                    }
                });
            }
        });
    });
}
// начислить баллы медицинскому учреждению
function calculatePointsMC(values, conditions, medCenter) {
    const founding_year = medCenter.founding_year;
    const staffing = medCenter.staffing;
    const pointsMedicalCenter = new PointsMedicalCenter();
    const state = medCenter.state;
    const deteroation = medCenter.deteroation * 100;
    // год основания foundation_year
    if (founding_year && founding_year <= conditions.ageYears) {
        pointsMedicalCenter.foundation_year = values.pointsAge;
    }
    // состояние state
    if (state && (state === "реконструкция" || state === "строится")) {
        pointsMedicalCenter.state = values.pointsState;
    }
    // 0-20% (хорошее), 21-41%(удовл.), 41-60% (неудовл.), 61-80% (ветхое), 81-100% (неприг.)
    // изношенность deteroation
    pointsMedicalCenter.deteroation = setDeteroation(deteroation, values);
    // персонал  staffing
    const staffOff = 100 - staffing * 100;
    if (staffing && conditions.staffingPersent !== 0 && staffOff >= conditions.staffingPersent) {
        pointsMedicalCenter.staffing = staffOff / conditions.staffingPersent * values.pointsStaffing;
    }
    return pointsMedicalCenter;
}
// начислить баллы за изношенность
function setDeteroation(deteroation, values) {
    let points = 0;
    if (deteroation) {
        if (deteroation <= 20) {
            points = values.deteroationGood;
        }
        else if (deteroation <= 40) {
            points = values.deteroationMedium;
        }
        else if (deteroation <= 60) {
            points = values.deteroationBad;
        }
        else if (deteroation <= 80) {
            points = values.deteroationOld;
        }
        else if (deteroation <= 100) {
            points = values.pointsUnfit;
        }
    }
    return points;
}
//# sourceMappingURL=points_medical_center.service.js.map