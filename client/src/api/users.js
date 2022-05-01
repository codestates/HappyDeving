import axios from "axios";
import { REACT_APP_API_URL } from "../config";

axios.defaults.baseURL = `${REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;

export const signupApi = (data) => axios.post("/users/signup", data);

export const verifyEmailApi = ({ id, accessToken }) =>
  axios.get(`/users/${id}/verify/${accessToken}`);

export const signinApi = (data) => axios.post("/users/signin", data);

export const signoutApi = () => axios.post("/users/signout");
