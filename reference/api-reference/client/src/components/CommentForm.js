/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const CommentFormDiv = styled.div`
  grid-column: 4/12;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  /* position: relative; */
  /* height: auto; */
  /* background-color: red; */
  /* padding: 0.5% 2% 6% 2%; */
  height: 120px;

  /* div { */
  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* background-color: whitesmoke; */
    height: 120px;
  }
  textarea {
    width: 100%;
    height: 80px;
    /* margin-bottom: 20px; */
    margin-top: 10px;
    border-radius: 5px;
    background-color: rgba(233, 193, 255, 20%);
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
const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  /* background-color: red; */
`;
const Button = styled.button`
  display: flex;
  /* background-color: orange; */
  font-size: 13px;

  color: rgb(51, 51, 51);
  cursor: pointer;
  margin-top: 8px;
  margin-right: 10px;
  &:hover {
    color: #5e17eb;
    text-decoration: underline;
  }
`;
// const Button = styled.button`
//   /* margin-left: 42%; */
//   /* margin-top: 10%; */
//   margin-right: 5px;
//   padding: 3px 8px;
//   cursor: pointer;
//   border-radius: 10px;
//   border: 1px solid #5e17eb;
//   font-size: 14px;

//   &:hover {
//     color: #5e17eb;
//   }
// `;
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
          <ButtonWrap>
            <Button disabled={isTextareaDisabled}>{submitLabel}</Button>
            {hasCancelButton && <Button onClick={handleCancel}>취소</Button>}
          </ButtonWrap>
        </form>
      </div>
    </CommentFormDiv>
  );
};

export default CommentForm;
