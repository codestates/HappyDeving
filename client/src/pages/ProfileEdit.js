import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout, reset, editProfile, deleteUser } from "../features/user/userSlice.js";
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
import EditSideProfile from "../components/styles/EditSideProfile.styled.js";

const StyledEditProfile = styled(Content)`
  grid-column: 5 / 14;
  text-align: left;
  /* x, y, blur-radius, spread */
`;

const Title = styled(Content)`
  grid-column: 2/14;
  height: 80px;
  padding: 20px 3%;
  font-family: "Bold";
  display: flex;
  border-radius: ${(props) => props.theme.borderRadius};

  .titleText {
    flex: 1;
    font-size: 3vw;
    text-align: center;
    line-height: 40px;
    margin-left: -3%;
    margin-right: 6%;
  }

  .titleInput {
    flex: 3;
    background-color: beige;
    border-radius: inherit;
    box-shadow: inset -3px -2px 1px 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 40px;
    &:focus {
      outline: none;
    }
  }
`;
const ProfileWrap = styled(Content)`
  /* background-color: red; */
  width: 62vw;
`;

const InputWrap = styled(Content)`
  /* background-color: pink; */
  box-shadow: none;
  width: 62vw;
  height: auto;
  padding: 0.5% 2% 1% 2%;
  border-radius: ${(props) => props.theme.borderRadius};

  input {
    /* background-color: yellow; */
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid rgba(205, 201, 208, 0.8);
  }
`;

const Text = styled.div`
  width: 120px;
  font-family: "Medium";
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: right;
`;

const Button = styled.button`
  margin-right: 1rem;
  width: 10vw;
  height: 30px;
  color: white;
  text-align: center;
  line-height: 30px;
  background-color: ${(props) => props.theme.colors.purple};
  border-radius: 30px;
  box-shadow: 3px 2px 1px 1px #c593fe;
  &:hover {
    background-color: ${(props) => props.theme.colors.lavender};
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
    dispatch(editProfile({ id: user.id, userData: userData }));
    dispatch(reset());
    navigate("/profile");
  };

  const handlePermanentDeletion = (e) => {
    e.preventDefault();
    dispatch(deleteUser());
    dispatch(signout());
    dispatch(reset());
    navigate("/");
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <StyledEditProfile>
      <Title>내 정보 수정</Title>
      <EditSideProfile />
      <ProfileWrap>
        <form>
          <InputWrap>
            <Text>닉네임</Text>
            <input
              type="username"
              defaultValue={user?.username}
              onChange={handleInputValue("username")}
            />
          </InputWrap>
          <InputWrap>
            <Text>자기 소개</Text>
            <input type="bio" defaultValue={user?.bio} onChange={handleInputValue("bio")} />
          </InputWrap>
          <InputWrap>
            <Text>깃허브 주소</Text>
            <input
              type="github"
              defaultValue={user?.github}
              onChange={handleInputValue("github")}
            />
          </InputWrap>
          <InputWrap>
            <Text>블로그 주소</Text>
            <input type="blog" defaultValue={user?.blog} onChange={handleInputValue("blog")} />
          </InputWrap>
          <ButtonWrap>
            <Link to="/profile">
              <Button onClick={handleEditing}>수정 완료</Button>
            </Link>
            <Link to="/">
              <Button onClick={handlePermanentDeletion}>회원 탈퇴</Button>
            </Link>
          </ButtonWrap>
        </form>
      </ProfileWrap>
    </StyledEditProfile>
  );
};

export default MyPage;
