import axios from "axios";
import { REACT_APP_API_URL } from "../config";

axios.defaults.baseURL = `${REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;
axios.defaults.headers = { "Content-Type": "application/json" };

// 스터디 검색 결과
export const getStudiesMapApi = ({ language, location, date }) =>
  `/search?language=${language}&location=${location}&date=${date}`;
//   axios.get(`/search?language=${language}&location=${location}&date=${date}`);

// 찜 목록 스터디 추가
export const addLikedStudyApi = (data) => axios.patch("/study/like", data);
//  찜 목록 스터디 삭제
export const UnLikedStudyApi = () => axios.delete("/study/like");

export const studyApi = () => axios.get("/study/:id");
// ? :id인지 {id} 인지 물어보고추가작성하기
// export const study = () => axios.get("/study");
// export const study = () => axios.get("/study");
// export const study = () => axios.get("/study");
// export const study = () => axios.get("/study");
