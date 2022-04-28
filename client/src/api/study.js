import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
axios.defaults.headers = { "Content-Type": "application/json" };

// 스터디 검색 결과
export const getStudiesMapApi = ({ language, location, date }) =>
  `/search?language=${language}&location=${location}&date=${date}`;
//   axios.get(`/search?language=${language}&location=${location}&date=${date}`);

// 찜 목록 스터디 불러오기
export const addLikedStudyApi = () => axios.get("/study/like");
//  찜 목록 스터디 삭제
export const UnLikedStudyApi = () => axios.delete("/study/like");
// 스터디 상세페이지
export const studyApi = ({ id }) => axios.get(`/study/${id}`);
