import axiosInstance from "./axiosInstance";
import {IConditionsLocality, ICustomSolutionsLocalities, ILocalitiDistToNearectMC} from "../types/types";

// --------------------------------------------------------------------------------------------------------------
// localities
// --------------------------------------------------------------------------------------------------------------
export const getSolutionsLocalities = async (filters: ILocalitiDistToNearectMC)  => {
    const {data}  = await axiosInstance.get<ICustomSolutionsLocalities[]>(`/api/points/solutions-localities`, {params: {...filters}});
    return data;
};

export const setConditionsLocalities = async (iConditionsLocality:IConditionsLocality) => {
    const {data} = await axiosInstance.post(`/api/points/conditions-localities`,  {...iConditionsLocality});
    return data;
};

export const getConditionsLocalities = async () => {
    const {data} = await axiosInstance.get<IConditionsLocality>(`/api/points/conditions-localities`);
    return data;
};

// --------------------------------------------------------------------------------------------------------------
// mcs
// --------------------------------------------------------------------------------------------------------------
export const setPointsMedicalCenters = async (iConditionsLocality:IConditionsLocality) => {
    const {data} = await axiosInstance.post(`/api/points/conditions-localities`,  {...iConditionsLocality});
    return data;
};

export const getPointsMedicalCenters = async () => {
    const {data} = await axiosInstance.get<IConditionsLocality>(`/api/points/conditions-localities`);
    return data;
};
