import axiosInstance from "./axiosInstance";
import {IUser} from "../types/types";

export const login = async (user:IUser) => {
    const {data} = await axiosInstance.post(`/api/auth/login`,  user);
    return data;
};

export const signUp = async (user:IUser) => {
    const {data} = await axiosInstance.post(`/api/auth/sign-up`,  {...user});
    return data;
};
