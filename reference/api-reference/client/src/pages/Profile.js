import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, getProfile } from "../features/user/userSlice";
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
// import { signout } from "../features/user/userSlice";

import SideProfile from "../components/styles/SideProfile.styled";

const StyledEditProfile = styled.div`
  grid-column: 4 / 12;
  min-height: 80%;
  text-align: left;
  min-width: 524px;
  margin-top: 150px;
  @media screen and (max-width: 1024px) {
    grid-column: 3 / 13;
    transition: 1s;
  }
  @media screen and (max-width: 764px) {
    grid-column: 2 / 14;
    transition: 1s;
  }
`;

const UserTitle = styled.div`
  font-size: 30px;
  font-family: "Binggrae";
  margin-bottom: 50px;
  span {
    font-weight: 500;
    border-bottom: 5px solid #dfc1ff;
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
  font-size: 16px;

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
const MyStudyTab = styled.div``;
const LikedStudyTab = styled.div``;
const MyprofileTab = styled.div``;

const ProfileContainer = styled(Content)`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  margin-top: 50px;
  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const Side = styled.div`
  padding: 0px 20px;
  grid-column: 1 / 3;
`;

const ProfileWrap = styled.div`
  display: flex;
  grid-column: 3 / 9;
  flex-direction: column;

  margin: 0px 30px;
  @media screen and (max-width: 764px) {
  }
`;

const Text = styled.div`
  width: 150px;
  font-family: "Binggrae";
  padding-bottom: 2px;
  border-bottom: 1px solid gray;
  color: gray;
  font-size: 14px;
  margin-bottom: 10px;

  margin-top: 25px;
  @media screen and (max-width: 764px) {
    font-size: 12px;
  }
`;

const Info = styled.div`
  background-color: rgba(233, 193, 255, 20%);
  border-radius: 5px;
  height: 40px;
  width: 100%;
  font-size: 16px;
  padding: 10px;
  height: 50px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    width: 100%;
  }
  /* margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  @media screen and (max-width: 764px) {
    font-size: 16px;
  } */
`;

const ButtonWrap = styled.div`
  display: flex;
  font-size: 16px;
  margin-top: 30px;
  button {
    font-family: "Binggrae";
    display: flex;
    justify-content: center;
    width: 120px;
    padding: 5px 5px;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid #5e17eb;
    font-size: 14px;
    transition: 1ms;
    &:hover {
      color: #5e17eb;
      font-weight: 600;
      background-color: rgba(233, 193, 255, 10%);
      position: relative;
      top: -2px;
    }
    &:active {
      position: relative;
      top: 0px;
    }
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  // console.log("profile user: ", user);

  // console.log(user.loginMethod);
  const MoveToEditPage = (e) => {
    e.preventDefault();
    navigate("/editprofile");
  };

  useEffect(() => {
    dispatch(getProfile(user.id));
    dispatch(reset());
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <StyledEditProfile>
        <UserTitle>
          <h1>
            <span>{user.username}</span> 님 안녕하세요
          </h1>
        </UserTitle>
        <Tab>
          <MyStudyTab className="tap" onClick={() => navigate("/mystudy")}>
            나의 스터디
          </MyStudyTab>
          <LikedStudyTab className="tap" onClick={() => navigate("/likedstudy")}>
            찜한 스터디
          </LikedStudyTab>
          <MyprofileTab className="tap" onClick={() => navigate("/profile")}>
            프로필
          </MyprofileTab>
        </Tab>

        <ProfileContainer>
          <Side>
            <SideProfile />
          </Side>
          <ProfileWrap>
            <Text>닉네임</Text>
            <Info>{user?.username}</Info>
            <Text>자기 소개</Text>
            <Info>{user?.bio}</Info>
            <Text>깃허브 주소</Text>
            <Info>{user?.github}</Info>
            <Text>블로그 주소</Text>
            <Info>{user?.blog}</Info>
            <ButtonWrap>
              <button onClick={MoveToEditPage}>프로필 수정하기</button>
            </ButtonWrap>
          </ProfileWrap>
        </ProfileContainer>
      </StyledEditProfile>
    </>
  );
};

export default Profile;
