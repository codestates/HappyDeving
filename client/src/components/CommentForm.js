/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const CommentFormDiv = styled.div`
  grid-column: 4/12;
  /* position: relative; */
  height: auto;
  padding: 0.5% 2% 6% 2%;

  div {
    form {
      margin-bottom: 10px;
      border-radius: 30px;
      text-align: center;
      textarea {
        width: 100%;
        height: 80px;
        margin-bottom: 20px;
        margin-top: 20px;
        border: 1px solid rgb(107, 114, 12);
      }
      button {
        font-size: 16px;
        float: right;
        width: 5vw;
        height: 30px;
        text-align: center;
        line-height: 30px;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-column: 3 / 13;
    transition: 2s;
  }
  @media screen and (max-width: 767px) {
    grid-column: 1 / 15;
    transition: 2s;
    flex-direction: column;
  }
`;

const CommentForm = ({
  commentId,
  studyId,
  replyId,
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialContent = "",
}) => {
  const { user } = useSelector((state) => state.user);

  const [content, setContent] = useState(initialContent);

  const commentData = {
    content: content,
    user_id: user?.id,
    study_id: studyId,
    parentId: replyId ? replyId : null,
    study_commentId: commentId,
  };

  const isTextareaDisabled = content.length === 0;
  const onSubmit = (e) => {
    e.preventDefault();
    commentData["content"] = content;
    handleSubmit(commentData);
    setContent("");
  };
  return (
    <CommentFormDiv>
      <div>
        <form onSubmit={onSubmit}>
          <textarea
            className="comment-form-textarea"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          {/* 버튼 태그 form 바깥으로 빼면 작동 안 함 */}
          <button disabled={isTextareaDisabled}>{submitLabel}</button>
          {hasCancelButton && <button onClick={handleCancel}>취소</button>}
        </form>
      </div>
    </CommentFormDiv>
  );
};

export default CommentForm;
