import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
axios.defaults.headers = { "Content-Type": "application/json" };

export const getUserInfoApi = () => axios.get("/mypage");

export const editUserDataApi = (data) => axios.patch("/mypage", data);

export const deleteUserApi = () => axios.delete("/mypage");
