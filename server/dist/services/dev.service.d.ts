export declare class DevService {
    haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number;
    degToRad(degrees: number): number;
    findAndSaveDistancesToLocality(locality: any, mcs: any): Promise<void>;
    findAndSaveDistanceToOrg(locality: any, orgs: any): Promise<void>;
    filterMCsHaversine(locality: number[], mcs: any, rangeKm: number): Promise<any[]>;
}
