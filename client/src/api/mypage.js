import axios from "axios";
import { REACT_APP_API_URL } from "../config";

axios.defaults.baseURL = `${REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;
axios.defaults.headers = { "Content-Type": "application/json" };

export const getUserInfoApi = () => axios.get("/mypage");

export const editUserDataApi = (data) => axios.patch("/mypage", data);

export const deleteUserApi = () => axios.delete("/mypage");
