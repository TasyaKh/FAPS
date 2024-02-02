import axios, {AxiosInstance} from 'axios';

const instance: AxiosInstance = axios.create({
    // baseURL: `http://localhost:3002`,
    withCredentials: true,
    headers:{Authorization:localStorage.getItem("authToken")}
});

export default instance;
