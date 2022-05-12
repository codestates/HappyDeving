import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout, reset } from "../features/user/userSlice.js";
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";
import { openModal } from "../features/modal/modalSlice.js";
import EditSideProfile from "../components/styles/EditSideProfile.styled";

const StyledEditProfile = styled.div`
  grid-column: 4 / 12;
  min-height: 80%;
  text-align: left;
  min-width: 524px;

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
  font-size: 40px;
  margin-bottom: 50px;
  span {
    font-weight: 500;
    border-bottom: 5px solid #dfc1ff;
  }
  @media screen and (max-width: 1024px) {
    font-size: 30px;
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
    @media screen and (max-width: 764px) {
      font-size: 14px;
    }
  }
`;

const MyStudyTab = styled.div``;
const LikedStudyTab = styled.div``;
const MyprofileTab = styled.div``;

const ProfileContainer = styled.div`
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

const ProfileWrap = styled.form`
  display: flex;
  grid-column: 3 / 9;
  flex-direction: column;
  margin: 0px 30px;
`;

const Text = styled.div`
  width: 150px;
  padding-bottom: 2px;
  border-bottom: 1px solid gray;
  color: gray;
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 25px;
  @media screen and (max-width: 764px) {
    font-size: 16px;
  }
`;

const Input = styled.input`
  display: flex;
  border: 1px solid gray;
  padding: 10px 10px;
  margin-right: 20px;
  border-radius: 5px;
  width: 100%;
`;
const InputBio = styled.textarea`
  display: flex;
  border: 1px solid gray;
  padding: 10px 10px;
  margin-right: 20px;
  width: 100%;
`;
const ButtonWrap = styled.div`
  display: flex;
  font-size: 16px;
  margin-top: 30px;
  p {
    border-bottom: 1px solid gray;
    margin-right: 10px;
    color: gray;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      color: black;
      border-bottom: 3px solid #dfc1ff;
    }
  }
`;
const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  const [userData, setUserData] = useState({
    username: "",
    bio: "",
    github: "",
    blog: "",
  });

  const handleInputValue = (key) => (e) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  const handleEditing = async (e) => {
    e.preventDefault();
    if (isError) {
      console.log("editProfile.rejected :", message);
    }
    dispatch(
      openModal({
        name: "UpdateUser",
        childrenProps: { id: user.id, userData: userData },
      })
    );
  };
  // 임시
  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(signout());
    dispatch(reset());
    navigate("/");
  };

  const handlePermanentDeletion = (e) => {
    e.preventDefault();
    dispatch(
      openModal({
        name: "DeleteUser",
        childrenProps: { id: user.id, loginMethod: user.loginMethod },
      })
    );
  };

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

        <ProfileContainer>
          <Side>
            <EditSideProfile />
          </Side>
          <ProfileWrap>
            {/* <form> */}
            <Text>닉네임</Text>
            <Input
              className="username2"
              type="username"
              defaultValue={user?.username}
              onChange={handleInputValue("username")}
            />

            <Text>자기 소개</Text>
            <InputBio
              className="bio"
              type="textarea"
              defaultValue={user?.bio}
              onChange={handleInputValue("bio")}
            ></InputBio>

            <Text>깃허브 주소</Text>
            <Input
              type="github"
              className="github"
              defaultValue={user?.github}
              onChange={handleInputValue("github")}
            />

            <Text>블로그 주소</Text>
            <Input
              className="blog"
              type="blog"
              defaultValue={user?.blog}
              onChange={handleInputValue("blog")}
            />

            <ButtonWrap>
              <Link to="/profile">
                <p onClick={handleEditing}>수정하기</p>
              </Link>
              <Link to="/">
                <p onClick={handleSignout}>로그아웃</p>
              </Link>
              <Link to="/">
                <p onClick={handlePermanentDeletion}>회원 탈퇴</p>
              </Link>
            </ButtonWrap>
            {/* </form> */}
          </ProfileWrap>
        </ProfileContainer>
      </StyledEditProfile>
    </>
  );
};

export default MyPage;
