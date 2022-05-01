import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout, reset, editProfile, deleteUser } from "../features/user/userSlice";
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";

const StyledEditProfile = styled(Content)`
  grid-column: 3 / 13;
  text-align: left;
  /* x, y, blur-radius, spread */
`;
const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  margin-left: 30px;
  margin-bottom: 20px;
  background-color: gray;
  border-radius: 100px;
  font-size: 12px;
`;

const Title = styled(Content)`
  /* background-color: green; */
  margin-top: 10px;
  margin-left: 30px;
  margin-bottom: 30px;
  font-size: 20px;
`;
const ProfileWrap = styled(Content)`
  /* background-color: red; */
  /* grid-column: 3 / 13; */
  width: 70vw;
  display: inline-flexbox;
`;

const InputWrap = styled(Content)`
  /* background-color: blue; */
  width: 30vw;
`;
const InputBox = styled.input`
  /* background-color: yellow; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Text = styled.div`
  width: 120px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: right;
`;

const Button = styled.button`
  font-size: 14px;
  margin: 10px;
  padding: 5px;
  cursor: pointer;
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
      <ProfileWrap>
        <ProfileImg>소셜 로그인 이미지</ProfileImg>
        <form>
          <InputWrap>
            <Text>닉네임</Text>
            <InputBox
              type="username"
              defaultValue={user?.username}
              onChange={handleInputValue("username")}
            />
          </InputWrap>
          <InputWrap>
            <Text>자기 소개</Text>
            <InputBox type="bio" defaultValue={user?.bio} onChange={handleInputValue("bio")} />
          </InputWrap>
          <InputWrap>
            <Text>깃허브 주소</Text>
            <InputBox
              type="github"
              defaultValue={user?.github}
              onChange={handleInputValue("github")}
            />
          </InputWrap>
          <InputWrap>
            <Text>블로그 주소</Text>
            <InputBox type="blog" defaultValue={user?.blog} onChange={handleInputValue("blog")} />
          </InputWrap>
          <ButtonWrap>
            <Link to="/profile">
              <Button
                className="cursor-pointer px-3 py-2 text-sm text-blue-100 bg-purple-500 rounded hover:bg-purple-400"
                onClick={handleEditing}
              >
                수정 완료
              </Button>
            </Link>
            <Link to="/">
              <Button
                className="cursor-pointer px-3 py-2 text-sm text-blue-100 bg-purple-500 rounded hover:bg-purple-400"
                onClick={handlePermanentDeletion}
              >
                회원 탈퇴
              </Button>
            </Link>
          </ButtonWrap>
        </form>
      </ProfileWrap>
    </StyledEditProfile>
  );
};

export default MyPage;
