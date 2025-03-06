import axios, { AxiosError } from "axios";
// import { apiBasePathAuth, uiBasePath } from "./envUrl";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/',
});

instance.interceptors.request.use(
    (config: any) => {
        config.headers = {
            Accept: "*/*",
        };
        return Promise.resolve(config);
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (
            error.response?.status === 401
        ) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = 'localhost/3000/' + "login";
        }
        return Promise.reject(error);
    }
);


export default instance;