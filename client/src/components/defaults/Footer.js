import React from "react";
import styled from "styled-components";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const StyledFooter = styled.div`
  grid-column: 4/12;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 400px;
  color: black;
  padding: 40px;
  border-top: 1px solid #5e17eb;

  h1 {
    font-size: 16px;
    color: #5e17eb;
  }

  @media screen and (max-width: 1024px) {
    grid-column: 3/13;
  }
  @media screen and (max-width: 764px) {
    grid-column: 2/14;
  }
`;
const FooterInfo = styled.div`
  display: flex;
  /* justify-content: center; */
`;
const InfoContainer = styled.div`
  display: flex;
  @media screen and (max-width: 1024px) {
    /* flex-direction: column; */
    h1 {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    h1 {
      font-size: 14px;
    }
  }
`;

const InfoWrap = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  padding: 30px 30px;
  margin: 0px;

  p {
    margin-top: 5px;
    font-size: 14px;
  }
  @media screen and (max-width: 1024px) {
    p {
      font-size: 12px;
    }
    padding: 20px 30px;
  }
`;
const Icon = styled.a`
  font-size: 30px;
  color: black;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: #c593fe;
    position: relative;
    top: 2px;
  }
  @media screen and (max-width: 1024px) {
    font-size: 25px;
    transition: 0.5s;
  }
  @media screen and (max-width: 768px) {
    transition: 0.5s;
    font-size: 20px;
  }
`;
const Copyright = styled.p`
  padding-bottom: 50px;
  font-size: 14px;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
    transition: 0.5s;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <h1> About us </h1>
      <FooterInfo>
        <InfoContainer>
          <InfoWrap>
            <p className="name">곽나경</p>
            <p>Front-End</p>
            <Icon href="https://github.com/nicky0830" target="_blank">
              <FontAwesomeIcon icon={faGithubAlt} />
            </Icon>
          </InfoWrap>
          <InfoWrap>
            <p className="name">이희영</p>
            <p>Back-End</p>
            <Icon href="https://github.com/almond-flavoured" target="_blank">
              <FontAwesomeIcon icon={faGithubAlt} />
            </Icon>
          </InfoWrap>
        </InfoContainer>
        <InfoContainer>
          <InfoWrap>
            <p className="name">전소미</p>
            <p>Front-End</p>
            <Icon href="https://github.com/TripToCodes" target="_blank">
              <FontAwesomeIcon icon={faGithubAlt} />
            </Icon>
          </InfoWrap>
          <InfoWrap>
            <p className="name">지영서</p>
            <p>Front-End</p>
            <Icon href="https://github.com/youngseoJi" target="_blank">
              <FontAwesomeIcon icon={faGithubAlt} />
            </Icon>
          </InfoWrap>
        </InfoContainer>
      </FooterInfo>
      <Copyright> Copyright © 2022 HappyDaving </Copyright>
    </StyledFooter>
  );
};

export default Footer;
