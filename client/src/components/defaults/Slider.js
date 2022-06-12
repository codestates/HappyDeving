/* eslint-disable react/prop-types */
import React from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const SliderDiv = styled.div`
  font-family: "Binggrae";
  grid-column: 3 / 13;
  display: flex;
  align-items: center;
  opacity: 0;
  transform: scale(85%);
  transition: 2s;
  &.slider-zoom {
    opacity: 1;
    transform: scale(100%);
    transition: 2s;
  }
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
    overflow: hidden;
    white-space: nowrap;
    font-size: 3rem;
    margin-bottom: 15px;
  }
  p {
    color: rgb(70, 69, 71);
    font-size: 2rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    h1 {
      white-space: nowrap;
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 767px) {
    h1 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1.2rem;
    }
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
      <SliderDiv className={inView ? "slider-zoom" : null} ref={ref}>
        {renderContent()}
      </SliderDiv>
    </>
  );
};

export default Slider;
