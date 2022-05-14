import React from "react";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";

const StyledWrite = styled(Content)`
  grid-column: 3 / 13;
  height: 400px;
  text-align: center;
  /* x, y, blur-radius, spread */
`;

const Write = () => {
  return <StyledWrite>Write Page</StyledWrite>;
};

export default Write;
