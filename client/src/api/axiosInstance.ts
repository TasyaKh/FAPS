import axios, {AxiosInstance} from 'axios';

const instance: AxiosInstance = axios.create({
    withCredentials: true,
    headers:{Authorization:localStorage.getItem("authToken")}
});

export default instance;
