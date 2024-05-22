import axios, {AxiosInstance} from 'axios';
import {BASE_URL} from "../config/constants";

const instance: AxiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials: true,
    headers:{Authorization:localStorage.getItem("authToken")}
});

export default instance;
