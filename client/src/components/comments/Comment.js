/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

const CommentDiv = styled.div`
  display: flex;
  width: 100%;
  /* flex-wrap: wrap; */
  flex-direction: column;
  /* background: lavender; */
`;
const CommentUserDataPart = styled.div`
  width: 100%;
  display: flex;
  font-size: 16px;
  /* background: pink; */
  border-bottom: 1px solid gray;
`;
const CommentDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  width: 100%;
  /* background: blue; */
`;
const CommentUpperPart = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CommentDownPart = styled.div`
  width: 100%;
  /* display: flex; */
  margin-bottom: 10px;
  font-size: 16px;
  /* background: green; */
`;
const CommentImageContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin: 10px 5px;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }
`;

const Text = styled.div`
  width: 100%;
  padding-left: 5px;
  min-height: 30px;
  height: auto;
`;
const CommentAuthor = styled.div`
  font-size: 14px;
  border-radius: 10px;
  padding: 0px 5px;
  font-size: 14px;
  background-color: rgba(233, 193, 255, 20%);
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
  margin-left: 5px;
  margin-right: 10%;
`;
const CommentAction = styled.div`
  margin-right: 8px;

  &:hover {
    color: #5e17eb;
    text-decoration: underline;
  }
`;
const Replies = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  margin-top: 10px;
`;
const ReplieIcon = styled.div`
  margin-top: 10px;
  position: absolute;
  left: -40px;
  font-size: 25px;
  color: gray;
  transform: rotate(175deg);
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
  const moment = require("moment");

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
  const createdAt = moment(comment.createdAt).format("YYYY-MM-DD");

  return (
    <CommentDiv>
      <CommentUserDataPart key={comment.id}>
        <CommentImageContainer>
          <img
            src={user?.id === comment.user_id ? user?.image : comment.image}
            alt=""
          />
        </CommentImageContainer>
        <CommentDataContainer>
          <CommentUpperPart>
            <CommentAuthor>
              {user?.id === comment.user_id ? user?.username : comment.username}
            </CommentAuthor>
            <CommentDate>{createdAt}</CommentDate>
          </CommentUpperPart>
          {!isEditing && <Text>{comment.content}</Text>}
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
        </CommentDataContainer>
      </CommentUserDataPart>

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
            <ReplieIcon>
              <FontAwesomeIcon icon={faReply} />
            </ReplieIcon>
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
