import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  grid-column: 2/14;
  height: 120px;
  color: white;
  border-top: 1px solid #5e17eb;
  margin-top: 80px;
  /* lavender: "#C593FE",; */
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>Footer</div>
      <div>Footer</div>
      <div>Footer</div>
      <div>Footer</div>
    </StyledFooter>
  );
};

export default Footer;
