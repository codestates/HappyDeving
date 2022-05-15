import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, editProfile } from "../../../../features/user/userSlice";
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

const UpdateUser = (props) => {
  // console.log("updateuser props: ", props);
  const { isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Div>
        <ConfirmTitle>수정이 완료되었습니다!</ConfirmTitle>
        {/* <ConfirmSubtitle>수정 후에는 이전 정보로 되돌릴 수 없습니다.</ConfirmSubtitle> */}
        <ConfirmButton
          onClick={async () => {
            await dispatch(editProfile(props));
            dispatch(reset());
            dispatch(closeModal());
            navigate("/profile");
          }}
        >
          확인
        </ConfirmButton>
      </Div>
    </>
  );
};
export default UpdateUser;
