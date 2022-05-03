//study.js
import axios from "axios";
import { REACT_APP_API_URL } from "../config";
import authHeader from "../features/user/authHeader";

axios.defaults.baseURL = `${REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;
axios.defaults.headers = { "Content-Type": "application/json", ...authHeader() };
// 스터디 검색 결과

export const getStudiesMapApi = ({ guType, dongType, dateData, languageData }) => {
  let date = "2022-04-29";
  if (guType && dongType) {
    if (dateData && languageData) {
      return axios.get(
        `/search?guType=${guType}&dongType=${dongType}&date=${date}&language=${languageData}`
      );
    }
    if (dateData) {
      return axios.get(`/search?guType=${guType}&dongType=${dongType}&date=${date}`);
    }
    if (languageData) {
      return axios.get(`/search?guType=${guType}&dongType=${dongType}&language=${languageData}`);
    }
    return axios.get(`/search?guType=${guType}&dongType=${dongType}`);
  } else {
    return "location is required";
  }
};
// 모든 스터디
export const getAllStudiesApi = () => axios.get("/search");
// 스터디 상세 페이지
export const studyApi = (id) => axios.get(`/study/${id}`);

// 스터디 글쓰기
export const writeStudyApi = (id, data) => axios.post(`/study/${id}`, data);
// 스터디 글 수정
export const editStudyApi = (id, data) => axios.patch(`/study/${id}`, data);
// 스터디 글 삭제
export const deleteStudyApi = (id, data) => axios.delete(`/study/${id}`, data);

// 스터디 찜하기
export const likeStudyApi = (id, data) => axios.post(`/mypage/${id}/like/`, data);
// 찜 목록 스터디 불러오기
export const getLikedStudiesApi = (id) => axios.get(`/mypage/${id}/like/`);
// 찜 목록 스터디 삭제
export const unLikeStudyApi = (id, data) => axios.delete(`/mypage/${id}/like/`, data);
// 내가 쓴 스터디 목록
export const getMyStudiesApi = (id) => axios.get(`/mypage/${id}/write`);
