/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart as like } from "@fortawesome/free-soluser.id-svg-icons";
// import { faHeart as unlike } from "@fortawesome/free-regular-svg-icons";
// import { langImg } from "../../static/images/langImg";
import { likeStudy, unLikeStudy } from "../features/studies/allStudiesSlice";
import { useNavigate } from "react-router-dom";

const CardContainer = styled(Content)`
  width: 20vh;
  height: 20vh;
  display: flex;
  margin: 20px auto;
  align-items: center;
  justify-content: space-evenly;
`;

const CardForm = styled.div`
  width: 15vh;
  height: 15vh;
  background-color: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LikeButton = styled.button`
  display: flex;
  margin-left: 70%;
`;

const HeartIcon = styled.span`
  position: absolute;
  font-size: 25px;
  .like {
    color: #d32f2f;
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
    navigate(`/study/${user.id}`);
  };

  return (
    <>
      <CardContainer>
        <CardForm>
          <h1 onClick={moveToStudyPage}>{study.title}</h1>
          <div>{study.startDate}</div>
          <LikeButton>
            <HeartIcon onClick={handleHeart} className="heart-icon">
              {isLike ? "♥" : "♡"}
            </HeartIcon>
          </LikeButton>
        </CardForm>
      </CardContainer>
    </>
  );
};

export default StudyCard;

// like 테이블 => get 요청시 내 유저아이디만 보내도, 유저 아이디랑 스터디를 연결하는 테이블
