import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
axios.defaults.headers = { "Content-Type": "application/json" };

export const signupApi = (data) => axios.post("/users/signup", data);

export const verifyEmailApi = ({ id, accessToken }) =>
  axios.get(`/users/${id}/verify/${accessToken}`);

export const signinApi = (data) => axios.post("/users/signin", data);

export const signoutApi = () => axios.post("/users/signout");
