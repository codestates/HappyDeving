import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Content from "./Content.styled";
import Comments from "../Comments";
import "./Map.styled.css";
import {
  BsFillDoorOpenFill,
  BsFillDoorClosedFill,
  BsFileEarmarkCodeFill,
  BsFillCalendarDateFill,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { langImg } from "../../static/images/langImg";
import { studyApi, deleteStudyApi } from "../../api/study";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const StyleStudyDesc = styled.div`
  margin-top: 120px;
  grid-column: 2/14;
  padding: 3% 5% 3% 5%;

  .mapview {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    grid-column: 1/15;
  }

  @media screen and (min-width: 1024px) {
    grid-column: 3/13;
  }
`;

const TitleBar = styled.div`
  grid-row: 1/2;
  height: 50px;
  display: flex;
  border-radius: ${(props) => props.theme.borderRadius};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;

  .title {
    flex: 8;
    font-family: "Bold";
    font-size: 26px;
    height: 40px;
    line-height: 40px;
  }

  .alter {
    flex: 2;
    font-family: "Medium";
    display: flex;
    color: gray;
    justify-content: space-around;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    float: right;
    &:hover {
      cursor: pointer;
    }
  }
`;

// const ContentDiv = styled.div`
//   grid-column: 1/14;
//   width: 100%;
// `

// const CommentDiv = styled(Content)`
//   /* background: pink; */
//   grid-column: 1/14;
//   display: flex;
//   height: 100px;
//   width: 100%;
// `

const CommentsDiv = styled.div`
  /* background: pink; */
`;

//(언어 input, modal(정사각형) :5-9,
// 시작일 input, modal(정사각형) : 10-14 )
// - 내용 input은 scroll

const Wrap = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  width: 100%;
  margin-bottom: 30px;

  .profile {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const Icon = styled.div`
  align-items: center;
  margin-right: 20px;
`;

const Text = styled.div`
  width: 120px;
  flex: 1;
`;

const Host = styled.div`
  float: right;
  height: 30px;
`;

const Button = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;
  background-color: ${(props) => props.theme.colors.purple};
  color: white;
  border-radius: 10px;
  float: right;
  text-align: center;
  font-family: "Medium";
  box-shadow: 5px 1px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => props.theme.colors.lavender};
  }
`;

const { kakao } = window;

const MapView = styled(Content)`
  grid-column: 2/14;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 0px;
`;

//바뀐 location으로 marker 만들기용으오로 데이터 가공

const StudyDesc = () => {
  const container = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [location, setLocation] = useState({
    place_name: "광화문",
    latitude: 37.570975,
    logitude: 126.977759,
  });
  const [data, setData] = useState();

  const mapscript = () => {
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(location.latitude, location.longitude), //지도의 중심좌표
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container.current, options);

    var // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(65, 65), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) };
    // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    var img = langImg.javascript;

    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(location.latitude, location.longitude),
      image: new kakao.maps.MarkerImage(img, imageSize, imageOption),
    });
    //marker 만들기

    //marker 배열 내용을 하나씩 넣어서 만드는 과정

    marker.setClickable(true);
    marker.getClickable(true);
    // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다

    //el.id 스터디 아이디가 담겨온다.
  };

  useEffect(() => {
    if (data) {
      mapscript();
    }
  }, [data]);

  useEffect(() => {
    const href = document.location.href.split("/");
    const id = href[href.length - 1];
    studyApi(id).then((res) => {
      setData(res.data.data.study);
      setLocation(res.data.data.study.location);
    });
  }, []);

  return (
    <>
      {data ? (
        <StyleStudyDesc>
          {console.log(data.user_id)}
          {console.log(user.id)}

          <TitleBar>
            <div className="title">{data.title}</div>
            <div className="alter">
              {data.user_id === user?.id ? (
                <>
                  <div
                    className="update"
                    onClick={() => navigate(`/study/edit/${data.id}`)}
                  >
                    수정
                  </div>
                  <div
                    className="delete"
                    onClick={() => {
                      alert("삭제되었습니다");
                      deleteStudyApi(data.id);
                      navigate("/");
                    }}
                  >
                    삭제
                  </div>
                </>
              ) : null}
            </div>
          </TitleBar>

          <Host>
            <Wrap>
              <img className="profile" src={user.image} />
              <Text>{user.username}</Text>
            </Wrap>
          </Host>

          <Wrap>
            <Icon>
              {data.closed ? <BsFillDoorClosedFill /> : <BsFillDoorOpenFill />}
            </Icon>
            <Text>{data.closed ? "모집마감" : "모집중"}</Text>
          </Wrap>

          <Wrap>
            <Icon>
              <BsFileEarmarkCodeFill />
            </Icon>
            <Text>
              {data.language.map((el, idx) => (
                <span key={idx} className="langSpan">
                  {el.name + ","}
                </span>
              ))}
            </Text>
          </Wrap>

          <Wrap>
            <Icon>
              <BsFillCalendarDateFill />
            </Icon>
            <Text>{data.startDate}</Text>
          </Wrap>

          <Wrap>
            <Icon>
              <FaMapMarkerAlt />
            </Icon>
            <Text>{data.location.name}</Text>
          </Wrap>

          <div className="mapview">
            <MapView id="map" ref={container} />
          </div>

          <Wrap>
            <Icon>
              <BsFillFileEarmarkTextFill />
            </Icon>
            <Text>{data.content}</Text>
          </Wrap>

          <Button src={data.kakaoLink}>참여하기</Button>

          <CommentsDiv>
            <button onClick={() => setShowConfirmModal(!showConfirmModal)}>
              댓글보기
              <FontAwesomeIcon icon={faAngleDown} size="1x" color="black" />
            </button>
            {showConfirmModal ? <Comments studyId={id} /> : null}
          </CommentsDiv>
        </StyleStudyDesc>
      ) : (
        "data가 없습니다"
      )}
    </>
  );
};

export default StudyDesc;
