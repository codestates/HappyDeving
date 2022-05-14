import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, editProfile } from "../../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { closeModal } from "../../../../features/modal/modalSlice";
import LoadingIndicator from "../../../LoadingIndicator";

const ConfirmTitle = styled.h2`
  font-size: 16px;
`;
const ConfirmSubtitle = styled.p`
  font-size: 14px;
  /* margin-bottom: 10%; */
`;
const ConfirmButton = styled.button`
  margin-left: 38%;
  margin-top: 25%;
  padding: 3px 8px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #5e17eb;
  font-size: 14px;

  &:hover {
    color: #5e17eb;
  }
`;

const CheckEmail = (props) => {
  // console.log("CheckEmail props: ", props);
  const { isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div>
        <ConfirmTitle>이메일 인증이 되지 않은 사용자입니다.</ConfirmTitle>
        <ConfirmSubtitle>수신함을 확인해 주세요!</ConfirmSubtitle>
        <ConfirmButton
          onClick={() => {
            dispatch(reset());
            dispatch(closeModal());
          }}
        >
          확인
        </ConfirmButton>
      </div>
    </>
  );
};
export default CheckEmail;
