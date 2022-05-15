/* eslint-disable react/prop-types */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
  padding: 5%;

  /* margin-bottom: 10%; */
`;

const DirectToLogin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.allStudies);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <Div>
        <ConfirmTitle>로그인이 필요한 서비스입니다.</ConfirmTitle>
        <ConfirmSubtitle>로그인 페이지로 이동합니다.</ConfirmSubtitle>

        <ConfirmButton
          onClick={async () => {
            dispatch(closeModal());
            navigate("/signin");
          }}
        >
          확인
        </ConfirmButton>
      </Div>
    </>
  );
};
export default DirectToLogin;
