/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLikedStudies, unLikeStudy } from "../features/studies/allStudiesSlice";
import { useNavigate } from "react-router-dom";
import { langImg } from "../static/images/langImg";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";

const CardContainer = styled.div`
  box-shadow: 3px 3px 5px gray;
  display: flex;
  border-radius: 10px;
  border: 3px solid rgba(233, 193, 255, 20%);
  width: 300px;
  height: 170px;
  margin-top: 5%;
  text-align: flex-start;
  cursor: pointer;
  &:hover {
    position: relative;
    top: -2px;
  }

  @media screen and (max-width: 1800px) {
    width: 280px;
    transition: 1s;
  }

  @media screen and (max-width: 1100px) {
    height: 160px;
    width: 280px;
    transition: 1s;
  }
`;

const LanguageImg = styled.div`
  margin: 3%;
  width: 20%;
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
  background: white;
  width: 90%;
  margin: 10px 10px 10px 0px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 200px;
  font-family: "Binggrae";
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-height: 25px;
  font-size: 18px;
  font-weight: 500;
  @media screen and (max-width: 1110px) {
    font-size: 16px;
    transition: 0.5s;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
    transition: 0.5s;
  }
`;

const StartDate = styled.div`
  display: flex;
  font-size: 15px;
  color: darkgray;
  @media screen and (max-width: 1110px) {
    font-size: 14px;
    transition: 0.5s;
  }
`;
const Content = styled.div`
  font-family: "Binggrae";
  width: 100%;
  margin: 5px 0px;
  /* border-top: 2px solid rgba(233, 193, 255, 80%); */
  border-top: 2px solid darkgray;
  font-size: 16px;
  padding: 10px 10px 0px 0px;
  overflow: hidden;
  display: flex;
  height: 110px;

  @media screen and (max-width: 1100px) {
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

  color: #d32f2f;

  @media screen and (max-width: 1100px) {
    font-size: 18px;
  }
`;

const StudyCard = ({ myStudy, likedStudy }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const imageHandler = (study) => {
    console.log("image handler study: ", study);
    return study.language
      ?.slice(0, 2)
      .map((el, i) =>
        el["name"] === "c++" ? (
          <img key={i} src={langImg["c"]} alt=""></img>
        ) : (
          <img key={i} src={langImg[el["name"]]} alt=""></img>
        )
      );
  };

  const handleUnlike = async () => {
    await dispatch(unLikeStudy({ id: user.id, studyData: { study_id: likedStudy.id } }));
    await dispatch(getLikedStudies(user.id));
  };

  const moveToStudyPage = (study) => {
    navigate(`/study/${study.id}`);
  };

  return (
    <>
      <CardContainer>
        {myStudy ? (
          <LanguageImg>{imageHandler(myStudy)}</LanguageImg>
        ) : (
          <LanguageImg>{imageHandler(likedStudy)}</LanguageImg>
        )}
        <CardForm>
          <Title onClick={() => moveToStudyPage(myStudy ? myStudy : likedStudy)}>
            {myStudy ? myStudy.title : likedStudy.title}
          </Title>

          <Content> {myStudy ? myStudy.content : likedStudy.content}</Content>
          <LikeButton>
            <StartDate>
              시작 예정일 | {myStudy ? myStudy.startDate : likedStudy.startDate}
            </StartDate>
            {myStudy ? null : (
              <HeartIcon>
                <FontAwesomeIcon onClick={handleUnlike} icon={like} size="1x"></FontAwesomeIcon>
              </HeartIcon>
            )}
          </LikeButton>
        </CardForm>
      </CardContainer>
    </>
  );
};

export default StudyCard;
