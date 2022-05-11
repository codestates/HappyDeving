import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout, reset, deleteUser } from "../features/user/userSlice.js";
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
import EditSideProfile from "../components/styles/EditSideProfile.styled";
import { openModal } from "../features/modal/modalSlice.js";

const StyledEditProfile = styled(Content)`
  grid-column: 4 / 12;
  min-height: 80vh;
  text-align: left;
`;

const UserTitle = styled.div`
  font-size: 50px;
  margin-bottom: 50px;
  span {
    font-weight: 500;
    border-bottom: 5px solid #dfc1ff;
  }
`;

const Tab = styled.div`
  display: flex;
  font-weight: 800;
  border-bottom: 2px solid darkgray;
  margin-bottom: 20px;
  color: gray;
  cursor: pointer;
  .tap {
    padding: 10px 3%;
    border-radius: 10px 10px 0 0;
    &:hover {
      color: black;
      border-bottom: 2px solid #dfc1ff;
    }
  }
`;

const MyStudyTab = styled.div``;
const LikedStudyTab = styled.div``;
const MyprofileTab = styled.div``;

const ProfileContainer = styled.div`
  display: flex;
  margin-top: 50px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Side = styled.div`
  padding: 0px 20px;
`;

const ProfileWrap = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const ButtonWrap = styled.div`
  display: flex;
  margin-top: 30px;

  p {
    border-bottom: 1px solid gray;
    margin-right: 10px;
    color: gray;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      color: black;
      border-bottom: 3px solid #dfc1ff;
    }
  }
`;

const Text = styled.div`
  width: 150px;
  padding-bottom: 2px;
  border-bottom: 1px solid gray;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Input = styled.input`
  display: flex;
  border: 1px solid gray;
  padding: 10px 10px;
  /* border-radius: 5px; */
  width: 800px;

  @media screen and (max-width: 1200px) {
    width: 300px;
  }

  @media screen and (max-width: 1600px) {
    width: 500px;
  }
  @media screen and (max-width: 1980px) {
    width: 800px;
  }
`;
const InputBio = styled.textarea`
  display: flex;
  border: 1px solid gray;
  padding: 10px 10px;
  width: 1000px;
  @media screen and (max-width: 1200px) {
    width: 300px;
  }
  @media screen and (max-width: 1600px) {
    width: 500px;
  }
  @media screen and (max-width: 1980px) {
    width: 800px;
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.user);
  console.log("userSlice user: ", user); // 들어오다가 undefined 바뀜

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
    dispatch(openModal({ name: "UpdateUser", childrenProps: { id: user.id, userData: userData } }));
    // dispatch(editProfile({ id: user.id, userData: userData }));
    // dispatch(reset());
    // navigate("/profile");
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
    dispatch(deleteUser({ id: user.id, deleteData: { loginMethod: user.loginMethod } }));
    dispatch(reset());
    navigate("/");
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


