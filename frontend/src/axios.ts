import axios, { AxiosInstance } from "axios";
const APIURL=import.meta.env.VITE_APIURL;


export const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${APIURL}/api`,
});