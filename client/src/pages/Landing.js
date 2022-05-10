import React, { useState } from "react";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
import { Search } from "../components/styles/Search.styled";

const StyledSearch = styled.div`
  grid-column: 3/13;
  grid-row: 3/4;
  width: auto;

  @media screen and (max-width: 768px) {
    display: none;
  }
  display: ${(props) => (props.drop ? "none" : "display")};
  margin-top: 40px;
`;

const Main = styled(Content)`
  grid-row: 6/13;
  height: 1000px;
  background-color: white;
  grid-column: 1/15;
`;

const Landing = ({ drop }) => {
  return (
    <>
      <StyledSearch drop={drop}>
        <Search />
      </StyledSearch>
      <Main></Main>
    </>
  );
};

export default Landing;
