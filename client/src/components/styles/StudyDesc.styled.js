import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Comments from "../Comments";
import { DummyImgs } from "../../static/images/DummyImg";
import "./Map.styled.css";
import {
  BsFillDoorOpenFill,
  BsFillDoorClosedFill,
  BsFileEarmarkCodeFill,
  BsFillCalendarDateFill,
  // BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { langImg } from "../../static/images/langImg";
import { studyApi } from "../../api/study";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unLike } from "@fortawesome/free-regular-svg-icons";
import ShareSocialButton from "../styles/ShareSocial.styled";
import { faGithubAlt, faBlogger } from "@fortawesome/free-brands-svg-icons";
import { openModal } from "../../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { unLikeStudy, likeStudy } from "../../features/studies/allStudiesSlice";

const StyleStudyDesc = styled.div`
  grid-column: 4/12;
  min-width: 500px;
  padding: 3% 5% 3% 5%;
  div {
    border-radius: 5px;
  }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-radius: ${(props) => props.theme.borderRadius};
  border-bottom: 2px solid #dfc1ff;
  padding: 0px 10px;
`;

const Title = styled.div`
  display: flex;
  font-family: "Binggrae";
  font-size: 26px;
  min-width: 200px;
  @media screen and (max-width: 1023px) {
    font-size: 20px;
  }
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const Alter = styled.div`
  display: flex;
  font-family: "Medium";
  color: gray;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
  div {
    display: flex;
    align-items: center;
    margin: 0px 5px;
    min-width: 10px;
  }
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const Delete = styled.div``;
const Update = styled.div``;
const ShareIcon = styled.div`
  position: relative;
`;

const CommentsDiv = styled.div`
  /* background: pink; */
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  width: 100%;
  margin-bottom: 30px;
`;
const Host = styled.div`
  display: flex;
  padding-right: 10px;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  padding: 10px 10px;
`;

const MiniProfileWrap = styled.div`
  display: flex;
  background-color: rgba(233, 193, 255, 20%);
  border-radius: 5px;
  padding: 3px 5px;
  p {
    font-size: 14px;
  }
  .profile {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

const ProfileWrap = styled.div`
  display: flex;
  padding: 20px 0px;
  min-height: 120px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  h1 {
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
  }
`;
const ProfileInWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100px;
`;
const ProfileImage = styled.div`
  border-radius: 5px;
  width: 80px;
  padding: 2px;
  height: 80px;
  border: 1px solid #c593fe;

  img {
    /* border-radius: 100px; */
    width: 100%;
    height: 100%;
  }
`;
const ContentWrap = styled.div`
  display: flex;
  background-color: rgba(233, 193, 255, 20%);
  min-height: 0px;

  min-height: 200px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Icon = styled.div`
  margin-right: 10px;
`;
const HeartIcon = styled.span`
  font-size: 30px;
  margin-left: 80%;
  .like {
    color: #d32f2f;
  }
  @media screen and (max-width: 1100px) {
    font-size: 20px;
  }
`;

const CreateAt = styled.p`
  color: darkray;
  font-size: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const Text = styled.div`
  width: 120px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 5px;
  margin-right: 30px;
`;
const TextL = styled.div`
  width: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 5px;
  margin-right: 10px;
`;

const dummyimg = DummyImgs[Math.floor(Math.random() * 10)];
const DummyImg = styled.div`
  width: 100%;
  height: 300px;

  background-image: url(${dummyimg});
  background-position: center;
  background-size: cover;

  margin-bottom: 20px;
`;

const Content = styled.div`
  padding: 10px;
  width: 100%;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Bio = styled.div`
  background-color: rgba(233, 193, 255, 10%);
  margin: 5px 0px;
  padding: 10px;
  width: 100%;
  min-height: 50px;
  border-radius: 5px;

  p {
    font-size: 14px;
  }
`;

const LinkButtons = styled.div`
  display: flex;
  a {
    color: darkray;
    font-size: 12px;
    margin: 0px auto;
    span {
      margin-left: 2px;
    }
  }
`;
const { kakao } = window;

const MapView = styled.div`
  grid-column: 2/14;
  border: 2px solid #dfc1ff;
  width: 100%;
  height: 400px;
  min-height: 300px;
  min-width: 300px;
  margin-bottom: 20px;
  border-radius: 0px;
`;
const ButtonWrap = styled.div`
  display: flex;
  margin: 20px 0px;
  justify-content: space-between;
`;
const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  width: 150px;
  padding: 5px 5px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #5e17eb;
  font-size: 14px;
  transition: 1ms;
  &:hover {
    color: #5e17eb;
    font-weight: 600;
    background-color: rgba(233, 193, 255, 10%);
    position: relative;
    top: -2px;
  }
  &:active {
    position: relative;
    top: 0px;
  }
`;

//바뀐 location으로 marker 만들기용으오로 데이터 가공

const StudyDesc = () => {
  const container = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { likedStudies } = useSelector((state) => state.allStudies);
  const [isLike, setIsLike] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [share, setShare] = useState(false);
  const moment = require("moment");
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
    var imgname =
      data.language[0]["name"] === "c++" ? "c" : data.language[0]["name"];
    var img = langImg[imgname];

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
      for (let el of likedStudies) {
        if (el.id === data.id) {
          setIsLike(true);
        }
      }
    }
  }, [data, likedStudies]);

  useEffect(() => {
    studyApi(id).then((res) => {
      setData(res.data?.data?.study);
      console.log("study get data: ", res.data?.data?.study);

      setLocation(res.data?.data?.study.location);
    });
  }, []);

  const handleUnlike = async () => {
    await dispatch(
      unLikeStudy({ id: user.id, studyData: { study_id: data.id } })
    );

    setIsLike(!isLike);
  };

  const handleLike = async () => {
    await dispatch(
      likeStudy({ id: user.id, studyData: { study_id: data.id } })
    );
    setIsLike(!isLike);
  };

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
          <TitleBar>
            <Title>{data.title}</Title>
            <Alter>
              {data.user_id === user?.id ? (
                <>
                  <HeartIcon>
                    {isLike ? (
                      <FontAwesomeIcon
                        onClick={handleUnlike}
                        icon={like}
                        size="1x"
                        color="red"
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={handleLike}
                        icon={unLike}
                        size="1x"
                      />
                    )}
                  </HeartIcon>
                  <ShareIcon onClick={handleShareButton}>
                    {share ? <ShareSocialButton /> : null}
                    <FontAwesomeIcon icon={faShareNodes} />
                  </ShareIcon>

                  <Update onClick={() => navigate(`/study/edit/${data.id}`)}>
                    수정
                  </Update>
                  <Delete onClick={handleStudyDeletion}>삭제</Delete>
                </>
              ) : (
                <>
                  <HeartIcon>
                    {isLike ? (
                      <FontAwesomeIcon
                        onClick={handleUnlike}
                        icon={like}
                        size="1x"
                        color="red"
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={handleLike}
                        icon={unLike}
                        size="1x"
                      />
                    )}
                  </HeartIcon>
                  <ShareIcon onClick={handleShareButton}>
                    {share ? <ShareSocialButton /> : null}
                    <FontAwesomeIcon icon={faShareNodes} />
                  </ShareIcon>
                </>
              )}
            </Alter>
          </TitleBar>
          <Host>
            <CreateAt>{moment(data.createAt).format("YYYY.MM.DD")}</CreateAt>

            <MiniProfileWrap>
              <img className="profile" src={data?.image} />
              <p>{data?.username}</p>
            </MiniProfileWrap>
          </Host>
          <DummyImg></DummyImg>
          <Wrap>
            <Icon>
              {data?.closed ? <BsFillDoorClosedFill /> : <BsFillDoorOpenFill />}
            </Icon>
            <Text>{data?.closed ? "모집마감" : "모집중"}</Text>
            <Icon>
              <BsFileEarmarkCodeFill />
            </Icon>
            <TextL>
              <span className="langSpan">
                {data?.language.map((el, idx) => el.name).join()}
              </span>
            </TextL>
          </Wrap>
          <Wrap>
            <Icon>
              <BsFillCalendarDateFill />
            </Icon>
            <Text>{data?.startDate}</Text>

            <Icon>
              <FaMapMarkerAlt />
            </Icon>
            <TextL>{data?.location.name}</TextL>
          </Wrap>
          <div className="mapview">
            <MapView id="map" ref={container} />
          </div>
          <ContentWrap>
            <Content>{data?.content}</Content>
          </ContentWrap>

          <ProfileWrap>
            <ProfileInWrap>
              <ProfileImage>
                <img src={data?.image} />
              </ProfileImage>

              <LinkButtons>
                <a href={data?.github} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithubAlt} />
                  <span>git</span>
                </a>
                <a href={data?.blog} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faBlogger} />
                  <span>blog</span>
                </a>
              </LinkButtons>
            </ProfileInWrap>

            <Profile>
              <h1>스터디장, {data?.username}을 소개합니다.</h1>
              <Bio>{data?.bio}</Bio>
            </Profile>
          </ProfileWrap>
          <ButtonWrap>
            <ConfirmButton onClick={() => setShowComments(!showComments)}>
              <p>댓글작성 | 보기</p>

              <Icon>
                <FontAwesomeIcon icon={faAngleDown} size="1x" color="black" />
              </Icon>
            </ConfirmButton>
            <ConfirmButton src={data?.kakaoLink}>스터디 참여하기</ConfirmButton>
          </ButtonWrap>

          <CommentsDiv>
            {showComments ? <Comments studyId={id} /> : null}
          </CommentsDiv>
        </StyleStudyDesc>
      ) : (
        "data가 없습니다"
      )}
    </>
  );
};

export default StudyDesc;
