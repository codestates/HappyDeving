import React from "react";
import styled from "styled-components";
import Content from "../styles/Content.styled";

const StyledSection = styled(Content)`
  grid-column: 1/ 15;
  height: 400px;
  position: relative;
  /* x, y, blur-radius, spread */
`;

const Section = () => {
  return <StyledSection></StyledSection>;
};

export default Section;
