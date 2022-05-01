import React from "react";
import styled from "styled-components";
import ShareSocialButton from "./ShareSocial.styled";

const StyledFooter = styled.div`
  grid-column: 2/14;
  height: 120px;
  color: white;
  position: relative;
  bottom: 0px;
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
      <div>
        <ShareSocialButton />
      </div>
    </StyledFooter>
  );
};

export default Footer;
