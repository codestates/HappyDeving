/* eslint-disable react/prop-types */
import React from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const SliderDefault = styled.div`
  grid-column: 3 / 13;
  display: flex;
  align-items: center;
  margin: 20px;
  opacity: 0;
  transform: scale(85%);
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
    flex-direction: column;
    background-color: rgb(236, 236, 236);
  }
`;
const SliderWithZoom = styled.div`
  grid-column: 3 / 13;
  display: flex;
  align-items: center;
  margin: 20px;
  opacity: 1;
  transform: scale(100%);
  transition: 2s;

  // 태블릿
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-column: 2 / 14;
  }
  // 모바일
  @media screen and (max-width: 767px) {
    grid-column: 1 / 15;
    flex-direction: column;
    background-color: rgb(236, 236, 236);
  }
`;

const SliderImage = styled.img`
  width: 70%;
  object-fit: fill;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const SliderContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  h1 {
    text-align: center;
  }
`;

const Slider = ({ imageSrc, title, subtitle, flipped }) => {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  const renderContent = () => {
    if (!flipped) {
      return (
        <>
          <SliderImage src={imageSrc} />
          <SliderContent>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </SliderContent>
        </>
      );
    } else {
      return (
        <>
          <SliderContent>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </SliderContent>
          <SliderImage src={imageSrc} />
        </>
      );
    }
  };

  return (
    <>
      {inView ? (
        <SliderWithZoom ref={ref}>{renderContent()}</SliderWithZoom>
      ) : (
        <SliderDefault ref={ref}>{renderContent()}</SliderDefault>
      )}
    </>
  );
};

export default Slider;
