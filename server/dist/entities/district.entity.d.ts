import { Region } from "./region.entity";
export default class District {
    id: number;
    region_id: number;
    name: string;
    region: Region;
}
