import AppDataSource from "../typeorm.config";

export async function getOrganizationsByDistrictId(districtId: number) {
    let r: any

    const entityManager = AppDataSource.createEntityManager()

    const query = `SELECT * FROM medical_facility WHERE district_id = ?`

    try {
        r = await entityManager.query(query, [districtId])
    } catch (err) {
        return false
    }

    return r
}
