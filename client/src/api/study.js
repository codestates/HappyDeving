import axios from "axios";
import { likeStudy, unLikeStudy } from "../features/studies/allStudiesSlice";

// 스터디 검색 결과
export const getStudiesMapApi = ({ guType, dongType, dateData, languageData }) => {
  console.log("gu", guType, "dong", dongType, "date", dateData, "lang", languageData);
  //위치 있는 경우
  if (guType && dongType) {
    console.log("gudong");
    //날짜와 언어 있는 경우
    if (dateData && languageData) {
      console.log("datelang");
      return axios.get(
        `/search?guType=${guType}&dongType=${dongType}&date=${dateData}&language=${languageData}`
      );
    }
    //날짜만 있는 경우
    else if (dateData) {
      console.log("date");
      return axios.get(`/search?guType=${guType}&dongType=${dongType}&date=${dateData}`);
    }
    //언어만 있는 경우
    else if (languageData) {
      return axios.get(`/search?guType=${guType}&dongType=${dongType}&language=${languageData}`);
    }
    //위치만 있는 경우
    else {
      return axios.get(`/search?guType=${guType}&dongType=${dongType}`);
    }
  }
  //위치가 없는 경우
  else {
    return "location is required";
  }
};

export const getAllStudiesApi = () => axios.get("/search");

export const studyApi = (id) => axios.get(`/study/${id}`);

export const writeStudyApi = (data) => axios.post(`/study/${data.id}`, data);

export const editStudyApi = (data) => axios.patch(`/study/${data.id}`, data);

export const deleteStudyApi = (data) => axios.delete(`/study/${data.study_id}`, { data: data });

export const likeStudyApi = (id, data) => axios.post(`/mypage/${id}/like`, data);

export const getLikedStudiesApi = (id) => axios.get(`/mypage/${id}/like`);

export const unLikeStudyApi = (id, data) => axios.delete(`/mypage/${id}/like/`, { data: data });

export const getMyStudiesApi = (id) => axios.get(`/mypage/${id}/write`);
