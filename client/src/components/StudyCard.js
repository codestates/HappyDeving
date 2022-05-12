/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Content from "../components/styles/Content.styled";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { likeStudy, unLikeStudy } from "../features/studies/allStudiesSlice";
import { useNavigate } from "react-router-dom";
// import { langImg } from "../../static/images/langImg";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unLike } from "@fortawesome/free-regular-svg-icons";

const CardContainer = styled.div`
  box-shadow: 7px 7px 10px grey;
  display: flex;
  border-radius: 10px;
  background-color: white;
  height: 180px;
  width: 400px;
  margin-top: 10%;
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

  /* @media screen and (max-width: 1024px) {
    height: 200px;
    width: 300px;
  } */
  @media screen and (max-width: 1100px) {
    width: 300px;
    transition: 1s;
  }
`;

const LanguageImg = styled.div`
  margin-left: 3rem;
  width: 100px;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;

  img {
    border-radius: 5px;
    border: 3px solid #5e17eb;
  }
`;
const CardForm = styled.div`
  width: 300px;
  margin: 1rem;

  display: flex;
  flex-direction: column;
  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
    width: 80%;
  }
  hr {
    margin-bottom: 20px;
    height: 3px;
    width: 80%;
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
  justify-content: space-between;
`;

const LikeButton = styled.button`
  display: flex;
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

const StudyCard = ({ myStudy, likedStudy }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [study, setStudy] = useState({});
  const [isLike, setIsLike] = useState(true);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (likedStudy) {
      setIsLike(true);
      setStudy(likedStudy);
    }

    if (myStudy) {
      setIsLike(false);
      setStudy(myStudy);
    }
  }, []);

  const handleHeart = () => {
    if (isLike) {
      dispatch(unLikeStudy({ id: user.id, studyData: { study_id: study.id } }));
      setIsLike(false);
    } else {
      dispatch(likeStudy({ id: user.id, studyData: { study_id: study.id } }));
      setIsLike(true);
    }
  };

  const moveToStudyPage = () => {
    navigate(`/study/${study.id}`);
  };

  return (
    <>
      {/* <Container> */}
      <CardContainer onClick={moveToStudyPage}>
        <LanguageImg>
          <img src="https://blog.kakaocdn.net/dn/bNp5o1/btrgkT58S71/77YTYugRulRCb4jvo1HwlK/img.png"></img>
          <img src="https://blog.kakaocdn.net/dn/bNp5o1/btrgkT58S71/77YTYugRulRCb4jvo1HwlK/img.png"></img>
        </LanguageImg>
        <CardForm>
          <div>
            <h1 onClick={moveToStudyPage}>{study.title}</h1>
            <hr />
            {/* <p>- 위치</p> */}
            <p>- {study.startDate}</p>
          </div>

          <LikeButton>
            <HeartIcon onClick={handleHeart} className="heart-icon">
              {isLike ? (
                <FontAwesomeIcon icon={like} size="1x" color="red" />
              ) : (
                <FontAwesomeIcon icon={unLike} size="1x" />
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
