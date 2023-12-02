// import PointsLocality from '../../classes/points_locality.entity'
// import connection from "../../db";
//
// export async function getPointsLocalitiesOfDistrict(req:any, res:any) {
//     let r
//
//     try {
//
//         if (req.body.district_id) {
//
//            const query = `SELECT min_sum_fap, count_mc, locality.name, pl.availability_PMSP, pl.availability_SMP,
//             pl.population_adult, pl.population_child, pl.water_supply,
//             pl.sewerage, pl.heating, pl.internet, pl.sum
//             FROM points_locality  as pl
//
//                     LEFT JOIN locality
//                     ON pl.locality_id = locality.id
//
//                       left JOIN (
//                            SELECT medical_center_id, locality_id, MIN(sum) AS min_sum_fap, COUNT(medical_center_id) as count_mc
//                            FROM points_medical_center
//
//                            -- выбрать учреждения
//                            LEFT JOIN medical_center as mc
//                            ON mc.id = medical_center_id
//
//                            GROUP BY locality_id) AS pmc
//                            ON pl.locality_id = pmc.locality_id
//
//             WHERE district_id = ?`
//
//             r = await new Promise((resolve, reject) => {
//                 connection.query(query, [req.body.district_id], (err: any, result: any) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(result);
//                     }
//                 });
//             })
//
//         } else {
//             console.log("cant find district is null")
//             res.status(500).json({ message: 'Район не найден' })
//         }
//     } catch (e) {
//         console.log(e)
//         res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//     }
//
//     return r
// }
//
// // задать баллы медицинским пунктам
// export async function setPointsLocalities(req:any, res:any, values:any, conditions:any) {
//
//     let query:string
//     let r
//     try {
//
//         if (req.body.district_id) {
//
//             //получить мед учреждение с минимальными баллами (чем ниже балл, тем лучше)
//
//             query = `SELECT locality.id, population.population_adult, population.population_child  FROM locality
//                             LEFT JOIN population
//                             ON locality.id = population.locality_id
//                             WHERE locality.district_id = ?`
//
//             const rows:any = await new Promise((resolve, reject) => {
//                 connection.query(query, [req.body.district_id], (err:any, result:any) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(result);
//                     }
//                 });
//             });
//
//             r = rows
//
//             for (let i = 0; i < rows.length; i++) {
//                 // console.log("rows[i]")
//                 // console.log(rows[i])
//                 const locality = rows[i]
//                 await setPointsLocality(values, conditions, locality)
//
//             }
//
//         } else {
//             console.log("cant find district is null")
//         }
//     } catch (e) {
//         console.log(e)
//         res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//     }
//
//     return r
// }
//
//
//
//
// async function setPointsLocality(values: any, conditions: any, locality: { id?: any; population_adult?: any; population_child?: any; }) {
//
//     const updateQuery = `
//         UPDATE points_locality
//         SET availability_PMSP = ?, availability_SMP = ?, population_adult = ?,
//         population_child = ?, water_supply = ?,
//         sewerage = ?, heating = ?, internet = ?,
//         sum = ?
//         WHERE locality_id = ?
//       `;
//
//     const insertQuery = `
//         INSERT INTO points_locality (locality_id, availability_PMSP, availability_SMP,
//             population_adult, population_child, water_supply,
//             sewerage, heating, internet, sum)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
//
//     // Check if the record exists
//
//     //const min_points = await getMinPointsOfMC(req, res, locality.id)
//
//     // проверить существование мед учреждения в таблице с баллами
//     connection.query(`SELECT EXISTS (SELECT 1 FROM points_locality WHERE
//         points_locality.locality_id = ?) AS exist`,
//         [locality.id], (error: any, results: any) => {
//             if (error) {
//                 console.error('Error checking record existence:', error);
//                 return;
//             }
//
//             const pointsLocaity = calculatePointsL(values, conditions, locality)
//
//             // console.log((results))
//             if (results[0].exist > 0) {
//
//                 //   values for update
//                 const updateV = [pointsLocaity.availability_PMSP,
//                 pointsLocaity.availability_SMP, pointsLocaity.population_adult,
//                 pointsLocaity.population_child, pointsLocaity.water_supply,
//                 pointsLocaity.sewerage, pointsLocaity.heating,
//                 pointsLocaity.internet, pointsLocaity.getSum(),
//                 locality.id]
//                 // Update the existing record
//                 connection.query(updateQuery, updateV, (error: any) => {
//                     if (error) {
//                         console.error('Error updating record points_locality:', error);
//                     } else {
//                         console.log('Record points_locality updated successfully');
//                     }
//                 });
//             } else {
//                 const insertV = [locality.id, pointsLocaity.availability_PMSP,
//                 pointsLocaity.availability_SMP, pointsLocaity.population_adult,
//                 pointsLocaity.population_child, pointsLocaity.water_supply,
//                 pointsLocaity.sewerage, pointsLocaity.heating,
//                 pointsLocaity.internet, pointsLocaity.getSum()]
//                 // Insert a new record
//                 connection.query(insertQuery, insertV, (error:any) => {
//                     if (error) {
//                         console.error('Error inserting record points_locality:', error);
//                     } else {
//                         console.log('Record points_locality inserted successfully');
//                     }
//                 });
//             }
//         });
//
//
// }
//
//
// // async function getMinPointsOfMC(req, res, locality_id) {
//
// //     let minPoints = null
// //     query = `SELECT MIN(sum) AS min_points  FROM points_medical_center
// //     LEFT JOIN medical_center
// //     ON points_medical_center.medical_center_id = medical_center.id
// //     WHERE medical_center.locality_id = ?`
//
// //     const rows = await new Promise((resolve, reject) => {
// //         connection.query(query, [locality_id], (err, result) => {
// //             if (err) {
// //                 reject(err);
// //             } else {
// //                 resolve(result);
// //                 minPoints = rows.min_points
// //             }
// //         });
// //     });
//
// //     return minPoints
// // }
//
//
//
// function calculatePointsL(values: { pointsAdult: number; pointsChild: number; }, conditions: any, locality: { id?: any; population_adult?: any; population_child?: any; }) {
//
//     const population_adult = locality.population_adult
//     const population_child = locality.population_child
//
//     const pointsLocaity = new PointsLocality()
//
//     //  population_adult
//     if (population_adult) {
//         pointsLocaity.population_adult = values.pointsAdult * population_adult
//     }
//
//     //  population_child
//     if (population_child) {
//         pointsLocaity.population_child = values.pointsChild * population_child
//     }
//
//     return pointsLocaity
// }
