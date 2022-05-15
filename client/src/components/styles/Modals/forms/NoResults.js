/* eslint-disable react/prop-types */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { closeModal } from "../../../../features/modal/modalSlice";
import LoadingIndicator from "../../../LoadingIndicator";

const ConfirmTitle = styled.h2`
  font-size: 16px;
  padding: 5%;
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

const NoResult = (props) => {
  console.log("Noresult props: ", props); // { study_id: id }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.allStudies);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <div>
        <ConfirmTitle>검색 결과가 없습니다.</ConfirmTitle>
        <ConfirmButton
          onClick={async () => {
            dispatch(closeModal());
            navigate("/");
          }}
        >
          확인
        </ConfirmButton>
      </div>
    </>
  );
};
export default NoResult;
