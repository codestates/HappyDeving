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

const ConfirmTitle = styled.h2`
  font-size: 16px;
  padding: 5%;
`;
const ConfirmSubtitle = styled.p`
  font-size: 14px;
  padding: 5%;

  /* margin-bottom: 10%; */
`;
const ConfirmButton = styled.button`
  margin-left: 42%;
  margin-top: 10%;
  padding: 3px 8px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #5e17eb;
  font-size: 14px;

  &:hover {
    color: #5e17eb;
  }
`;

const DeleteStudy = (props) => {
  console.log("DeleteStudy props: ", props); // { study_id: id }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.allStudies);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <div>
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
      </div>
    </>
  );
};
export default DeleteStudy;
