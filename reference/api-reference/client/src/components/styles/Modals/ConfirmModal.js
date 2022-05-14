/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import UpdateUser from "./forms/UpdateUser";
import UpdateStudy from "./forms/UpdateStudy";
import DeleteUser from "./forms/DeleteUser";
import DeleteStudy from "./forms/DeleteStudy";
import WriteStudy from "./forms/WriteStudy";
import { closeModal } from "../../../features/modal/modalSlice";

const ModalBackdrop = styled.div`
  opacity: 0;
  visibility: hidden;

  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;

  &.modal-show {
    opacity: 1;
    visibility: visible;
  }
`;
const ModalContainer = styled.div`
  opacity: 0;
  visibility: hidden;

  position: fixed;
  z-index: 1500;
  background-color: white;
  height: 250px;
  width: 350px;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.1);
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s;

  &.modal-show {
    opacity: 1;
    visibility: visible;
  }
`;
const ModalClose = styled.div`
  top: 10px;
  right: 10px;
  position: absolute;
  height: 20px;
  width: 20px;
  border: 2px solid #5e17eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #5e17eb;

  button {
    display: block;
    /* height: 70%;
  width: 70%; */
  }
`;
const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const { isOpen, componentName, childrenProps } = useSelector((state) => state.modal);
  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const componentsLookUp = { UpdateUser, DeleteUser, UpdateStudy, DeleteStudy, WriteStudy };
  let renderComponent;
  if (componentName) {
    const SelectedComponent = componentsLookUp[componentName];
    if (SelectedComponent) {
      renderComponent = <SelectedComponent {...childrenProps} />;
    }
  }
  return (
    <>
      <ModalBackdrop
        onClick={closeModalHandler}
        className={isOpen ? "modal-show" : null}
      ></ModalBackdrop>

      <ModalContainer className={isOpen ? "modal-show" : null}>
        <ModalClose>
          <button onClick={closeModalHandler}>
            <FontAwesomeIcon icon={faClose} size="1x" />
          </button>
        </ModalClose>
        <ModalContent>{renderComponent}</ModalContent>
      </ModalContainer>
    </>
  );
};

export default ConfirmModal;
