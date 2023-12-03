import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    // baseURL: `http://localhost:3002`,
    withCredentials: true,
});

export default instance;