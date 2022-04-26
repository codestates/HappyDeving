import React from "react";
import styled from "styled-components";
import Content from "../styles/Content.styled";

const StyledSection = styled(Content)`
  grid-column: 2 / 14;
  height: 400px;
  /* x, y, blur-radius, spread */
`;

const Section = () => {
  return <StyledSection></StyledSection>;
};

export default Section;
