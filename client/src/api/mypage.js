import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const editNameApi = (data) => axios.patch("/mypage", data);

export const deleteUserApi = () => axios.delete("/mypage");

// export const changePasswordApi = (data) => axios.patch("/mypage", data);
