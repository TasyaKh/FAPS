import axiosInstance from "./axiosInstance";
import {IUser} from "../types/types";

export const findUsers = async (user: IUser) => {
    const {data} = await axiosInstance.get<[IUser[], number]>(`/api/user`, {params: {...user}});
    return data;
};

export const grantRole = async (user: IUser) => {
    const {data} = await axiosInstance.post(`/api/user/grant-role`, {...user});
    return data;
};
