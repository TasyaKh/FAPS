import axiosInstance from "../store/axiosInstance";
import {ILocalitiDistToNearectMC} from "../entities/entities";

export const getLocalitiesWithDistMcs = async (district_id: number) => {
    const {data} = await axiosInstance.get<ILocalitiDistToNearectMC[]>(`/api/distance/localities-nearest-faps`, {params: {district_id: district_id}});
    return data;
};
