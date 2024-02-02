import connection from "../../test/db.js";
import data from "../data/localityGeoportal.json" assert { type: "json" };


export async function updateLocalityLongLatGeoportalByName() {
    let r

    const query = `UPDATE locality
        left join district on district.id = district_id
        SET latitude = ?, longitude = ?
        WHERE locality.name = ? and district.name = ?`
    // go throught json
    for (let i = 0; i < data.length; i++) {
        const el = data[i]
        const lat = el['Широта']
        const long = el['Долгота']

        connection.query(query, [lat,long, el['Населенный пункт'], el['Район']]);
    }

}



