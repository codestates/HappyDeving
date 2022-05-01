import axios from "axios";
import { REACT_APP_API_URL } from "../config";
import authHeader from "../features/auth/authHeader";

axios.defaults.baseURL = `${REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;
axios.defaults.headers = { "Content-Type": "application/json", ...authHeader() };

console.log("mypage.axiosHeaders: ", axios.defaults.headers);

export const getProfileApi = (id) => axios.get(`/mypage/${id}`);

export const editProfileApi = (id, data) => axios.patch(`/mypage/${id}`, data);

export const deleteUserApi = () => axios.delete("/mypage");
