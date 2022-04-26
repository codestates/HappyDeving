import React from "react";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";

const StyledProfile = styled(Content)`
  grid-column: 3 / 13;
  height: 400px;
  text-align: center;
  /* x, y, blur-radius, spread */
`;

const Profile = () => {
  return <StyledProfile>Profile Page</StyledProfile>;
};

export default Profile;
