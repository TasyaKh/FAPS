import axios, {AxiosInstance, AxiosResponse} from 'axios';

// export interface ApiResponse<T> {
//     data: T;
// }

const instance: AxiosInstance = axios.create({
    // baseURL: `http://localhost:3002`,
    withCredentials: true,
});

// export const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => response.data.data;

export default instance;