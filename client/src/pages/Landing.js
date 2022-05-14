/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

import Slider from "../components/Slider";
import whiteSpace from "../../src/assets/whiteSpace.png";
import landing_02 from "../../src/assets/landing2.png";
import landing_03 from "../../src/assets/landing3.png";

const StyledLanding = styled.div`
  font-family: "Binggrae";

  grid-column: 4 / 12;

  display: flex;
  align-items: center;

  position: relative;
  width: 100%;
  height: 60vh;
  transition: 2s;
  margin-top: 100px;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-column: 2 / 14;
    transition: 2s;
  }
  @media screen and (max-width: 767px) {
    grid-column: 1 / 15;
    transition: 2s;
    flex-direction: column;
  }
`;

const LandingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  /* top: 5%; */
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    object-fit: cover;
  }
  @media screen and (max-width: 767px) {
    object-fit: scale-down;
  }
`;

const TitleTransBox = styled.div`
  width: 100%;
  font-size: 2.5rem;
  margin: 50px;
  background-color: #ffffff;
  opacity: 0.8;
  position: absolute;
  top: 80%;
  p {
    margin: 2%;
    font-weight: bold;
    color: #000000;
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      font-size: 2rem;
      width: 80%;
    }
    @media screen and (max-width: 767px) {
      padding: 20px;
      width: 100%;
      font-size: 1.5rem;
      margin-left: 20px;
      flex-wrap: wrap;
    }
  }
`;

const Landing = ({ drop, imageSrc }) => {
  return (
    <>
      <StyledLanding>
        <LandingImage src={imageSrc} />
        <TitleTransBox>
          <p>우리동네 스터디 "해피데빙"에서 찾자!</p>
        </TitleTransBox>
      </StyledLanding>
      <Slider imageSrc={whiteSpace} />
      <Slider
        imageSrc={landing_02}
        title={`" 위치 기반 검색 "`}
        subtitle={"당신의 주변에서 일어나고 있는 놀라운 프로젝트를 찾아보세요."}
      ></Slider>
      <Slider imageSrc={whiteSpace} />
      <Slider
        imageSrc={landing_03}
        title={`" 같이의 가치 "`}
        subtitle={"당신의 드림 프로젝트, 함께 하면 현실이 됩니다."}
        flipped={true}
      ></Slider>
    </>
  );
};

export default Landing;
