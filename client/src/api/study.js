import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
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
