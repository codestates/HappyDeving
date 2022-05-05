/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment, writeComment, deleteComment } from "../features/comment/commentSlice";
import CommentForm from "./CommentForm";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = styled(Content)`
  margin-left: 5rem;
  /* float: right; */
  width: 5vw;
  height: 30px;
  color: white;
  text-align: center;
  line-height: 30px;
  background-color: ${(props) => props.theme.colors.purple};
  border-radius: 12px;
  box-shadow: 3px 2px 1px 1px #c593fe;
  &:hover {
    background-color: ${(props) => props.theme.colors.lavender};
  }
`;
const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  parentId = null,
  studyId,
  currentUserId,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const isEditing =
    activeComment && activeComment.id === comment.id && activeComment.type === "editing";

  const isReplying =
    activeComment && activeComment.id === comment.id && activeComment.type === "replying";

  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;

  const canDelete = currentUserId === comment.id && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.id && !timePassed;

  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-content">{comment.content}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="수정"
            hasCancelButton
            initialContent={comment.content}
            handleSubmit={(commentData) => {
              dispatch(editComment(commentData));
              setActiveComment(null);
            }}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <Button>
              <button
                className="comment-action"
                onClick={() => setActiveComment({ id: comment.id, type: "replying" })}
              >
                대댓글
              </button>
            </Button>
          )}
          {canEdit && (
            <Button>
              <button
                className="comment-action"
                onClick={() => setActiveComment({ id: comment.id, type: "editing" })}
              >
                <FontAwesomeIcon icon="fas fa-edit" size="1x" />
              </button>
            </Button>
          )}
          {canDelete && (
            <Button>
              <button
                className="comment-action"
                onClick={() =>
                  dispatch(deleteComment({ user_id: user.id, study_commentId: comment.id }))
                }
              >
                <FontAwesomeIcon icon="fas fa-trash" size="1x" />
              </button>
            </Button>
          )}
        </div>
        {isReplying && (
          <CommentForm
            studyId={studyId}
            replyId={replyId}
            submitLabel="작성"
            handleSubmit={(commentData) => {
              dispatch(writeComment(commentData));
              setActiveComment(null);
            }}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                parentId={comment.id}
                replies={[]} // 대댓글은 nested reply가 있으면 안 됨
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
