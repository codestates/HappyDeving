/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudy,
  reset,
} from "../../../../features/studies/allStudiesSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { closeModal } from "../../../../features/modal/modalSlice";
import LoadingIndicator from "../../../LoadingIndicator";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ConfirmTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ConfirmButton = styled.button`
  margin-top: 10%;
  padding: 3px 15px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #5e17eb;
  font-size: 14px;

  &:hover {
    color: #5e17eb;
  }
`;

const ConfirmSubtitle = styled.p`
  font-size: 14px;

  /* margin-bottom: 10%; */
`;

const DeleteStudy = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.allStudies);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <Div>
        <ConfirmTitle>게시글을 삭제하시겠습니까?</ConfirmTitle>
        <ConfirmSubtitle>삭제한 데이터는 복구할 수 없습니다.</ConfirmSubtitle>
        <ConfirmButton
          onClick={async () => {
            await dispatch(deleteStudy(props));
            dispatch(reset());
            dispatch(closeModal());
            navigate("/mystudy");
          }}
        >
          확인
        </ConfirmButton>
      </Div>
    </>
  );
};
export default DeleteStudy;
