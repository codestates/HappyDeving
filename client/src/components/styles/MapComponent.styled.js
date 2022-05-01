import React, { useRef, useEffect } from "react";
import Content from "./Content.styled";
import styled from "styled-components";
import { useSelector } from "react-redux";
// import { markerdata as dummydata } from "../../data/Marker.data";
import "./Map.styled.css";
import { langImg } from "../../static/images/langImg";

const Map = () => {
  const { kakao } = window;

  const MapView = styled(Content)`
    grid-column: 2/14;
    height: 200px;
    position: relative;
    z-index: 0;
  `;
  const container = useRef(null);
  const [location, setLocation] = useState("");

  const locationListHandler = (locationList) => {
    const list = locationList.map((location) => location["place_name"]);
    const filteredList = Array.from(new Set(list));
    return filteredList.map((location, idx) => (
      <div
        key={idx}
        onClick={() => {
          console.log(location);
          setLocation(location);
        }}
      >
        {location}
      </div>
    ));
  };

  //검색한 조건에 맞는 스터디들의 목록

  const markerdata = (location) => {
    return {
      lat: Number(location.location.latitude),
      lng: Number(location.location.longitude),
      img: langImg[location.language[0].name],
    };
  };

  const mapscript = (location) => {
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center:
        studies.length === 0
          ? new kakao.maps.LatLng(37.570975, 126.977759)
          : new kakao.maps.LatLng(markerdata.lat, markerdata.lng), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container.current, options);

    var // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(65, 65), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const setMarker = (markerdata) => {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(markerdata.lat, markerdata.lng),
        title: markerdata.title,
        image: new kakao.maps.MarkerImage(markerdata.img, imageSize, imageOption),
      });

      //marker 배열 내용을 하나씩 넣어서 만드는 과정

      marker.setClickable(true);
      marker.getClickable(true);
      // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다

      //el.id 스터디 아이디가 담겨온다.
    };

    setMarker(markerdata);
  };

  useEffect(() => {
    mapscript();
  });

  return (
    <>
      <MapView id="map" ref={container} />
    </>
  );
};

export default Map;
