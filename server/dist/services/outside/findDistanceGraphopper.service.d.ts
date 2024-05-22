export declare class Distance {
    defaultKey: string;
    url: string;
    findDist2Points(from?: number[], to?: number[]): Promise<any>;
    findDistanceMultipleLocalities(from_points: number[][], to_points: number[][]): Promise<void>;
}
