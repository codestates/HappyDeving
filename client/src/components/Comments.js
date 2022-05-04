/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Content from "./styles/Content.styled";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { writeComment } from "../features/comment/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../components/LoadingIndicator";

const StyledComments = styled(Content)`
  margin-bottom: 20px;
`;
const CommentsContainer = styled(Content)`
  margin-top: 40px;
`;

const Comments = ({ commentsInStudyData, studyId, currentUserId }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.comment);
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);
  // console.log("rootComments: ", rootComments); // 잘 들어옴

  // 대댓글 순서는 댓글 순서와 반대
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  useEffect(() => {
    setBackendComments(commentsInStudyData);
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <StyledComments>
      <CommentForm
        studyId={studyId}
        submitLabel="작성"
        handleSubmit={(commentData) => dispatch(writeComment(commentData))}
      />
      <CommentsContainer>
        {rootComments.map((rootComment) => (
          <Comment
            studyId={studyId}
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            currentUserId={currentUserId}
          />
        ))}
      </CommentsContainer>
    </StyledComments>
  );
};

export default Comments;
