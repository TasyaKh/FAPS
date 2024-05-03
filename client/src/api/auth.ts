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

export const resetPassword = async (user: IUser) => {
    const {data} = await axiosInstance.post(`/api/auth/reset-password`, {...user});
    return data;
};

export const forgotPassword = async (email: string) => {
    const {data} = await axiosInstance.post(`/api/auth/forgot-password`, {email: email});
    return data;
};

export const getUserLocal = () => {

    const usr = {role: "", name: "", isAuthenticated: false, id: -1}
    const parseJwt = (token: string) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };

    const decodedJwt = parseJwt(localStorage.getItem("authToken") ?? '');
    if (decodedJwt) {
        usr.isAuthenticated = decodedJwt.exp * 1000 > Date.now()
        usr.id = decodedJwt.id
        usr.role = decodedJwt.role
        usr.name = decodedJwt.name
    } else usr.isAuthenticated = false

    return usr
};
