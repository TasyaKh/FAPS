import PointsLocality from './enities/points_locality.entity'
import connection from '../../db.js'
import { PointsConditions, PointsValues } from './classes/points.js'


// задать баллы медицинским пунктам
export async function setPointsLocalities(req, res, values, conditions) {

    let query
    try {

        if (req.body.district_id) {

            //получить мед учреждение с минимальными баллами (чем ниже балл, тем лучше)

            query = `SELECT locality.id, population.population_adult, population.population_child  FROM locality
                            LEFT JOIN population
                            ON locality.id = population.locality_id
                            WHERE locality.district_id = ?`

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
                const locality = rows[i]
                setPointsLocality(req, res, locality)

            }

            res.json(rows)

        } else {
            console.log("cant find district is null")
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}




async function setPointsLocality(values, conditions, locality) {

    const updateQuery = `
        UPDATE points_locality
        SET availability_PMSP = ?, availability_SMP = ?, adult_population = ?,
        child_population = ?, water_supply = ?,
        sewerage = ?, heating = ?, internet = ?,
        sum = ?
        WHERE locality_id = ?
      `;

    const insertQuery = `
        INSERT INTO points_locality (availability_PMSP, availability_SMP, 
            adult_population, child_population, water_supply,
            sewerage, heating, internet, sum)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`

    // Check if the record exists

    const min_points = await getMinPointsOfMC(req, res, locality.id)

    // проверить существование мед учреждения в таблице с баллами
    connection.query(`SELECT EXISTS (SELECT 1 FROM points_locality WHERE
        points_locality.locality_id = ?) AS exist`,
        [medCenter.id], (error, results) => {
            if (error) {
                console.error('Error checking record existence:', error);
                return;
            }

            const pointsLocaity = calculatePointsL(values, conditions, locality)

            // console.log(" medCenter.id " + medCenter.id + "  " + results)
            // console.log((results))
            if (results[0].exist > 0) {

                //   values for update
                const updateV = [pointsLocaity.availability_PMSP,
                pointsLocaity.availability_SMP, pointsLocaity.population_adult,
                pointsLocaity.population_child, pointsLocaity.water_supply,
                pointsLocaity.sewerage, pointsLocaity.heating,
                pointsLocaity.internet, pointsLocaity.getSum(),
                locality.id]
                // Update the existing record
                connection.query(updateQuery, updateV, (error) => {
                    if (error) {
                        console.error('Error updating record:', error);
                    } else {
                        console.log('Record updated successfully');
                    }
                });
            } else {
                const insertV = [locality.id, pointsLocaity.availability_PMSP,
                    pointsLocaity.availability_SMP, pointsLocaity.population_adult,
                    pointsLocaity.population_child, pointsLocaity.water_supply,
                    pointsLocaity.sewerage, pointsLocaity.heating,
                    pointsLocaity.internet, pointsLocaity.getSum()]
                // Insert a new record
                connection.query(insertQuery, insertV, (error) => {
                    if (error) {
                        console.error('Error inserting record:', error);
                    } else {
                        console.log('Record inserted successfully');
                    }
                });
            }
        });


}


async function getMinPointsOfMC(req, res, locality_id) {

    let minPoints = null
    query = `SELECT MIN(sum) AS min_points  FROM points_medical_center
    LEFT JOIN medical_center
    ON points_medical_center.medical_center_id = medical_center.id
    WHERE medical_center.locality_id = ?`

    const rows = await new Promise((resolve, reject) => {
        connection.query(query, [locality_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
                minPoints = rows.min_points
            }
        });
    });

    return minPoints
}



function calculatePointsL(values, conditions, locality) {

    const population_adult = locality.population_adult
    const population_child = locality.population_child

    const pointsLocaity = new PointsLocality()

    //  population_adult
    if (population_adult) {
        pointsLocaity.population_adult = values.population_adult * population_adult
    }

    //  population_child
    if (population_child) {
        pointsLocaity.population_child = values.population_child * population_child
    }

    return pointsLocaity
}
