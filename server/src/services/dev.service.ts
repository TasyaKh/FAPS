import {DistanceService} from "./distance.service";
import {DistanceOpenRoute} from "./outside/findDistandeOpenRoute.service";
import {DistanceDto} from "../dto/distance.dto";

export class DevService {

    haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Radius of the Earth in kilometers

        const dLat = this.degToRad(lat2 - lat1);
        const dLon = this.degToRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degToRad(lat1)) * Math.cos(this.degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    degToRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    // получить расстояния между заданным НП и мед учреждениями и мохранить в бд
    async findAndSaveDistancesToLocality(locality: any, mcs: any) {
        const dS = new DistanceService()
        const dist = new DistanceOpenRoute()

        let localitiyCoords: number[] = [locality["longitude"], locality["latitude"]]

        // med_centers
        for (let k = 0; k < mcs?.length; k++) {
            const mc = mcs[k]
            let fapCoords: number[] = [mc["longitude"], mc["latitude"]]
            // find distances
            await dist.findDist2Points(localitiyCoords, fapCoords)
                .then(async (result) => {
                    // prepare dist object
                    const distance = new DistanceDto()
                    distance.distance = result.distance
                    distance.duration = result.duration
                    distance.locality_id = locality.id
                    distance.mc_id = mc.id
                    // save distances

                    return await dS.saveDistance(distance).catch(console.log)
                }).catch(console.log)
        }
    }

    async findAndSaveDistanceToOrg(locality: any, orgs: any) {

        const dist = new DistanceOpenRoute()

        let localitiyCoords: number[] = [locality["longitude"], locality["latitude"]]

        let minDistOrg: DistanceDto
        for (let k = 0; k < orgs?.length; k++) {
            const org = orgs[k]
            let orgCoords: number[] = [org["longitude"], org["latitude"]]
            // find distances
            await dist.findDist2Points(localitiyCoords, orgCoords)
                .then((result) => {
                    // prepare dist object

                    if (minDistOrg == null || minDistOrg.distance > result.distance) {
                        const distance = new DistanceDto()
                        distance.distance = result.distance
                        distance.duration = result.duration
                        distance.locality_id = locality.id
                        distance.mc_facility_id = org.id
                        minDistOrg = distance
                    }

                }).catch((err)=>{console.log(err)})
        }
        // save distances
        const dS = new DistanceService()
        let r = await dS.saveDistance(minDistOrg).catch(console.log)
    }

    async filterMCsHaversine(locality: number[], mcs: any, rangeKm: number) {
        let medicalCenters = []

        // med_centers
        for (let k = 0; k < mcs?.length; k++) {
            const mc = mcs[k]

            // find haversineDistance
            const distance = this.haversineDistance(locality[1], locality[0], mc["latitude"], mc["longitude"])
            if (distance <= rangeKm) {
                medicalCenters.push(mc);
            }
        }

        return medicalCenters
    }

}
