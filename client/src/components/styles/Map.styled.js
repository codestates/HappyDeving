import React, { useRef, useEffect } from "react";
import Content from "./Content.styled";
import styled from "styled-components";
import { markerdata as dummydata } from "./Marker.data";
import "./Map.styled.css";
import { langImg } from "../../static/images/langImg";

const { kakao } = window;

const studies = dummydata.data.studies;
const markerdata = studies.map((el) => {
  return {
    id: el.id,
    title: el.content.title,
    latlng: { lat: el.location.lat, lng: el.location.lng },
    img: langImg[el.language[0].name],
    info: el.createdAt.split("T")[0],
  };
});
// const markerdata1 = [
//   {
//     title: "카카오",
//     latlng: { lat: 33.450705, lng: 126.570677 },
//     img: "https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1",
//     info: "info",
//   },
//   {
//     title: "생태연못",
//     latlng: { lat: 33.450936, lng: 126.569477 },
//     img: "https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1",
//     info: "info",
//   },
//   {
//     title: "텃밭",
//     latlng: { lat: 33.450879, lng: 126.56994 },
//     img: "https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1",
//     info: "info",
//   },
//   {
//     title: "근린공원",
//     latlng: { lat: 33.451393, lng: 126.570738 },
//     img: "https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1",
//     info: "info",
//   },
// ];

const View = styled(Content)`
  grid-column: 2/ 14;
  height: 400px;
`;

const Map = () => {
  const container = useRef(null);

  //content는 string으로 적어야 하고 js로 적어야 한다
  //click 함수를 써야 한다

  var // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(65, 65), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커가 지도 위에 표시되도록 설정합니다

  const mapscript = () => {
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container.current, options);

    markerdata.forEach((el) => {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.latlng.lat, el.latlng.lng),
        title: el.title,
        image: new kakao.maps.MarkerImage(el.img, imageSize, imageOption),
      });

      marker.setClickable(true);
      marker.getClickable(true);

      // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다

      //   <i class="fa-regular fa-heart fa-2xl">
      //   </i>

      function heartHandler() {
        // console.log(icon.className);
        if (icon.className === "fa-solid fa-heart fa-2x") {
          icon.className = "fa-regular fa-heart fa-2x";
        } else {
          icon.className = "fa-solid fa-heart fa-2x";
        }
      }

      function contentHandler() {
        //상세스터디 페이지로 이동
        document.location.href = `/study/${el.id}`;
      }

      const content = document.createElement("div");
      content.id = "content";

      const title = document.createElement("div");
      title.id = "title";
      title.textContent = el.title;

      const img = document.createElement("img");
      img.id = "img";
      img.src = el.img;
      img.onclick = contentHandler;

      const desc = document.createElement("div");
      desc.id = "desc";

      const info = document.createElement("span");
      info.id = "info";
      info.textContent = el.info;

      const icon = document.createElement("i");
      icon.id = "icon";
      icon.className = `fa-regular fa-heart fa-2x`;
      icon.onclick = heartHandler;
      //바로 안 바뀌고 창을 끄고 난 다음에 바뀜
      //즉 overlay를 새로고침해야
      //state는 원래 전체 창을 렌더링하는 건데 왜 이럴까?

      desc.append(info, icon);
      content.append(title, img, desc);

      var overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: marker.getPosition(),
        clickable: true,
      });

      //map:map을 안에 설정해주면 default로 marker가 올라간 채 나온다

      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(map);
      });

      kakao.maps.event.addListener(overlay, "click", function () {
        console.log("overlay");
      });

      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        console.log(mouseEvent);
        overlay.setMap(null);
      });
    });
  };

  useEffect(() => {
    mapscript();
  }, []);

  return (
    <>
      {/* <i className={`${click} fa-heart fa-2x`} onClick={clickHandler}></i> */}
      <View id="map" ref={container} />
    </>
  );
};

export default Map;
