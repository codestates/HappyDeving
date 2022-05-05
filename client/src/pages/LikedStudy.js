import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
import { useDispatch, useSelector } from "react-redux";
import { getLikedStudies, reset } from "../features/studies/allStudiesSlice";
import StudyCard from "../components/StudyCard";
import LoadingIndicator from "../components/LoadingIndicator";

const StyledSection = styled(Content)`
  grid-column: 2 / 14;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const StyledLikedStudy = styled(Content)`
  grid-column: 2 / 12;
  background: pink;
  height: 400px;
  text-align: center;
  /* x, y, blur-radius, spread */
`;

const LikedStudy = () => {
  const dispatch = useDispatch();
  // const { id } = useParams(); // id undefined
  const { user } = useSelector((state) => state.user);
  const { likedStudies, isLoading, isError, message } = useSelector((state) => state.allStudies);
  const [data, setData] = useState({});
  // console.log(`liked studies: ${JSON.stringify(likedStudies)}`);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getLikedStudies(user.id));
    setData(likedStudies);
    dispatch(reset());
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <StyledSection>
        <StyledLikedStudy>
          {likedStudies?.map((likedStudy, i) => (
            <StudyCard key={i} likedStudy={likedStudy} />
          ))}
        </StyledLikedStudy>
      </StyledSection>
    </>
  );
};

export default LikedStudy;
