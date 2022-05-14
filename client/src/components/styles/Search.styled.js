import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import { langImg } from "../../static/images/langImg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStudiesMapApi } from "../../api/study";
import { setStudiesData } from "../../features/studies/studiesSlice";

import HeaderLanguageModal from "./Modals/LanguageModal";
import HeaderLocationModal from "./Modals/LocationModal";
import HeaderDateModal from "./Modals/DateModal";
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

export const StyledSearch = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: "Medium";
  border-radius: 30px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  height: 50px;
`;

const Filter = styled.div`
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;

  span {
    font-family: "Medium";
    color: gray;

    &:hover {
      color: rgb(94, 23, 235);
      cursor: pointer;
    }

    @media screen and (max-width: 1024px) {
      font-size: 20px;
    }

    font-size: 18px;

    @media screen and (max-width: 768px) {
      font-size: 16px;
      display: none;
    }
  }
`;

const Location = styled(Filter)`
  grid-column: 1/4;
`;

const Date = styled(Filter)`
  grid-column: 4/7;
`;

const Language = styled(Filter)`
  grid-column: 7/10;
`;

const Modals = styled.div`
  height: auto;
  position: absolute;
  z-index: 10;
  background-color: white;
  width: 600px;
  height: 300px;
  overflow: scroll;
  display: none;

  @media screen and (max-width: 768px) {
    display: none;
  }

  .dateModal {
    grid-column: 3/7;
  }
  .languageModal {
    grid-column: 6/12;
  }
`;

const LocationsModal = styled(Modals)`
  grid-column: 2/5;
`;

const DatesModal = styled(Modals)`
  grid-column: 3/7;
`;

const LanguagesModal = styled(Modals)`
  grid-column: 6/12;
`;

const SearchIcon = styled.div`
  position: relative;

  div {
    background-color: ${(props) => props.theme.colors.purple};
    margin-top: 10px;
    margin-left: 10px;
    min-height: 30px;
    max-width: 30px;
    border-radius: 50%;
    position: relative;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 15px;
      width: 15px;
      line-height: 15px;
      color: white;
    }

    &:hover {
      background-color: ${(props) => props.theme.colors.lavender};
      opacity: 0.7;
      cursor: pointer;
      position: relative;
      top: 2px;
    }
  }
`;

const { kakao } = window;

const Search = ({ setHeader }) => {
  const [locationList, setLocationList] = useState([]);
  // const [icon, setIcon] = useState("1.5em");
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
          onClick={() => {
            dispatch(locationModal());
          }}
        >
          <span className="desc">{locationData ? locationData : "위치"}</span>
        </Location>
        <Date
          onClick={() => {
            dispatch(dateModal());
            console.log(date);
          }}
        >
          <span className="desc">
            {dateData ? calenderDateValue : "시작일"}
          </span>
        </Date>
        <Language onClick={() => dispatch(languageModal())}>
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
            setHeader(false);
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
          <HeaderLocationModal>
            <input
              onKeyDown={(e) => handleInputValue(e)}
              placeholder="ex. 송파구 오륜동"
            ></input>
            <div></div>
            {locationListHandler(locationList)}
          </HeaderLocationModal>
        ) : null}
        {date ? (
          <div className="dateModal">
            <CalenderDate />
          </div>
        ) : null}
        {language ? (
          <div className="languageModal">
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
          </div>
        ) : null}
      </Modals>
    </>
  );
};

export { Search };
