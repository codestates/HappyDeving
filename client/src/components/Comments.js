/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Content from "./styles/Content.styled";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  editComment,
  writeComment,
  deleteComment,
  getComments,
} from "../features/comment/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../components/LoadingIndicator";

const StyledComments = styled(Content)`
  /* grid-column: 4 / 12; */
  margin-bottom: 20px;
`;
const CommentsContainer = styled.div`
  margin-top: 40px;
  /* background-color: rgba(233, 193, 255, 10%); */
`;

const Comments = ({ studyId }) => {
  const dispatch = useDispatch();
  const [activeComment, setActiveComment] = useState(null);
  const { comments, isLoading } = useSelector((state) => state.comment);
  const rootComments = comments.filter((backendComment) => backendComment.parentId === null);

  const getReplies = (commentId) =>
    comments.filter((backendComment) => backendComment.parentId === commentId);

  const addComment = async (commentData) => {
    await dispatch(writeComment(commentData));
    setActiveComment(null);
  };
  const updateComment = async (commentData) => {
    await dispatch(editComment(commentData));
    setActiveComment(null);
  };
  const deletingComment = (commentData) => {
    dispatch(deleteComment(commentData));
  };

  useEffect(() => {
    dispatch(getComments(studyId));
  }, []);

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
