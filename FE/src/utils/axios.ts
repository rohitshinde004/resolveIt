import axios, { AxiosError } from "axios";
// import { apiBasePathAuth, uiBasePath } from "./envUrl";

// const instance = axios.create({
//     withCredentials: true,
//     baseURL: 'http://localhost:8080/',
//     headers: {
//         'Accept': '*/*',
//         'Content-Type': 'application/json',
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
//         'Referer': 'http://localhost:3000/',
//         'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
//         'sec-ch-ua-platform': '"Windows"',
//         'sec-ch-ua-mobile': '?0',
//     },
// });

// instance.interceptors.request.use(
//     (config: any) => {
//         config.headers = {
//             Accept: "*/*",
//         };
//         return Promise.resolve(config);
//     },
//     (error: AxiosError) => {
//         return Promise.reject(error);
//     }
// );

// instance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error: AxiosError) => {
//         if (
//             error.response?.status === 401
//         ) {
//             localStorage.clear();
//             sessionStorage.clear();
//             window.location.href = 'localhost/3000/' + "login";
//         }
//         return Promise.reject(error);
//     }
// );

const Instance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default Instance;
