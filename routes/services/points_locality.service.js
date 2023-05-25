import PointsLocality from './enities/points_locality.entity.js'
import connection from '../../db.js'


export async function getPointsLocalitiesOfDistrict(req, res) {
    let r
    console.log("req.body.district_id")
    console.log(req.body.district_id)
    try {

        if (req.body.district_id) {

            //получить мед учреждение с минимальными баллами (чем ниже балл, тем лучше)

           const query = `SELECT locality.name, points_locality.availability_PMSP, points_locality.availability_SMP,
                    points_locality.population_adult, points_locality.population_child, points_locality.water_supply,
                    points_locality.sewerage, points_locality.heating, points_locality.internet
                    FROM points_locality 
                                    LEFT JOIN locality
                                    ON points_locality.locality_id = locality.id
                                    LEFT JOIN population
                                    ON points_locality.locality_id = population.locality_id
                                    WHERE district_id = ?`

            const rows = await new Promise((resolve, reject) => {
                connection.query(query, [req.body.district_id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            r = rows

        } else {
            console.log("cant find district is null")
            res.status(500).json({ message: 'Район не найден' })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

    return r
}

// задать баллы медицинским пунктам
export async function setPointsLocalities(req, res, values, conditions) {

    let query
    let r
    try {

        if (req.body.district_id) {

            //получить мед учреждение с минимальными баллами (чем ниже балл, тем лучше)

            query = `SELECT locality.id, population.population_adult, population.population_child  FROM locality
                            LEFT JOIN population
                            ON locality.id = population.locality_id
                            WHERE locality.district_id = ?`

            const rows = await new Promise((resolve, reject) => {
                connection.query(query, [req.body.district_id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            r = rows

            for (let i = 0; i < rows.length; i++) {
                // console.log("rows[i]")
                // console.log(rows[i])
                const locality = rows[i]
                setPointsLocality(values, conditions, locality)

            }

        } else {
            console.log("cant find district is null")
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

    return r
}




async function setPointsLocality(values, conditions, locality) {

    const updateQuery = `
        UPDATE points_locality
        SET availability_PMSP = ?, availability_SMP = ?, population_adult = ?,
        population_child = ?, water_supply = ?,
        sewerage = ?, heating = ?, internet = ?,
        sum = ?
        WHERE locality_id = ?
      `;

    const insertQuery = `
        INSERT INTO points_locality (locality_id, availability_PMSP, availability_SMP, 
            population_adult, population_child, water_supply,
            sewerage, heating, internet, sum)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

    // Check if the record exists

    //const min_points = await getMinPointsOfMC(req, res, locality.id)

    // проверить существование мед учреждения в таблице с баллами
    connection.query(`SELECT EXISTS (SELECT 1 FROM points_locality WHERE
        points_locality.locality_id = ?) AS exist`,
        [locality.id], (error, results) => {
            if (error) {
                console.error('Error checking record existence:', error);
                return;
            }

            const pointsLocaity = calculatePointsL(values, conditions, locality)

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
                        console.error('Error updating record points_locality:', error);
                    } else {
                        console.log('Record points_locality updated successfully');
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
                        console.error('Error inserting record points_locality:', error);
                    } else {
                        console.log('Record points_locality inserted successfully');
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
        pointsLocaity.population_adult = values.pointsAdult * population_adult
    }

    //  population_child
    if (population_child) {
        pointsLocaity.population_child = values.pointsChild * population_child
    }

    return pointsLocaity
}
