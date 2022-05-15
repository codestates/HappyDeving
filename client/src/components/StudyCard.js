/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Content from "../components/styles/Content.styled";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getLikedStudies,
  // getMyStudies,
  likeStudy,
  unLikeStudy,
} from "../features/studies/allStudiesSlice";
import { useNavigate } from "react-router-dom";
import { langImg } from "../static/images/langImg";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unLike } from "@fortawesome/free-regular-svg-icons";
// import { lang } from "moment";

const CardContainer = styled.div`
  box-shadow: 3px 3px 5px grey;
  display: flex;
  border-radius: 10px;
  /* background: rgba(233, 193, 255, 10%); */
  /* border: 3px solid rgba(233, 193, 255, 20%);
  width: 380px;
  height: auto;
  margin-top: 5%;*/
  height: 180px;
  font-family: "Binggrae";
  width: 380px;
  margin-top: 5%;
  text-align: flex-start;
  cursor: pointer;
  &:hover {
    position: relative;
    top: -2px;
  }
  @media screen and (max-width: 2200px) {
    width: 350px;
    transition: 1s;
  }

  @media screen and (max-width: 1100px) {
    height: 160px;
    /*height: 180px;
    width: 300px;
    transition: 1s;
  }
  @media screen and (max-width: 768px) {
    height: 180px;*/
    width: 300px;
    transition: 1s;
  }
`;

const LanguageImg = styled.div`
  /*margin: 3%;
  width: 20%;
  min-width: 50px;*/
  margin-left: 15px;
  width: 25%;
  min-width: 50px;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  img {
    padding: 5%;
    border-radius: 50%;
    border: 1px solid #5e17eb;
  }
`;
const CardForm = styled.div`
  width: 300px;
  margin: 15px;

  /*background: white;
  width: 90%;
  margin: 10px 10px 10px 0px;
  border: 2.5px solid rgba(233, 193, 255, 80%);
  padding: 5px;
  border-radius: 5px;*/
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  /*h1 {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100px;
    margin: 0px 20px;
    font-size: 16px;
    border-bottom: #dfc1ff;
    font-weight: 500;
    /* width: 80%; *
  }
  hr {
    margin-bottom: 20px;
    width: 90%;
    overflow: hidden;
    height: 3px;
    background: #dfc1ff;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 20px;
    font-size: 18px;
    color: gray;
  }
  justify-content: space-between;*/
`;

const Title = styled.div`
  width: 200px;
  font-family: "Binggrae";
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-height: 25px;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
  /* width: 80%; */
`;

const StartDate = styled.div`
  display: flex;

  font-size: 15px;
  color: darkgray;
  @media screen and (max-width: 1110px) {
    font-size: 14px;
  }
`;
const Content = styled.div`
  width: 100%;
  /* background-color: #dfc1ff; */
  border-top: 2px solid rgba(233, 193, 255, 80%);
  /* border-bottom: 2px solid #dfc1ff; */
  padding: 10px 10px 0px 0px;
  /* white-space: nowrap; */
  overflow: hidden;
  display: flex;
  height: 110px;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const LikeButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeartIcon = styled.span`
  font-size: 20px;
  margin-left: 90%;
  .like {
    color: #d32f2f;
  }
  @media screen and (max-width: 1100px) {
    font-size: 18px;
  }
`;

const StudyCard = ({ myStudy, likedStudy }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { myStudies, likedStudies } = useSelector((state) => state.allStudies);

  useEffect(() => {
    if (likedStudy) {
      setIsLike(true);
    }
    if (myStudy) {
      setIsLike(false);
    }
  }, [myStudies, likedStudies]);

  const imageHandler = (study) => {
    return study.language
      .slice(0, 2)
      .map((el) =>
        el["name"] === "c++" ? (
          <img src={langImg["c"]} alt=""></img>
        ) : (
          <img src={langImg[el["name"]]} alt=""></img>
        )
      );
  };

  const handleUnlike = async () => {
    await dispatch(
      unLikeStudy({ id: user.id, studyData: { study_id: likedStudy.id } })
    );
    setIsLike(!isLike);
    await dispatch(getLikedStudies(user.id));
  };

  const handleLike = async () => {
    await dispatch(
      likeStudy({ id: user.id, studyData: { study_id: myStudy.id } })
    );
    setIsLike(!isLike);
    await dispatch(getLikedStudies(user.id));
    navigate("/likedstudy");
  };

  const moveToStudyPage = (study) => {
    navigate(`/study/${study.id}`);
  };

  return (
    <>
      {/* <Container> */}
      <CardContainer>
        {myStudy ? (
          <LanguageImg>{imageHandler(myStudy)}</LanguageImg>
        ) : (
          <LanguageImg>{imageHandler(likedStudy)}</LanguageImg>
        )}
        <CardForm>
          <Title
            onClick={() => moveToStudyPage(myStudy ? myStudy : likedStudy)}
          >
            {myStudy ? myStudy.title : likedStudy.title}
          </Title>
          <hr />

          <Content> {myStudy ? myStudy.content : likedStudy.content}</Content>
          <LikeButton>
            <StartDate>
              시작 예정일 | {myStudy ? myStudy.startDate : likedStudy.startDate}
            </StartDate>
            <HeartIcon className="heart-icon">
              {isLike ? (
                <FontAwesomeIcon
                  onClick={handleUnlike}
                  icon={like}
                  size="1x"
                  color="red"
                />
              ) : (
                <FontAwesomeIcon onClick={handleLike} icon={unLike} size="1x" />
              )}
            </HeartIcon>
          </LikeButton>
        </CardForm>
      </CardContainer>
      {/* </Container> */}
    </>
  );
};

export default StudyCard;
