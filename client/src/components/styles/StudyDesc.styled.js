import React from "react";
import styled from "styled-components";
import Content from "../styles/Content.styled";

const Title = styled(Content)`
  grid-column: 2/14;
  height: 80px;
`;

const Div = styled.div`
  grid-column: 5/14;
`;

const Profile = styled(Content)`
  grid-column: 2/5;
  height: 400px;
`;

const Desc = styled(Content)`
  grid-column: 5/14;
  height: 400px;
`;

const StudyDesc = () => {
  return (
    <>
      <Title />
      <Div>
        <Profile />
        <Desc />
      </Div>
    </>
  );
};

export default StudyDesc;
