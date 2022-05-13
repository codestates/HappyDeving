import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { dateModal } from "../../../features/Search/searchModalSlice";
import { setLocationData } from "../../../features/Search/searchDataSlice";

const Location = styled.div`
  position: absolute;
  width: 100%;
  top: 20px;
  font-family: "Medium";
  border-radius: none;

  @media screen and (max-width: 768px) {
    height: 100vh;
  }

  .locationList {
    position: relative;
    top: 50px;
    left: 50%;
    transform: translateX(-17%);
    text-align: center;

    .locationDiv {
      margin: 20px 0px;
      width: 200px;
      display: flex;
      align-items: center;

      .marker {
        margin: 3px 20px 0px 0px;
      }
      &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.colors.purple};
      }
    }
  }

  > input {
    height: 40px;
    width: 90%;
    left: 50%;
    transform: translateX(-55%);
    margin-left: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: absolute;
    text-align: center;
    caret-color: ${(props) => props.theme.colors.purple};

    &:focus {
      outline: none;
    }
  }
`;

const HeaderLocationModal = () => {
  const { kakao } = window;
  const [locationList, setLocationList] = useState([]);

  const dispatch = useDispatch();

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

  // const { location } = useSelector((store) => store.search);
  // const { locationData } = useSelector((store) => store.searchData);

  // const guType = locationData.split(" ")[0];
  // const dongType = locationData.split(" ")[1];

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
        className="locationDiv"
        onClick={() => {
          dispatch(setLocationData(location));
          dispatch(dateModal());
        }}
      >
        <span className="marker">
          <FaMapMarkerAlt />
        </span>
        <span>{location}</span>
      </div>
    ));
  };

  return (
    <Location>
      <input
        onKeyDown={(e) => handleInputValue(e)}
        placeholder="ex. 송파구 오륜동"
      ></input>
      <div className="locationList">{locationListHandler(locationList)}</div>
    </Location>
  );
};

export default HeaderLocationModal;
