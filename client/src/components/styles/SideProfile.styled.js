import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Content from "./Content.styled";
import githubIcon from "../../static/images/githubIcon.png";
import blogIcon from "../../static/images/blogIcon.png";

const Container = styled(Content)`
  grid-column: 2/ 5;
  display: grid;
  height: 400px;
  position: relative;
  background-color: pink;
  grid-template-columns: repeat(5, 1fr);
`;

const Profile = styled(Content)`
  grid-column: 2/ 5;
  height: 400px;
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const ProfileImage = styled.img`
  border-radius: 80px;
  width: 12vh;
  margin-top: 15px;
  border: 5px solid #c593fe;
`;

const Bio = styled.div`
  margin-top: 15px;
  width: 10vh;
  height: 10vh;
`;
const LinkButtons = styled.div`
  margin-top: 20px;
  display: flex;
  img {
    width: 3vh;
  }
  a {
    margin-left: 5px;
    margin-right: 5px;
  }
`;
const SideProfile = () => {
  // user.image
  const { user } = useSelector((store) => store.myPage);

  return (
    <>
      <Container>
        <Profile>
          <ProfileImage src={user.image} />
          <Bio>
            <h2>{user.username}닉네임</h2>
            <p>{user.bio}자기소개</p>
          </Bio>
          <LinkButtons>
            <a href={user.github}>
              <img src={githubIcon}></img>
            </a>
            <a href={user.blog}>
              <img src={blogIcon}></img>
            </a>
          </LinkButtons>
        </Profile>
      </Container>
    </>
  );
};

export default SideProfile;
