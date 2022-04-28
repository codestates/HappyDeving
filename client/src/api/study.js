import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

// 스터디 검색 결과
export const getStudiesMapApi = ({ language, location, date }) =>
  `/search?language=${language}&location=${location}&date=${date}`;
//   axios.get(`/search?languaglse=${language}&location=${location}&date=${date}`);

// 스터디 상세 페이지
export const studyApi = ({ id }) => axios.get(`/study/${id}`);

// 스터디 글 삭제
export const deleteStudyApi = ({ id }) => axios.delete(`/study/${id}`);

// 찜 목록 스터디 추가
export const addLikedStudyApi = () => axios.get("/study/like");

//  찜 목록 스터디 삭제
export const UnLikedStudyApi = () => axios.delete("/study/like");

export const writeMyStudyApi = ({ id }) => axios.get(`/study/${id}`);
