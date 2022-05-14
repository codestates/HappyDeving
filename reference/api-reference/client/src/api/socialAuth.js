import axios from "axios";

export const GoogleLoginApi = (data) => axios.post("/users/login/google", data);

export const GithubLoginApi = (data) => {
  console.log(data);
  axios.post("/users/login/github", { data: { token: data.tokenId } });
};

export const KakaoLoginApi = (data) => axios.post("/users/login/kakao", data);
