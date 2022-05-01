import axios from "axios";
import { REACT_APP_API_URL } from "../config";

axios.defaults.baseURL = `${REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;

export const GoogleLoginApi = (data) => axios.post("/users/login/google", data);

export const GithubLoginApi = (data) => axios.post("/users/login/github", data);

export const KakaoLoginApi = (data) => axios.post("/users/login/kakao", data);
