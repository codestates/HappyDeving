/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CommentDiv = styled.div`
  /* background-color: yellow; */
  width: 100%;
  display: flex;
  padding: 0rem 0rem 0rem 0.5rem;
  box-shadow: none;
  /* border: 1px solid rgba(205, 201, 208, 0.28); */
`;
const CommentImageContainer = styled(Content)`
  /* background-color: yellow; */
  width: 100px;
  height: 85px;
  margin-right: 2%;
  background-color: rgba(205, 201, 208, 0.68);
`;
const CommentRightPart = styled.div`
  width: 50%;
  box-shadow: none;
  /* border: 1px solid rgba(205, 201, 208, 0.28); // border 있으면 박스안에 둥근 테두리 보임 */
`;
const CommentAuthorAndDate = styled(Content)`
  width: 100%;
  box-shadow: none;
  font-size: 0.8rem;
  display: flex;
  span {
    margin-right: 40px;
  }
`;
const CommentContent = styled(Content)`
  width: 100%;
  box-shadow: none;
  border: none;
`;

const Button = styled(Content)`
  margin-right: 2rem;
  float: right;
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
  addComment,
  updateComment,
  deletingComment,
  parentId = null,
  studyId,
}) => {
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const isEditing =
    activeComment && activeComment.id === comment.id && activeComment.type === "editing";

  const isReplying =
    activeComment && activeComment.id === comment.id && activeComment.type === "replying";

  const canDelete = user.username === comment.username && replies.length === 0;
  const canReply = Boolean(user.id);
  const canEdit = user.username === comment.username;

  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <CommentDiv key={comment.id}>
      <CommentImageContainer>
        <img src="https://i.ibb.co/nr4FYns/happydevil.png" />
      </CommentImageContainer>
      <CommentRightPart>
        <CommentAuthorAndDate>
          <span className="comment-author">{comment.username}</span>
          <span>{createdAt}</span>
        </CommentAuthorAndDate>
        {!isEditing && <CommentContent>{comment.content}</CommentContent>}
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
        <div className="comment-actions">
          {canReply && (
            <Button>
              <button
                className="comment-action"
                onClick={() => setActiveComment({ id: comment.id, type: "replying" })}
              >
                답글
              </button>
            </Button>
          )}
          {canEdit && (
            <Button>
              <button
                className="comment-action"
                onClick={() => setActiveComment({ id: comment.id, type: "editing" })}
              >
                {/* <FontAwesomeIcon icon="fas fa-edit" size="1x" /> */}수정
              </button>
            </Button>
          )}
          {canDelete && (
            <Button>
              <button className="comment-action" onClick={() => deletingComment(comment)}>
                {/* <FontAwesomeIcon icon="fas fa-trash" size="1x" /> */}삭제
              </button>
            </Button>
          )}
        </div>
        {isReplying && (
          <CommentForm
            commentId={comment.id}
            studyId={studyId}
            replyId={replyId}
            submitLabel="작성"
            handleSubmit={addComment}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
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
                currentUsername={user.name}
              />
            ))}
          </div>
        )}
      </CommentRightPart>
    </CommentDiv>
  );
};

export default Comment;
