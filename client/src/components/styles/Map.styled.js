import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import "./Map.styled.css";
import { langImg } from "../../static/images/langImg";
import { getLikedStudies } from "../../features/studies/allStudiesSlice";
import { unLikeStudyApi, likeStudyApi } from "../../api/study";
import LoadingIndicator from "../LoadingIndicator";
import { useNavigate } from "react-router-dom";

const Title = styled.div`
  margin-top: 50px;
  grid-column: 3/13;
  font-size: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const MapView = styled.div`
  grid-column: 3/13;
  margin-top: 100px;
  height: 500px;

  @media screen and (max-width: 768px) {
    grid-column: 2/14;
    margin-top: 40px;
    height: 500px;
  }
  z-index: -10;
  border-radius: 10px;
`;

const Map = () => {
  const { kakao } = window;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const container = useRef(null);

  //검색한 조건에 맞는 스터디들의 목록
  const { studies } = useSelector((store) => store.studies);
  const { user } = useSelector((state) => state.user);

  console.log(studies);

  //마커 생성용 데이터 가공
  const markerdata =
    studies.length !== 0
      ? studies.map((el) => {
          var langname =
            el.language[0]?.name === "c++" ? "c" : el.language[0]?.name;

          console.log("langname", langname);
          return {
            id: el.id,
            title: el.title,
            lat: Number(el.location.latitude),
            lng: Number(el.location.longitude),
            img: langImg[langname],
            //이름
            info: el.startDate,
          };
        })
      : [
          {
            id: 0,
            title: "결과가 없습니다",
            lat: 37.570975,
            lng: 126.977759,
            img: "https://i.ibb.co/nr4FYns/happydevil.png",
            info: "결과없음",
          },
        ];

  const { likedStudies, isLoading } = useSelector((store) => store.allStudies);

  const mapscript = () => {
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center:
        studies.length === 0
          ? new kakao.maps.LatLng(37.570975, 126.977759)
          : new kakao.maps.LatLng(markerdata[0].lat, markerdata[0].lng), //지도의 중심좌표.
      level: 5, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container.current, options);

    var // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(65, 65), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    markerdata.forEach((el) => {
      console.log("el.img", el.img);

      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
        image: new kakao.maps.MarkerImage(el.img, imageSize, imageOption),
      });
      //marker 배열 내용을 하나씩 넣어서 만드는 과정

      marker.setClickable(true);
      marker.getClickable(true);
      // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다

      //el.id 스터디 아이디가 담겨온다.
      function contentHandler() {
        //모달 창 클릭 시 상세스터디 페이지로 이동
        navigate(`/study/${el.id}`);
      }

      //모달창 내용 구현 : 바닐라JS로 해야 함
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

      function heartHandler() {
        if (icon.className === "fa-solid fa-heart fa-1x") {
          icon.className = "fa-regular fa-heart fa-1x";

          // dispatch(
          // unLikeStudy({ id: user.id, studyData: { study_id: el.id } })
          unLikeStudyApi(user.id, { study_id: el.id });
          // );
        } else {
          icon.className = "fa-solid fa-heart fa-1x";

          likeStudyApi(user.id, { study_id: el.id }).then((res) =>
            console.log(res)
          );
        }
      }

      desc.append(info, icon);
      content.append(title, img, desc);

      //overlay로 maps에 뿌려줌
      var overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: marker.getPosition(),
        clickable: true,
      });

      const firstHeartHandler = () => {
        let heartStudy = likedStudies.filter((study) => study.id === el.id);
        if (heartStudy.length > 0) {
          icon.className = "fa-solid fa-heart fa-1x";
        } else {
          icon.className = "fa-regular fa-heart fa-1x";
        }
      };

      //마커를 클릭하면 지도에 모달창 생성
      kakao.maps.event.addListener(marker, "click", function () {
        firstHeartHandler();
        overlay.setMap(map);
      });

      //마커 외의 map을 클릭하면 모달창이 사라진다
      kakao.maps.event.addListener(map, "click", function () {
        overlay.setMap(null);
      });
    });
  };

  useEffect(() => {
    mapscript();
  }, [studies]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Title>검색결과</Title>
      <MapView id="map" ref={container} />
    </>
  );
};

export default Map;
