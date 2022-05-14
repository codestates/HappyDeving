/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CommentDiv = styled(Content)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const CommentUpperPart = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  font-size: 16px;
`;
const CommentRightPart = styled.div`
  width: 100%;
`;
const CommentDownPart = styled.div`
  /* background-color: yellow; */
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  font-size: 16px;
`;
const CommentImageContainer = styled.div`
  /* background-color: yellow; */
  width: 60px;
  height: 40px;
  border-radius: 10px;
  margin-right: 2%;
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
`;
const CommentText = styled.div`
  /* background-color: yellow; */
  width: 100%;
  height: auto;
`;
const CommentAuthor = styled.div`
  font-size: 16px;
`;
const CommentDate = styled.div`
  font-size: 14px;
`;

const CommentActions = styled.div`
  display: flex;
  font-size: 12px;
  color: rgb(51, 51, 51);
  cursor: pointer;
  margin-top: 8px;
  margin-right: 10%;
`;
const CommentAction = styled.div`
  /* background-color: orange; */
  margin-right: 8px;
`;
const Replies = styled.div`
  margin-top: 10px;
`;

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  addComment,
  updateComment,
  deletingComment,
  parentId = null,
}) => {
  const { user } = useSelector((state) => state.user);

  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";

  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";

  const canDelete = user?.id === comment.user_id && replies.length === 0;
  const canReply = Boolean(user?.id) && !comment.parentId;
  const canEdit = user?.id === comment.user_id;

  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <CommentDiv>
      <CommentUpperPart key={comment.id}>
        <CommentImageContainer>
          <img src={user?.id === comment.user_id ? user.image : comment.image} alt=""></img>
        </CommentImageContainer>
        <CommentRightPart>
          <CommentAuthor>{comment.username}</CommentAuthor>
          <CommentDate>{createdAt}</CommentDate>
        </CommentRightPart>
      </CommentUpperPart>
      {!isEditing && <CommentText>{comment.content}</CommentText>}
      <CommentDownPart>
        {isEditing && (
          <CommentForm
            submitLabel="수정"
            studyId
            commentId={comment.id}
            hasCancelButton
            initialContent={comment.content}
            handleSubmit={updateComment}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <CommentActions>
          {canReply && (
            <CommentAction
              type="button"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              답글
            </CommentAction>
          )}
          {canEdit && (
            <CommentAction
              type="button"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              {/* <FontAwesomeIcon icon="fas fa-edit" size="1x" /> */}수정
            </CommentAction>
          )}
          {canDelete && (
            <CommentAction
              type="button"
              onClick={() => deletingComment(comment)}
            >
              {/* <FontAwesomeIcon icon="fas fa-trash" size="1x" /> */}삭제
            </CommentAction>
          )}
        </CommentActions>
        {isReplying && (
          <CommentForm
            commentId={comment.id}
            studyId={comment.study_id}
            replyId={replyId}
            submitLabel="작성"
            handleSubmit={addComment}
          />
        )}
        {replies.length > 0 && (
          <Replies>
            {replies.map((reply) => (
              <Comment
                studyId={comment.study_id}
                commentId={comment.id}
                comment={reply}
                key={reply.id}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
                deletingComment={deletingComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]} // 대댓글은 nested reply가 있으면 안 됨
              />
            ))}
          </Replies>
        )}
      </CommentDownPart>
    </CommentDiv>
  );
};

export default Comment;
