import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
axios.defaults.headers = { "Content-Type": "application/json" };

export const editNameApi = (data) => axios.patch("/mypage", data);

export const deleteUserApi = () => axios.delete("/mypage");
