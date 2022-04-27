import styled from "styled-components";
import Content from "../styles/Content.styled";
import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { langImg } from "../../static/images/langImg";
import { useDispatch, useSelector } from "react-redux";
import {
  languageModal,
  locationModal,
  dateModal,
  reset,
} from "../../features/searchModals/searchModalSlice";

const StyledSearch = styled(Content)`
  grid-column: 3/ 13;
  border-radius: 50px;
  height: 80px;
  font-family: "hanna";
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  margin-bottom: 0px;
  //grid가 상속이 안됨 왜??
  div {
    box-shadow: none;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #f0f0e5;
      opacity: 0.7;
    }
    &:active {
      box-shadow: ${(props) => props.theme.contents.boxShadow};
    }

    .title {
      font-family: "Bold";
      font-size: 1.5vw;
      margin-bottom: 0.5vw;
    }

    .desc {
      font-family: "Light";
      font-size: 1.5vw;
    }
  }
`;

const Location = styled(Content)`
  grid-column: 1/4;
  height: 80px;
`;

const Date = styled(Content)`
  grid-column: 4/7;
  height: 80px;
`;

const Language = styled(Content)`
  grid-column: 7/10;
  height: 80px;
`;

const Icon = styled.span`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  line-height: 50px;
  text-align: center;
  margin: 15px 0px 15px 20px;
  background-color: ${(props) => props.theme.colors.purple};

  &:hover {
    background-color: ${(props) => props.theme.colors.lavender};
    opacity: 0.7;
  }
  &:active {
    box-shadow: ${(props) => props.theme.contents.boxShadow};
  }
`;

const LocationModal = styled(Content)`
  grid-column: 2/8;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const DateModal = styled(Content)`
  grid-column: 5/11;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const LanguageModal = styled(Content)`
  grid-column: 8/14;
  position: relative;
  display: flex;
  justify-content: space-around;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  > img {
    position: absolute;
    display: block;
    width: 30%;
    margin: 5%;
  }
`;

const langIcons = () => {
  let keyArr = Object.keys(langImg);
  return keyArr.map((key, idx) => <img src={langImg[key]} key={idx} />);
};

const Search = () => {
  //display : none으로 위에서 막아버림
  const dispatch = useDispatch();
  const { location, date, language } = useSelector((store) => store.search);

  return (
    <>
      <StyledSearch>
        <Location
          id="location"
          onClick={() => {
            dispatch(locationModal());
          }}
        >
          <span className="title">location</span>
          <span className="desc"> location</span>
        </Location>
        <Date id="date" onClick={() => dispatch(dateModal())}>
          <span className="title">Start Date</span>
          <span className="desc"> Start Date</span>
        </Date>
        <Language id="language" onClick={() => dispatch(languageModal())}>
          <span className="title">Language</span>
          <span className="desc"> Language</span>
        </Language>
        <Icon id="search" onClick={() => dispatch(reset())}>
          <FontAwesomeIcon icon={faSearch} size="1x" color="white" />
        </Icon>
      </StyledSearch>
      {location ? <LocationModal /> : null}
      {date ? <DateModal /> : null}
      {language ? <LanguageModal>{langIcons()}</LanguageModal> : null}
    </>
  );
};

export default Search;
