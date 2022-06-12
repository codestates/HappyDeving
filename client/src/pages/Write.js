import React from "react";
import styled from "styled-components";

const StyledWrite = styled.div`
  grid-column: 3 / 13;
  height: 400px;
  text-align: center;
  /* x, y, blur-radius, spread */
`;

const Write = () => {
  return <StyledWrite>Write Page</StyledWrite>;
};

export default Write;
