import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Content from "../components/styles/Content.styled";
import { useDispatch, useSelector } from "react-redux";
import { getMyStudies, reset } from "../features/studies/allStudiesSlice";
import StudyCard from "../components/StudyCard";
import LoadingIndicator from "../components/LoadingIndicator";
// import Content from "../components/styles/Content.styled";
// import Container from "../components/styles/Container.styled";
import Content from "../components/styles/Content.styled";
import { useNavigate } from "react-router-dom";

const MyStudyTab = styled.div``;
const LikedStudyTab = styled.div``;
const MyprofileTab = styled.div``;

const MyStudyContainer = styled(Content)`
  min-height: 100%;
  min-width: 500px;
  grid-column: 4/12;
  grid-row: 5/12;
  background: white;
  justify-content: center;
  gap: 3%;

  @media screen and (max-width: 1024px) {
    grid-column: 3 / 13;
  }
  @media screen and (max-width: 764px) {
    grid-column: 2 / 14;
  }
`;
const StyledSection = styled.div`
  min-height: 100%;
  min-width: 500px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, auto));
  justify-content: space-evenly;
  gap: 1%;
  @media screen and (max-width: 2300px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, auto));
  }
  @media screen and (max-width: 1800px) {
    grid-template-columns: repeat(auto-fill, minmax(350px, auto));
  }
  @media screen and (max-width: 1674px) {
    grid-template-columns: repeat(auto-fill, minmax(350px, auto));
  }
  @media screen and (max-width: 1310px) {
    height: 180px;
    grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, auto));
    /* grid-template-columns: repeat(2, 1fr); */
  }
  @media screen and (max-width: 764px) {
    grid-template-columns: repeat(1, minmax(300px, auto));
    /* grid-template-columns: repeat(1, 1fr); */
  }
`;

const Tab = styled.div`
  display: flex;
  font-weight: 800;
  border-bottom: 2px solid darkgray;
  margin-bottom: 20px;
  color: gray;
  font-size: 18px;

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
    font-size: 14px;
  }
`;
const MyStudy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { myStudies, isLoading, isError, message } = useSelector((state) => state.allStudies);

  const [data, setData] = useState([]);
  // console.log(`my studies: ${JSON.stringify(myStudies)}`);
  console.log(data);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getMyStudies(user.id));
    setData(myStudies);
    dispatch(reset());
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <MyStudyContainer>
        <Tab>
          <MyStudyTab className="tap" onClick={() => navigate("/mystudy")}>
            나의 스터디
          </MyStudyTab>
          <LikedStudyTab className="tap" onClick={() => navigate("/likedstudy")}>
            찜한 스터디
          </LikedStudyTab>
          <MyprofileTab className="tap" onClick={() => navigate("/profile")}>
            마이페이지
          </MyprofileTab>
        </Tab>
        <StyledSection>
          {myStudies?.map((myStudy, i) => (
            <StudyCard key={i} myStudy={myStudy} />
          ))}
        </StyledSection>
      </MyStudyContainer>
    </>
  );
};

export default MyStudy;
