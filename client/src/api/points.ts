import axiosInstance from "./axiosInstance";
import {
    IConditionsLocality,
    ICustomSolutionsLocalities,
    ILocalitiDistToNearectMC,
    IPointsMedicalCenter, ISolutionsMCS
} from "types/types";
import {ISearchMedicalCenter} from "../types/types-search";

// --------------------------------------------------------------------------------------------------------------
// localities
// --------------------------------------------------------------------------------------------------------------
export const getSolutionsLocalities = async (filters: ILocalitiDistToNearectMC) => {
    const {data} = await axiosInstance.get<ICustomSolutionsLocalities[]>(`/api/points/solutions-localities`, {params: {...filters}});
    return data;
};

export const setConditionsLocalities = async (iConditionsLocality: IConditionsLocality) => {
    const {data} = await axiosInstance.post(`/api/points/conditions-localities`, {...iConditionsLocality});
    return data;
};

export const getConditionsLocalities = async () => {
    const {data} = await axiosInstance.get<IConditionsLocality>(`/api/points/conditions-localities`);
    return data;
};

// --------------------------------------------------------------------------------------------------------------
// mcs
// --------------------------------------------------------------------------------------------------------------
export const setPointsMedicalCenters = async (filter: IPointsMedicalCenter) => {
    const {data} = await axiosInstance.post(`/api/points/points-mcs`, {...filter});
    return data;
};

export const getPointsMedicalCenters = async () => {
    const {data} = await axiosInstance.get<IPointsMedicalCenter>(`/api/points/points-mcs`);
    return data;
};

export const getPointsSolutionMCS = async (filters: ISearchMedicalCenter) => {
    const {data} = await axiosInstance.get<ISolutionsMCS[]>(`/api/points/solutions-mcs`, {params: {...filters}});
    return data;
};

