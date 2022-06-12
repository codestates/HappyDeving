/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStudy, reset } from "../../../features/studies/allStudiesSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { closeModal } from "../../../features/modal/modalSlice";
import LoadingIndicator from "../../defaults/LoadingIndicator";

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

const UpdateStudy = (props) => {
  // console.log("edit study props: ", props); // {id: '2', title: 'asddddfadsf', content: 'would u likedd to join me?', kakaoLink: 'kakao.linddddddk', closed: true}

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.allStudies);

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
            await dispatch(editStudy(props));
            dispatch(reset());
            dispatch(closeModal());
            navigate(`/study/${props.id}`);
          }}
        >
          확인
        </ConfirmButton>
      </Div>
    </>
  );
};
export default UpdateStudy;
