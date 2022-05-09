/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
// import Content from "../components/styles/Content.styled";
import { useSelector } from "react-redux";

const CommentFormDiv = styled.div`
  grid-column: 4/13;
  /* width: 84vw; */
  height: auto;
  padding: 0.5% 2% 6% 2%;
  border-radius: ${(props) => props.theme.borderRadius};

  div {
    form {
      width: 60vw;
      margin-bottom: 10px;
      border-radius: 30px;
      text-align: center;
      textarea {
        grid-column: 2/14;
        width: 100%;
        height: 80px;
        margin-bottom: 20px;
        margin-top: 20px;
        border: 1px solid rgb(107, 114, 12);
      }
    }
  }
`;

const Button = styled.div`
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
          <Button>
            <button
              className="comment-form-button"
              disabled={isTextareaDisabled}
            >
              {submitLabel}
            </button>
          </Button>
          {hasCancelButton && (
            <Button>
              <button
                type="button"
                className="comment-form-button comment-form-cancel-button"
                onClick={handleCancel}
              >
                취소
              </button>
            </Button>
          )}
        </form>
      </div>
    </CommentFormDiv>
  );
};

export default CommentForm;
