import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
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
import { studyApi } from "../../api/study";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import ShareSocialButton from "../styles/ShareSocial.styled";
import { faGithubAlt, faBlogger } from "@fortawesome/free-brands-svg-icons";
import { openModal } from "../../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const StyleStudyDesc = styled.div`
  margin-top: 200px;
  grid-column: 4/12;
  padding: 3% 5% 3% 5%;

  .mapview {
    border-bottom: 2px solid #dfc1ff;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1024px) {
    grid-column: 3/13;
  }
  @media screen and (max-width: 768px) {
    grid-column: 2/14;
  }
`;

const TitleBar = styled.div`
  grid-row: 1/2;
  height: 50px;
  display: flex;
  border-radius: ${(props) => props.theme.borderRadius};
  border-bottom: 2px solid #dfc1ff;
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

const ProfileWrap = styled.div`
  display: flex;
  padding: 10px;
  min-height: 100px;
  width: 100%;

  h1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
const ProfileImage = styled.div`
  border-radius: 100px;
  width: 100px;
  height: 80px;
  border: 3px solid #c593fe;
  margin-right: 10px;

  img {
    border-radius: 100px;
    width: 100%;
    height: 100%;
  }
`;
const ContentWrap = styled.div`
  display: flex;
  min-height: 0px;
  height: auto;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Icon = styled.div`
  align-items: center;
  margin-right: 20px;
`;

const Text = styled.div`
  width: 120px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;
const Content = styled.div`
  width: 100%;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Bio = styled.div`
  background-color: rgba(233, 193, 255, 30%);
  margin: 5px 0px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;

  p {
    font-size: 14px;
  }
`;
const Host = styled.div`
  float: right;
  height: 30px;
`;

const Button = styled.button`
  padding: 8px 15px;
  background: #5e17eb;
  border-radius: 10px;
  border: 2px solid #dfc1ff;
  color: white;
  transition: 5ms;

  &:hover {
    background-color: #c593fe;
    border: 2px solid #6733e5;
  }
  &:active {
    position: relative;
    top: -2px;
  }
`;

const LinkButtons = styled.div`
  display: flex;
  a {
    color: #6733e5;
    font-size: 16px;
    margin-right: 10px;
  }
`;
const { kakao } = window;

const MapView = styled.div`
  grid-column: 2/14;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 0px;
`;
const ButtonWrap = styled.div`
  display: flex;
  margin: 20px 0px;
  justify-content: flex-end;
`;
const ShareIcon = styled.div`
  font-size: 20px;
  cursor: pointer;
  position: relative;
`;
//바뀐 location으로 marker 만들기용으오로 데이터 가공

const StudyDesc = () => {
  const container = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const user = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.user);
  const [share, setShare] = useState(false);
  const handleShareButton = () => {
    setShare(!share);
  };
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
    // const href = document.location.href.split("/");
    // const id = href[href.length - 1];
    studyApi(id).then((res) => {
      console.log("id 들어오니?", res);
      setData(res.data.data.study);
      setLocation(res.data.data.study.location);
    });
  }, []);

  const handleStudyDeletion = (e) => {
    e.preventDefault();
    dispatch(
      openModal({
        name: "DeleteStudy",
        childrenProps: { study_id: id },
      })
    );
  };

  return (
    <>
      {data ? (
        <StyleStudyDesc>
          {/* {console.log(data.user_id)}
          {console.log(user?.id)} */}
          <TitleBar>
            <div className="title">{data.title}</div>
            <div className="alter">
              {data.user_id === user?.id ? (
                <>
                  {" "}
                  <ShareIcon onClick={handleShareButton}>
                    {share ? <ShareSocialButton /> : null}
                    <FontAwesomeIcon icon={faShareNodes} />
                  </ShareIcon>
                  <div className="update" onClick={() => navigate(`/study/edit/${data.id}`)}>
                    수정
                  </div>
                  <div
                    className="delete"
                    onClick={handleStudyDeletion}
                    // onClick={() => {
                    //   alert("삭제되었습니다");
                    //   deleteStudyApi(data.id);
                    //   navigate("/");
                    // }}
                  >
                    삭제
                  </div>
                </>
              ) : null}
            </div>
          </TitleBar>
          <Host>
            <Wrap>
              <img className="profile" src={user?.image} />
              <Text>{user?.username}</Text>
            </Wrap>
          </Host>
          <Wrap>
            <Icon>{data.closed ? <BsFillDoorClosedFill /> : <BsFillDoorOpenFill />}</Icon>
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
          <ContentWrap>
            <Icon>
              <BsFillFileEarmarkTextFill />
            </Icon>
            <Content>{data.content}</Content>
          </ContentWrap>{" "}
          <ProfileWrap>
            <ProfileImage>
              <img src={user?.image} />
            </ProfileImage>

            <Profile>
              <h1>스터디 장, {user?.username}을 소개합니다!</h1>
              <Bio>{user?.bio}</Bio>
              <LinkButtons>
                <a href={user?.github} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithubAlt} />
                  깃허브
                </a>
                <a href={user?.blog} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faBlogger} />
                  블로그
                </a>
              </LinkButtons>
            </Profile>
          </ProfileWrap>
          <ButtonWrap>
            <Button src={data.kakaoLink}>스터디 참여하기</Button>
          </ButtonWrap>
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
