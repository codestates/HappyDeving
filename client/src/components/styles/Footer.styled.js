import React from "react";
import styled from "styled-components";
import Content from "../styles/Content.styled";

const StyledFooter = styled(Content)`
  grid-column: 3 / 13;
  height: 120px;
  text-align: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>Footer</div>
    </StyledFooter>
  );
};

export default Footer;
