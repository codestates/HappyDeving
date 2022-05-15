import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../features/user/userSlice.js";
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";
import { openModal } from "../features/modal/modalSlice.js";
import EditSideProfile from "../components/styles/EditSideProfile.styled";

const StyledEditProfile = styled.div`
  grid-column: 4 / 12;
  text-align: left;
  min-width: 400px;

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
  font-family: "Binggrae";
  font-size: 30px;
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
    transition: 0.5s;
  }
`;

const MyStudyTab = styled.div``;
const LikedStudyTab = styled.div``;
const MyprofileTab = styled.div`
  color: black;
  border-bottom: 3px solid #dfc1ff;
`;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding: 30px 0px 40px 0px;
  border-bottom: 2px solid darkgray;
  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const Side = styled.div`
  padding: 0px 20px;
  margin-right: 20px;
  margin-left: 20px;
  grid-column: 1 / 3;
`;

const ProfileWrap = styled.form`
  display: flex;
  grid-column: 3 / 9;
  flex-direction: column;
  padding: 0px 10px;
`;

const Text = styled.div`
  width: 150px;
  font-family: "Binggrae";
  border-bottom: 1px solid gray;
  color: dimgray;
  font-size: 16px;
  padding-bottom: 2px;
  margin-bottom: 10px;
  margin-top: 25px;
  @media screen and (max-width: 764px) {
    font-size: 14px;
  }
`;

const Input = styled.input`
  background-color: rgba(233, 193, 255, 20%);
  border-radius: 5px;
  height: 40px;
  width: 100%;
  font-size: 17px;
  padding: 10px;
  height: 50px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    height: 40px;
  }

  &:hover {
    outline: none;
    border-bottom: 1px solid #5e17eb;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #5e17eb;
  }
`;
const InputBio = styled.textarea`
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

  &:focus {
    outline: none;
  }
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
    margin-right: 10px;
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
const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.user);

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
          <LikedStudyTab className="tap" onClick={() => navigate("/likedstudy")}>
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
                <button onClick={handleEditing}>수정하기</button>
              </Link>

              <Link to="/">
                <button onClick={handlePermanentDeletion}>회원 탈퇴</button>
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
