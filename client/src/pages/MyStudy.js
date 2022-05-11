import React, { useEffect } from "react";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
import { useDispatch, useSelector } from "react-redux";
import { getMyStudies, reset } from "../features/studies/allStudiesSlice";
import StudyCard from "../components/StudyCard";
import LoadingIndicator from "../components/LoadingIndicator";

const StyledSection = styled(Content)`
  grid-column: 2 / 14;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const StyledMyStudy = styled(Content)`
  grid-column: 2 / 12;
  background: pink;
  height: 400px;
  text-align: center;
`;

const MyStudy = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { myStudies, isLoading, isError, message } = useSelector((state) => state.allStudies);
  // const [data, setData] = useState([]);
  // console.log(`my studies: ${JSON.stringify(myStudies)}`);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getMyStudies(user.id));
    // setData(myStudies);
    dispatch(reset());
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <StyledSection>
        <StyledMyStudy>
          {myStudies?.map((myStudy, i) => (
            <StudyCard key={i} myStudy={myStudy} />
          ))}
        </StyledMyStudy>
      </StyledSection>
    </>
  );
};

export default MyStudy;
