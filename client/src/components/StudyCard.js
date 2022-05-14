/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Content from "../components/styles/Content.styled";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLikedStudies, likeStudy, unLikeStudy } from "../features/studies/allStudiesSlice";
import { useNavigate } from "react-router-dom";
import { langImg } from "../static/images/langImg";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unLike } from "@fortawesome/free-regular-svg-icons";
import { nanoid } from "nanoid";

const CardContainer = styled.div`
  box-shadow: 7px 7px 10px grey;
  display: flex;
  border-radius: 10px;
  background-color: white;
  height: 180px;
  font-family: "Binggrae";
  width: 400px;
  margin-top: 10%;
  text-align: flex-start;
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
  margin-left: 15px;
  width: 100px;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;

  img {
    border-radius: 50%;
    border: 1px solid #5e17eb;
  }
`;
const CardForm = styled.div`
  width: 300px;
  margin: 1rem;

  display: flex;
  flex-direction: column;
  h1 {
    cursor: pointer;
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
          <img key={nanoid()} src={langImg["c"]} alt=""></img>
        ) : (
          <img key={nanoid()} src={langImg[el["name"]]} alt=""></img>
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

    const imageHandler = () => {
      if (myStudy) {
        return myStudy.language
          .slice(0, 2)
          .map((el, idx) =>
            el["name"] === "c++" ? (
              <img key={idx} src={langImg["c"]}></img>
            ) : (
              <img key={idx} src={langImg[el["name"]]}></img>
            )
          );
      } else {
        console.log(likedStudy);
        return likedStudy.language
          .slice(0, 2)
          .map((el, idx) =>
            el["name"] === "c++" ? (
              <img key={idx} src={langImg["c"]}></img>
            ) : (
              <img key={idx} src={langImg[el["name"]]}></img>
            )
          );
      }
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
            {/* <div> */}
            <h1 onClick={() => moveToStudyPage(myStudy ? myStudy : likedStudy)}>
              {myStudy ? myStudy.title : likedStudy.title}
            </h1>
            <hr />
            {/* <p>- 위치</p> */}
            <p>- {myStudy ? myStudy.startDate : likedStudy.startDate}</p>
            {/* </div> */}
            <LikeButton>
              <HeartIcon className="heart-icon">
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
            </LikeButton>
          </CardForm>
        </CardContainer>
        {/* </Container> */}
      </>
    );
  };
};

export default StudyCard;
