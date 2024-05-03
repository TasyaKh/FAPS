import axiosInstance from "./axiosInstance";
import {ILocalitiDistToNearectMC} from "../types/types";

export const getLocalitiesWithDistMcs = async (filters: ILocalitiDistToNearectMC):Promise<ILocalitiDistToNearectMC[]> => {
    const {data} = await axiosInstance.get<ILocalitiDistToNearectMC[]>(`/api/distance/localities-nearest-faps`, {params: filters});
    return data;
};
