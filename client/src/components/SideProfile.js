import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt, faBlogger } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  margin-bottom: 20px;
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const ProfileImage = styled.div`
  border-radius: 100px;
  width: 150px;
  height: 150px;
  margin-top: 15px;
  border: 2px solid #c593fe;
  margin-bottom: 10px;
  img {
    border-radius: 100px;
    width: 100%;
    height: 100%;
  }
`;

const LinkButtons = styled.div`
  min-width: 200px;

  a {
    color: darkray;
    font-size: 18px;
    margin: 0px auto;
    margin-left: 10px;
    span {
      margin-left: 3px;
    }
  }
  &:hover {
  }
`;

const SideProfile = () => {
  // user.image

  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Container>
        <Profile>
          <ProfileImage>
            <img src={user.image} />
          </ProfileImage>

          <LinkButtons>
            <a href={user.github} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithubAlt} />
              <span>git</span>
            </a>
            <a href={user.blog} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faBlogger} />
              <span>blog</span>
            </a>
          </LinkButtons>
        </Profile>
      </Container>
    </>
  );
};

export default SideProfile;
