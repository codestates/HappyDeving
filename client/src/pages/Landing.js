import React from "react";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";

const StyledLanding = styled(Content)`
  grid-column: 2 / 14;
  height: 400px;
  text-align: center;
  /* x, y, blur-radius, spread */
`;

const Landing = () => {
  return <StyledLanding>Landing Page</StyledLanding>;
};

export default Landing;
