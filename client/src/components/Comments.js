/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Content from "./styles/Content.styled";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { editComment, writeComment, deleteComment } from "../features/comment/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../components/LoadingIndicator";

const StyledComments = styled(Content)`
  /* grid-column: 4 / 12; */
  margin-bottom: 20px;
`;
const CommentsContainer = styled.div`
  margin-top: 40px;
`;

const Comments = ({ comments, studyId }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.comment);

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);
  // console.log("rootComments: ", rootComments); // 잘 들어옴

  // 대댓글 순서는 댓글 순서와 반대
  const getReplies = (commentId) =>
    backendComments.filter((backendComment) => backendComment.parentId === commentId);

  const addComment = (commentData) => {
    console.log("작성 clicked");
    dispatch(writeComment(commentData));
    setActiveComment(null);
  };
  const updateComment = (commentData) => {
    console.log("수정 clicked");
    dispatch(editComment(commentData));
    setActiveComment(null);
  };
  const deletingComment = (commentData) => {
    console.log("삭제 clicked");
    dispatch(deleteComment(commentData));
  };

  useEffect(() => {
    setBackendComments(comments);
  }, [comments, backendComments]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <StyledComments>
        <CommentForm studyId={studyId} submitLabel="작성" handleSubmit={addComment} />
        <CommentsContainer>
          {rootComments.map((rootComment) => (
            <Comment
              key={rootComment.id}
              comment={rootComment}
              replies={getReplies(rootComment.id)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              updateComment={updateComment}
              deletingComment={deletingComment}
            />
          ))}
        </CommentsContainer>
      </StyledComments>
    </>
  );
};

export default Comments;
