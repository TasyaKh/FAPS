import axiosInstance from "./axiosInstance";
import {ILocalitiDistToNearectMC} from "../types/types";

export const getLocalitiesWithDistMcs = async (district_id: number):Promise<ILocalitiDistToNearectMC[]> => {
    const {data} = await axiosInstance.get<ILocalitiDistToNearectMC[]>(`/api/distance/localities-nearest-faps`, {params: {district_id: district_id}});
    return data;
};
