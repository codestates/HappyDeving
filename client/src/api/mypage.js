import axios from "axios";
import { REACT_APP_API_URL } from "../config";

axios.defaults.baseURL = `${REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;
axios.defaults.headers = { "Content-Type": "application/json" };

export const editNameApi = (data) => axios.patch("/mypage", data);

export const deleteUserApi = () => axios.delete("/mypage");

// export const changePasswordApi = (data) => axios.patch("/mypage", data);
