/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
// import { Search } from "../components/styles/Search.styled";
import Slider from "../components/Slider";
import whiteSpace from "../../src/assets/whiteSpace2.png";
import landing_02 from "../../src/assets/landing2.png";
import landing_03 from "../../src/assets/landing3.png";

const StyledLanding = styled.div`
  font-family: "Binggrae";
  grid-column: 3 / 13;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 60vh;
  transition: 2s;
  /* margin-top: 100px; */
  margin-bottom: 500px;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-column: 2 / 14;
    transition: 2s;
    margin-bottom: 300px;
  }
  @media screen and (max-width: 767px) {
    grid-column: 1 / 15;
    transition: 2s;
    flex-direction: column;
    margin-bottom: 100px;
  }
`;

const LandingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  /* top: 5%; */
  transition: 0.5s;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    object-fit: cover;
    transition: 0.5s;
  }
  @media screen and (max-width: 767px) {
    transition: 1s;
    height: 50%;
    object-fit: scale-down;
  }
`;

const TitleTransBox = styled.div`
  width: 100%;
  font-size: 3rem;
  margin: 100px 0px 10px 0px;
  /* background-color: rgba(233, 193, 255, 20%); */
  opacity: 0.8;
  position: absolute;
  top: 90%;
  text-align: center;

  h1 {
    white-space: nowrap;
    margin-bottom: 20px;
    font-weight: bold;
    color: #000000;
    font-size: 3rem;
    span {
      color: #5e17eb;
      font-size: 3.5rem;
    }
  }
  p {
    font-size: 2rem;
    color: rgb(70, 69, 71);
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    transition: 1s;
    h1 {
      font-size: 2.2rem;
      span {
        font-size: 2.5rem;
      }
    }
    p {
      font-size: 1.5rem;
    }
  }
  @media screen and (max-width: 767px) {
    transition: 1s;
    top: 60%;
    margin-top: 40px;
    h1 {
      padding: 20px;
      font-size: 1.5rem;
      flex-wrap: wrap;
      span {
        font-size: 2rem;
      }
    }
    p {
      font-size: 1.2rem;
    }
  }
`;

const Landing = ({ imageSrc }) => {
  return (
    <>
      <StyledLanding>
        <LandingImage src={imageSrc} />
        <TitleTransBox>
          <h1>
            ???????????? ????????? <span>"????????????"</span>?????? ??????
          </h1>
          <p>????????? ??? ????????? ????????? ?????? ????????? ?????????!</p>
        </TitleTransBox>
      </StyledLanding>
      {/* <Slider imageSrc={whiteSpace} style={{ height: "15vh" }} /> */}
      <Slider
        imageSrc={landing_02}
        title={`" ?????? ?????? ?????? "`}
        subtitle={"????????? ???????????? ???????????? ?????? ????????? ??????????????? ???????????????."}
      ></Slider>
      <Slider imageSrc={whiteSpace} style={{ height: "50vh" }} />
      <Slider
        imageSrc={landing_03}
        title={`" ????????? ?????? "`}
        subtitle={"????????? ?????? ????????????, ?????? ?????? ????????? ?????????."}
        flipped={true}
      ></Slider>
    </>
  );
};

export default Landing;
