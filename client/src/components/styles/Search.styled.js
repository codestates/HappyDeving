import React, { useState } from "react";
import styled from "styled-components";
import Content from "./Content.styled";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import { langImg } from "../../static/images/langImg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStudiesMapApi } from "../../api/study";
import LanguageModal from "./Modals/LanguageModal";
import LocationModal from "./Modals/LocationModal";
import DateModal from "./Modals/DateModal";
import { setStudiesData } from "../../features/studies/studiesSlice";
import {
  languageModal,
  locationModal,
  dateModal,
  reset,
} from "../../features/Search/searchModalSlice";
import {
  setLocationData,
  setLanguageData,
  resetData,
} from "../../features/Search/searchDataSlice";
import CalenderDate from "../Calendar.js";

// size: {
//   mobile: "520px",
//   tablet: "768px",
//   desktop: "1024px",
// },

export const StyledSearch = styled.div`
  background-color: white;
  font-family: "Bold";
  border-radius: 30px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  margin-bottom: 10px;

  div {
    box-shadow: none;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    &:hover {
      /* color: white; */
      color: rgb(94, 23, 235);
      box-shadow: ${(props) => props.theme.contents.boxShadow};
      cursor: pointer;
    }
    &:active {
      box-shadow: ${(props) => props.theme.contents.boxShadow};
    }

    .desc {
      @media screen and (min-width: 1024px) {
        font-size: 22px;
      }

      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
      font-family: "Bold";
      font-size: 16px;
    }
  }
`;

const Modals = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  height: auto;

  div {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  .locationModal {
    @media screen and (max-width: 768px) {
      display: none;
    }

    grid-column: 1/5;
  }
  .dateModal {
    @media screen and (max-width: 768px) {
      display: none;
    }
    grid-column: 4/8;
  }
  .languageModal {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

const Location = styled.div`
  grid-column: 1/4;
  border-radius: 30px;
`;

const Date = styled.div`
  grid-column: 4/7;
  border-radius: 30px;
`;

const Language = styled.div`
  grid-column: 7/10;
  border-radius: 30px;
`;

const SearchIcon = styled.div`
  position: relative;
  margin: 10px;

  .icon {
    color: white;
    position: absolute;
    /* margin: 5px; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 20px;
    width: 20px;
    line-height: 20px;
  }
  height: 40px;
  width: 40px;
  border-radius: 50%;

  margin: 10px 10px 10px 20px;
  background-color: ${(props) => props.theme.colors.purple};
  &:hover {
    background-color: ${(props) => props.theme.colors.purple};
    opacity: 0.7;
    cursor: pointer;
  }
  &:active {
    box-shadow: ${(props) => props.theme.contents.boxShadow};
    position: relative;
    top: 2px;
  }
`;

const { kakao } = window;

const Search = () => {
  const [locationList, setLocationList] = useState([]);
  const [icon, setIcon] = useState("1.5em");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = window.location.href;
  console.log(url);

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

  const handleInputValue = (e) => {
    if (e.key === "Enter") {
      searchPlaces(e.target.value);
    } // true
  };

  const { location, date, language } = useSelector((store) => store.search);
  const { locationData, dateData, languageData } = useSelector(
    (store) => store.searchData
  );
  const { calenderDateValue } = useSelector((store) => store.calender);

  const guType = locationData.split(" ")[0];
  const dongType = locationData.split(" ")[1];

  const locationListHandler = (locationList) => {
    const list = locationList.map(
      (location) =>
        location["address_name"].split(" ")[1] +
        " " +
        location["address_name"].split(" ")[2]
    );
    const filteredList = Array.from(new Set(list));
    return filteredList.map((location, idx) => (
      <div
        key={idx}
        onClick={() => {
          console.log(location);
          dispatch(setLocationData(location));
          dispatch(dateModal());
        }}
      >
        {location}
      </div>
    ));
  };

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
          <span className="desc">
            {dateData ? calenderDateValue : "시작일"}
          </span>
        </Date>
        <Language id="language" onClick={() => dispatch(languageModal())}>
          <span className="desc">{languageData ? languageData : "언어"} </span>
        </Language>
        <SearchIcon
          id="search"
          onClick={() => {
            getStudiesMapApi({ guType, dongType, languageData, dateData }).then(
              (res) => {
                console.log(res.data);
                dispatch(setStudiesData(res.data));
              }
            );
            //res.data.studies를 markerdata로,  map api : 해당 동으로 center 지정,
            navigate("/map");
            dispatch(resetData());
            dispatch(reset());
          }}
        >
          <IconContext.Provider value={{ className: "icon" }}>
            <div>
              <FaSearch />
            </div>
          </IconContext.Provider>
        </SearchIcon>
      </StyledSearch>
      <Modals>
        {location ? (
          <LocationModal className="locationModal">
            <input
              onKeyDown={(e) => handleInputValue(e)}
              placeholder="ex. 송파구 오륜동"
            ></input>
            <div></div>
            {locationListHandler(locationList)}
          </LocationModal>
        ) : null}
        {date ? (
          <DateModal className="dateModal">
            <CalenderDate />
          </DateModal>
        ) : null}
        {language ? (
          <LanguageModal className="languageModal">
            {Object.keys(langImg).map((el, idx) => (
              <div
                key={idx}
                className="elements"
                onClick={() => {
                  console.log(el);
                  dispatch(setLanguageData(el));
                  dispatch(reset());
                }}
              >
                {el}
              </div>
            ))}
          </LanguageModal>
        ) : null}
      </Modals>
    </>
  );
};

export { Search, DateModal, LocationModal, LanguageModal };
