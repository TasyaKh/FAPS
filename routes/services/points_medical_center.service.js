import PointsMedicalCenter from './enities/points_medical_center.entity.js'
import connection from '../../db.js'


// задать баллы медицинским пунктам
export async function setPointsMedicalCenters(req, res, values, conditions) {

    let query
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

                'WHERE `locality`.`district_id` = ' + req.body.district_id

            const rows = await new Promise((resolve, reject) => {
                connection.query(query, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            //let jsonMedCenters = JSON.stringify(rows)

            for (let i = 0; i < rows.length; i++) {
                // console.log("rows[i]")
                // console.log(rows[i])
                setPointsMedicalCenter(values, conditions, rows[i])
            }

            // res.json(rows)

        } else {
            console.log("cant find district is null, medical_center")
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}



// задать баллы  мед пунтку
async function setPointsMedicalCenter(values, conditions, medCenter) {

    const updateQuery = `
        UPDATE points_medical_center
        SET foundation_year = ?, state = ?, staffing = ?,
        age_staffing = ?, deteroation = ?, sum = ?
        WHERE medical_center_id = ?
      `;

    const insertQuery = `
        INSERT INTO points_medical_center (medical_center_id, foundation_year,
             state, staffing, age_staffing, deteroation, sum)
        VALUES (?, ?, ?, ?, ?, ?, ?);`

    // Check if the record exists


    // проверить существование мед учреждения в таблице с баллами
    connection.query(`SELECT EXISTS (SELECT 1 FROM points_medical_center WHERE
         points_medical_center.medical_center_id = ?) AS exist`,
        [medCenter.id], (error, results) => {
            if (error) {
                console.error('Error checking record existence:', error);
                return;
            }
            const pointsMedicalCenter = calculatePointsMC(values, conditions, medCenter)

            // console.log(" medCenter.id " + medCenter.id + "  " + results)
            // console.log((results))
            if (results[0].exist > 0) {

                //   values for update
                const updateV = [pointsMedicalCenter.foundation_year,
                pointsMedicalCenter.state, pointsMedicalCenter.staffing,
                pointsMedicalCenter.age_staffing, pointsMedicalCenter.deteroation,
                pointsMedicalCenter.getSum(),
                medCenter.id]
                // Update the existing record
                connection.query(updateQuery, updateV, (error) => {
                    if (error) {
                        console.error('Error updating record points_medical_center:', error);
                    } else {
                        console.log('Record points_medical_center updated successfully');
                    }
                });
            } else {
                const insertV = [medCenter.id, pointsMedicalCenter.foundation_year,
                pointsMedicalCenter.state, pointsMedicalCenter.staffing,
                pointsMedicalCenter.age_staffing, pointsMedicalCenter.deteroation,  pointsMedicalCenter.getSum()]
                // Insert a new record
                connection.query(insertQuery, insertV, (error) => {
                    if (error) {
                        console.error('Error inserting record points_medical_center:', error);
                    } else {
                        console.log('Record points_medical_center inserted successfully');
                    }
                });
            }
        });


}



// начислить баллы медицинскому учреждению
function calculatePointsMC(values, conditions, medCenter) {

    const founding_year = medCenter.founding_year
    const staffing = medCenter.staffing

    const pointsMedicalCenter = new PointsMedicalCenter()


    const state = medCenter.state
    const deteroation = medCenter.deteroation * 100

    // год основания foundation_year
    if (founding_year && founding_year >= conditions.ageYears) {
        pointsMedicalCenter.foundation_year = values.pointsAge
    }

    // состояние state
    if (state && (state == "реконструкция" || state == "строится")) {
        pointsMedicalCenter.state = values.pointsState
    }

    // 0-20% (хорошее), 21-41%(удовл.), 41-60% (неудовл.), 61-80% (ветхое), 81-100% (неприг.)
    // изношенность deteroation
    pointsMedicalCenter.deteroation = setDeteroation(deteroation, values)

    // персонал  staffing
    const staffOff = 100 - staffing * 100
    if (staffing && conditions.staffingPersent != 0 && staffOff >= conditions.staffingPersent) {
        pointsMedicalCenter.staffing = staffOff / conditions.staffingPersent * values.pointsStaffing
    }

    return pointsMedicalCenter
}




// начислить баллы за изношенность
function setDeteroation(deteroation, values) {

    let points = 0
    if (deteroation) {
        if (deteroation <= 20) {
            points = values.deteroationGood
        } else if (deteroation <= 40) {
            points = values.deteroationMedium
        } else if (deteroation <= 60) {
            points = values.deteroationBad
        } else if (deteroation <= 80) {
            points = values.deteroationOld
        } else if (deteroation <= 100) {
            points = values.pointsUnfit
        }
    }

    return points
}