import React, { useState } from "react";
import styled from "styled-components";
import Content from "../styles/Content.styled";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { langImg } from "../../static/images/langImg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStudiesMapApi } from "../../api/study";
import LanguageModal from "./Modals/LanguageModal";
import LocationModal from "./Modals/LocationModal";
import DateModal from "./Modals/DateModal";
import {
  languageModal,
  locationModal,
  dateModal,
  reset,
} from "../../features/Search/searchModalSlice";
import { setLocationData, setLanguageData, resetData } from "../../features/Search/searchDataSlice";
import CalenderDate from "../Calendar.js";

const { kakao } = window;

const StyledSearch = styled(Content)`
  grid-column: 3/ 13;
  border-radius: 50px;
  height: 80px;
  font-family: "Bold";
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  margin-bottom: 40px;
  //grid가 상속이 안됨 왜??
  div {
    box-shadow: none;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: rgba(94, 23, 235, 0.9);
      /* color: white; */
      color: white;
      box-shadow: ${(props) => props.theme.colors.lavender};
      cursor: pointer;
    }
    &:active {
      box-shadow: ${(props) => props.theme.contents.boxShadow};
    }

    .desc {
      font-family: "Bold";
      font-size: 2.3vw;
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

const SearchIcon = styled.span`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  line-height: 50px;
  text-align: center;
  margin: 15px 0px 15px 20px;
  background-color: ${(props) => props.theme.colors.purple};

  &:hover {
    background-color: ${(props) => props.theme.colors.purple};
    opacity: 0.7;
    cursor: pointer;
  }
  &:active {
    box-shadow: ${(props) => props.theme.contents.boxShadow};
  }
`;

const Search = () => {
  const [locationList, setLocationList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LangIcons = () => {
    let keyArr = Object.keys(langImg);
    return keyArr.map((key, idx) => (
      <img
        src={langImg[key]}
        key={idx}
        onClick={() => {
          dispatch(setLanguageData(key));
          dispatch(reset());
        }}
      />
    ));
  };

  var ps = new kakao.maps.services.Places();

  // 키워드 검색을 요청하는 함수입니다
  function searchPlaces(value) {
    var keyword = value;
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    return ps.keywordSearch(keyword, placesSearchCB);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
      setLocationList(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  }

  const { location, date, language } = useSelector((store) => store.search);
  const { locationData, dateData, languageData } = useSelector((store) => store.search);

  console.log(locationData);
  const { calenderDateValue } = useSelector((store) => store.calender);
  console.log(calenderDateValue);

  const handleInputValue = (e) => {
    if (e.key === "Enter") {
      searchPlaces(e.target.value);
    } // true
  };

  const locationListHandler = (locationList) => {
    const list = locationList.map(
      (location) =>
        location["address_name"].split(" ")[1] + " " + location["address_name"].split(" ")[2]
    );
    const filteredList = Array.from(new Set(list));
    return filteredList.map((location, idx) => (
      <div
        key={idx}
        onClick={() => {
          dispatch(setLocationData(location));
          dispatch(dateModal());
        }}
      >
        {console.log(location)}
        {location}
      </div>
    ));
  };

  console.log(locationListHandler(locationList));
  console.log(locationList);
  return (
    <>
      <StyledSearch>
        <Location
          id="location"
          onClick={() => {
            dispatch(locationModal());
          }}
        >
          <span className="desc">{locationData ? locationData : "위치"}</span>
        </Location>
        <Date
          id="date"
          onClick={() => {
            dispatch(dateModal());
            console.log(date);
          }}
        >
          <span className="desc">{dateData ? calenderDateValue : "시작일"}</span>
        </Date>
        <Language id="language" onClick={() => dispatch(languageModal())}>
          <span className="desc">{languageData ? languageData : "언어"} </span>
        </Language>
        <SearchIcon
          id="search"
          onClick={() => {
            getStudiesMapApi({ locationData, dateData, languageData }).then((res) =>
              console.log(res)
            );
            //res.data.studies를 markerdata로,  map api : 해당 동으로 center 지정,
            navigate("/map");
            dispatch(resetData());
            dispatch(reset());
          }}
        >
          <FontAwesomeIcon icon={faSearch} size="1x" color="white" />
        </SearchIcon>
      </StyledSearch>
      {location ? (
        <LocationModal>
          <input onKeyDown={(e) => handleInputValue(e)} placeholder="ex. 송파구 오륜동"></input>
          <div></div>
          {locationListHandler(locationList)}
        </LocationModal>
      ) : null}
      {date ? (
        <DateModal>
          <CalenderDate />
        </DateModal>
      ) : null}
      {language ? (
        <LanguageModal>
          <div>{LangIcons()}</div>
        </LanguageModal>
      ) : null}
    </>
  );
};

export { Search, DateModal, LocationModal, LanguageModal };
