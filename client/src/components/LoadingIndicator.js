import React from "react";
import styled from "styled-components";
import Content from "./styles/Content.styled";

const StyledLoadingIndicator = styled(Content)`
  position: fixed;
  z-index: 1000;
  /* background-color: rgba(0, 0, 0, 0.1); */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;
`;
const Spinner = styled(Content)`
  z-index: 1500;
  width: 64px;
  height: 64px;
  border: 8px solid;
  border-color: #000 transparent #555 transparent;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function LoadingIndicator() {
  return (
    <StyledLoadingIndicator>
      <Spinner></Spinner>
    </StyledLoadingIndicator>
  );
}

export default LoadingIndicator;
