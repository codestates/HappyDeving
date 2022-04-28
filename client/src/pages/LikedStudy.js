import React from "react";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";

const StyledSection = styled(Content)`
  grid-column: 2 / 14;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const StyledLikedStudy = styled(Content)`
  grid-column: 2 / 12;
  background: pink;
  height: 400px;
  text-align: center;
  /* x, y, blur-radius, spread */
`;

const LikedStudy = () => {
  return (
    <>
      <StyledSection>
        <StyledLikedStudy>LikedStudy Page</StyledLikedStudy>
      </StyledSection>
    </>
  );
};

export default LikedStudy;
