import axiosInstance from "./axiosInstance";
import {
    IMedicalCenter
} from "../types/types";
import {ISearchMedicalCenter} from "../types/types-search";

export const getMCS = async (filters: ISearchMedicalCenter) => {
    const {data} = await axiosInstance.get<IMedicalCenter[]>(`/api/medical-centers`, {params: {...filters}});
    return data;
};
