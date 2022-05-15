import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getMyStudies, reset } from "../features/studies/allStudiesSlice";
import StudyCard from "../components/StudyCard";
import LoadingIndicator from "../components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import emptyPorder from "../static/images/emptyPorder.png";

const MyStudyTab = styled.div`
  color: black;
  border-bottom: 3px solid #dfc1ff;
`;
const LikedStudyTab = styled.div``;
const MyprofileTab = styled.div``;

const MyStudyContainer = styled.div`
  min-height: 100%;
  min-width: 400px;
  grid-column: 4/12;
  justify-content: center;
  gap: 3%;

  @media screen and (max-width: 1100px) {
    grid-column: 3 / 13;
  }
  @media screen and (max-width: 768px) {
    grid-column: 2 / 14;
  }
`;
const StyledSection = styled.div`
  min-height: 100%;
  min-width: 400px;
  display: grid;
  align-items: flex-start;
  justify-content: space-evenly;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  gap: 1%;

  @media screen and (max-width: 1800px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, auto));
    transition: 1s;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(300px, auto));
    transition: 1s;
  }
`;

const UserTitle = styled.div`
  font-size: 30px;
  font-family: "Binggrae";
  margin-bottom: 50px;
  span {
    font-weight: 500;
    padding-bottom: 5px;
    border-bottom: 3px solid #dfc1ff;
  }
  @media screen and (max-width: 1024px) {
    font-size: 20px;
    transition: 1s;
  }
`;

const Tab = styled.div`
  display: flex;
  font-weight: 800;
  border-bottom: 2px solid darkgray;
  margin-bottom: 20px;
  color: gray;
  font-size: 14px;
  font-family: "Binggrae";
  cursor: pointer;
  .tap {
    padding: 10px 3%;
    border-radius: 10px 10px 0 0;
    transition: 0.3s;
    &:hover {
      color: black;
      border-bottom: 3px solid #dfc1ff;
    }
  }
  @media screen and (max-width: 764px) {
    font-size: 12px;
    transition: 1s;
  }
`;
const Alert = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Binggrae";
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 30%;
  }
`;
const AlertText = styled.div`
  text-align: center;
  h1 {
    font-size: 40px;
  }
  p {
    font-size: 22px;
    color: gray;
  }
  @media screen and (max-width: 1024px) {
    h1 {
      font-size: 30px;
    }
    p {
      font-size: 18px;
      transition: 0.5s;
    }
  }
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 16px;
      transition: 0.5s;
    }
  }
`;
const MyStudy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { myStudies, isLoading, isError, message } = useSelector(
    (state) => state.allStudies
  );

  // console.log(`my studies: ${JSON.stringify(myStudies)}`);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getMyStudies(user.id));
    dispatch(reset());
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <MyStudyContainer>
        <UserTitle>
          <h1>
            <span>{user.username}</span> 님의 스터디
          </h1>
        </UserTitle>
        <Tab>
          <MyStudyTab className="tap" onClick={() => navigate("/mystudy")}>
            나의 스터디
          </MyStudyTab>
          <LikedStudyTab
            className="tap"
            onClick={() => navigate("/likedstudy")}
          >
            찜한 스터디
          </LikedStudyTab>
          <MyprofileTab className="tap" onClick={() => navigate("/profile")}>
            프로필
          </MyprofileTab>
        </Tab>
        <StyledSection>
          {myStudies.length !== 0 ? (
            myStudies.map((myStudy, i) => <StudyCard key={i} myStudy={myStudy} />)
          ) : (
            <Alert>
              <img src={emptyPorder} alt="google" />
              <AlertText>
                <h1>작성한 스터디가 없습니다</h1>
                <p>스터디를 작성해주세요</p>
              </AlertText>
            </Alert>
          )}
        </StyledSection>
      </MyStudyContainer>
    </>
  );
};

export default MyStudy;
