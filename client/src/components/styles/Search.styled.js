import React, { useState } from "react";
import styled from "styled-components";
import Content from "../styles/Content.styled";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { langImg } from "../../static/images/langImg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStudiesMapApi } from "../../api/study";
import {
  languageModal,
  locationModal,
  dateModal,
  reset,
} from "../../features/searchModals/searchModalSlice";

const { kakao } = window;

const StyledSearch = styled(Content)`
  grid-column: 3/ 13;
  border-radius: 50px;
  height: 80px;
  font-family: "Bold";
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

const SearchIcon = styled.span`
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
  position: relative;
  box-sizing: content-box;
  grid-column: 2/8;
  /* height: 100%; */
  /* display: flex; */
  /* align-items: center; */
  /* padding-top: 3%; */
  font-family: "Medium";
  padding: 5% 5% 3% 5%;
  min-height: 7vw;
  max-height: 12vw;
  overflow: scroll;
  > div {
    border-bottom: 1px solid beige;
    text-align: center;
    padding: 7%;
    border-radius: 30px;

    &:hover {
      color: ${(props) => props.theme.colors.purple};
      cursor: pointer;
    }
  }
  > input {
    height: 5vw;
    width: 90%;
    border-radius: 30px;
    background-color: lightgray;
    box-shadow: ${(props) => props.theme.contents.boxShadow};
    position: absolute;
    z-index: 30;
    opacity: 80%;
    text-align: center;

    &:focus {
      outline: none;
    }
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

  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 90%;
    height: 90%;
    margin: 5% auto;
    border: none;

    > img {
      display: block;
      width: 25%;
      height: 25%;
      margin: 4%;
    }
  }
`;

const Search = () => {
  //display : none으로 위에서 막아버림
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [locationList, setLocationList] = useState([]);

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
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      // 페이지 번호를 표출합니다
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
  const [data, setData] = useState({
    location: "",
    date: "",
    language: "",
  });

  const langIcons = () => {
    let keyArr = Object.keys(langImg);
    return keyArr.map((key, idx) => (
      <img
        src={langImg[key]}
        key={idx}
        onClick={() => {
          setData({ ...data, language: key });
          dispatch(reset());
        }}
      />
    ));
  };

  //console.log(searchPlaces("송파구"));

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
    return filteredList.map((list, idx) => (
      <div
        key={idx}
        onClick={() => {
          setData({ ...data, location: list });
          dispatch(dateModal());
        }}
      >
        {list}
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
          <span className="title">location</span>
          <span className="desc">{data.location ? data.location : "위치를 검색해주세요"}</span>
        </Location>
        <Date id="date" onClick={() => dispatch(dateModal())}>
          <span className="title">Start Date</span>
          <span className="desc"> 시작일을 선택해주세요</span>
        </Date>
        <Language id="language" onClick={() => dispatch(languageModal())}>
          <span className="title">Language</span>
          <span className="desc">{data.language ? data.language : "언어를 선택해주세요"} </span>
        </Language>
        <SearchIcon
          id="search"
          onClick={() => {
            getStudiesMapApi(data).then((res) => console.log(res));
            //res.data.studies를 markerdata로,  map api : 해당 동으로 center 지정,
            navigate("/map");
            setData({ location: "", date: "", language: "" });
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
          {/* ['address_name', 'category_group_code', 'category_group_name', 'category_name', 'distance', 'id', 'phone', 'place_name', 'place_url', 'road_address_name', 'x', 'y'] */}

          {/* <div>
            {options.map((x,i) => x.indexof(handleComboBox) > -1 ? <div onClick={() => onClick(i)}>{x}</div>:null)}
          </div> */}
        </LocationModal>
      ) : null}
      {date ? <DateModal /> : null}
      {language ? (
        <LanguageModal>
          <div>{langIcons()}</div>
        </LanguageModal>
      ) : null}
    </>
  );
};

export default Search;
