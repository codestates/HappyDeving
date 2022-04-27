import React from "react";
import styled from "styled-components";
import Content from "./styles/Content.styled";

const StyledLoadingIndicator = styled(Content)`
  grid-column: 2 / 14;
  height: 400px;
  /* x, y, blur-radius, spread */
  position: fixed;
  /* top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Spinner = styled(Content)`
  width: 64px;
  height: 64px;
  border: 8px solid;
  border-color: #000 transparent #555 transparent;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
`;

function LoadingIndicator() {
  return (
    <StyledLoadingIndicator>
      <Spinner></Spinner>
    </StyledLoadingIndicator>
  );
}

export default LoadingIndicator;
