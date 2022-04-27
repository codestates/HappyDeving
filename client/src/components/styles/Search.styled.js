import React from "react";
import styled from "styled-components";
import Content from "../styles/Content.styled";
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
import CalenderDate from "../Calendar";

// const moment = require("moment");
// const dispatch = useDispatch();
// return (
//   <StyledSection>
{
  /* 전역 변수에 저장 방식 정하기! 위에 방식이 더 정학히 비교할 수는 있지만? 약간 오류생김
      {moment(calenderDateValue).format("M월 D일")} => Wed Apr 13 2022 00:00:00 GMT+0900 (한국 표준시) 
    {calenderDateValue}  => 4월 13일*/
}
{
  /* <div>{moment(calenderDateValue).format("M월 D일")}</div> */
}
{
  /* <div onClick={() => dispatch(openCalenderModal(!calenderModal))}>search</div> */
}
{
  /* </StyledSection>
  );
} */
}

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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /* align-items: center; */
  margin: 5% auto;
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
  const { calenderDateValue } = useSelector((store) => store.calender);
  console.log(calenderDateValue);

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
          {/* <span className="desc"> Start Date</span> */}
          <span className="desc">{calenderDateValue}</span>
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
      {date ? (
        <DateModal>
          <CalenderDate />
        </DateModal>
      ) : null}
      {language ? <LanguageModal>{langIcons()}</LanguageModal> : null}
    </>
  );
};

export default Search;
