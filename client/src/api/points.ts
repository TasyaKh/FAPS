import axiosInstance from "../store/axiosInstance";
import {IConditionsLocality, ICustomSolutionsLocalities} from "../entities/entities";

export const getSolutionsLocalities = async (district_id: number)  => {
    const {data}  = await axiosInstance.get<ICustomSolutionsLocalities[]>(`/api/points/solutions-localities`, {params: {district_id: district_id}});
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