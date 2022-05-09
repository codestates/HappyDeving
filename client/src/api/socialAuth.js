import axios from "axios";

export const GoogleLoginApi = (data) => axios.post("/users/login/google", data);

export const GithubLoginApi = (data) => axios.post("/users/login/github", data);

export const KakaoLoginApi = (data) => axios.post("/users/login/kakao", data);
