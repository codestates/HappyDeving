/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import Slider from "../components/Slider";
import landing_01 from "../../src/assets/landing1.png";
import landing_02 from "../../src/assets/landing2.png";
import landing_03 from "../../src/assets/landing3.png";

const StyledLanding = styled.div`
  grid-column: 3 / 13;
  position: relative;
  width: 100%;
  height: 50vh;
  transition: 2s;
  // 태블릿
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-column: 2 / 14;
    transition: 2s;
  }
  // 모바일
  @media screen and (max-width: 767px) {
    grid-column: 1 / 15;
    transition: 2s;
  }
`;
// const LandingImage = styled.img`
//   width: 100%;
//   height: 80%;
//   object-fit: cover;
//   position: absolute;
// `;
const LandingTitle = styled.h1`
  position: absolute;
  background-color: rgb(236, 236, 236);
  border: 5px solid rgb(236, 236, 236);
  top: 22%;
  color: black;
  font-size: 3rem;
  padding: 15px;
  // 태블릿
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    transition: 1.5s;
    font-size: 2rem;
  }
  // 모바일
  @media screen and (max-width: 767px) {
    font-size: 1.5rem;
    transition: 1.5s;
    top: 40%;
  }
`;

const LandingSubtitle = styled.h1``;

const Landing = () => {
  return (
    <>
      <StyledLanding>
        {/* <LandingImage src={imageSrc} /> */}

        <Slider
          imageSrc={landing_01}
          // title={`" 위치 기반 검색 "`}
          // subtitle={"당신의 주변에서 일어나고 있는 놀라운 프로젝트를 찾아보세요."}
        >
          <LandingTitle>우리 동네 스터디를 찾고 있나요?</LandingTitle>
          <LandingSubtitle>
            해피데빙에서 당신은 더 멋진 개발자로 성장할 수 있습니다.
          </LandingSubtitle>
        </Slider>
        <Slider
          imageSrc={landing_02}
          title={`" 위치 기반 검색 "`}
          subtitle={"당신의 주변에서 일어나고 있는 놀라운 프로젝트를 찾아보세요."}
        ></Slider>
        <Slider
          imageSrc={landing_03}
          title={`" 같이의 가치 "`}
          subtitle={"당신의 드림 프로젝트, 함께 하면 현실이 됩니다."}
          flipped={true}
        ></Slider>
      </StyledLanding>
    </>
  );
};

export default Landing;
