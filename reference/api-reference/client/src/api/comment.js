import axios from "axios";

export const getCommentsApi = (id) => axios.get(`/study/${id}/comments`);
// body: user_id, study_id, content, parentId=null, 대댓글일때만 parentId=study_commentId
export const writeCommentApi = (data) => axios.post("/studies/comment", data);

// body: study_commentId, content
export const editCommentApi = (data) => axios.patch("/studies/comment", data);

// body: user_id, study_commentId
export const deleteCommentApi = (data) => axios.delete("/studies/comment", { data: data });
