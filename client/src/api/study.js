import axios from "axios";

// 스터디 검색 결과
export const getStudiesMapApi = ({
  guType,
  dongType,
  dateData,
  languageData,
}) => {
  console.log(
    "gu",
    guType,
    "dong",
    dongType,
    "date",
    dateData,
    "lang",
    languageData
  );
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
      return axios.get(
        `/search?guType=${guType}&dongType=${dongType}&date=${dateData}`
      );
    }
    //언어만 있는 경우
    else if (languageData) {
      return axios.get(
        `/search?guType=${guType}&dongType=${dongType}&language=${languageData}`
      );
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
// 모든 스터디
export const getAllStudiesApi = () => axios.get("/search");
// 스터디 상세 페이지
export const studyApi = (id) => axios.get(`/study/${id}`);

// 스터디 글쓰기
export const writeStudyApi = (data) => {
  console.log("write data.id", data.id);
  axios.post(`/study/${data.id}`, data);
};
// 스터디 글 수정
export const editStudyApi = (data) => axios.patch(`/study/${data.id}`, data);
// 스터디 글 삭제
export const deleteStudyApi = (data) =>
  axios.delete(`/study/${data.study_id}`, { data: data });

// 스터디 찜하기
export const likeStudyApi = (id, data) =>
  axios.post(`/mypage/${id}/like/`, data);
// 찜 목록 스터디 불러오기
export const getLikedStudiesApi = (id) => axios.get(`/mypage/${id}/like/`);
// 찜 목록 스터디 삭제
export const unLikeStudyApi = (id, data) => {
  axios.delete(`/mypage/${id}/like/`, { data: data });
};
// 내가 쓴 스터디 목록
export const getMyStudiesApi = (id) => axios.get(`/mypage/${id}/write`);
