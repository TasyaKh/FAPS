import axiosInstance from "./axiosInstance";
import {IUser} from "../types/types";

export const login = async (user: IUser) => {
    const {data} = await axiosInstance.post(`/api/auth/login`, user);
    return data;
};

export const signUp = async (user: IUser) => {
    const {data} = await axiosInstance.post(`/api/auth/sign-up`, {...user});
    return data;
};

export const getUserByToken = async () => {
    const {data} = await axiosInstance.get(`/api/auth`);
    return data;
};

export const isTokenExpired = () => {

    const parseJwt = (token: string) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };

    const decodedJwt = parseJwt(localStorage.getItem("authToken") ?? '');
    if (decodedJwt) return decodedJwt.exp * 1000 < Date.now();
    else return true
};

export const logout = async () => {
    localStorage.setItem("authToken", "")
};
