import React from "react";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";

const StyledSection = styled(Content)`
  grid-column: 2 / 14;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const StyledMyStudy = styled(Content)`
  grid-column: 2 / 12;
  background: pink;
  height: 400px;
  text-align: center;
`;

const MyStudy = () => {
  return (
    <>
      <StyledSection>
        <StyledMyStudy>MyStudy Page{/* 카드생성하면 맵핑하기 */}</StyledMyStudy>;
      </StyledSection>
    </>
  );
};

export default MyStudy;
