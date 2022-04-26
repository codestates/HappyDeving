import React from "react";
import styled from "styled-components";
import Content from "../styles/Content.styled";

const StyledSearch = styled(Content)`
  grid-column: 4/ 12;
  height: 80px;
  text-align: center;
`;

const Search = () => {
  return (
    <StyledSearch>
      <div>Search Bar</div>
    </StyledSearch>
  );
};

export default Search;
