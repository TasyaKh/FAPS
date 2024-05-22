export declare class DistanceOpenRoute {
    url: string;
    findDist2Points(from?: number[], to?: number[]): Promise<{
        distance: any;
        duration: any;
    }>;
}
