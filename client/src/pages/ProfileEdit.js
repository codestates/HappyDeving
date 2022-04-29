import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset, getUserInfo, editUserData, deleteUser } from "../features/myPage/myPageSlice";
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
import { signout } from "../features/auth/authSlice";

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

const Title = styled.h1`
  /* background-color: green; */
  margin-left: 30px;
  margin-bottom: 30px;
  font-size: 20px;
`;
const ProfileWrap = styled.div`
  /* background-color: red; */
  display: inline-flexbox;
`;

const InputWrap = styled.div`
  /* background-color: blue; */
  margin-left: 30px;
  margin-bottom: 20px;
  width: 400px;
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

  const [userData, setUserData] = useState({});
  const { username, bio, github, blog } = userData;

  const handleInputValue = (key) => (e) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.myPage);

  useEffect(() => {
    dispatch(getUserInfo()).then((res) => {
      console.log("data 들어오나", res); // userInfo 없음. 나중에 다시 볼 것
      // Uncaught (in promise) TypeError: Cannot read properties of null (reading 'username')
      setUserData({
        username: user.username,
        bio: user.bio,
        github: user.github,
        blog: user.blog,
      });
    });
    dispatch(reset());
  }, [dispatch]);

  const handleEditing = async (e) => {
    e.preventDefault();
    if (isError) {
      console.log(message);
    }
    if (isSuccess) {
      navigate(-1);
    }
    const editingData = {
      username,
      bio,
      github,
      blog,
    };
    dispatch(editUserData(editingData));
  };

  const handlePermanentDeletion = (e) => {
    e.preventDefault();
    dispatch(deleteUser());
    dispatch(signout());
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
              placeholder={username}
              onChange={handleInputValue("username")}
            />
          </InputWrap>
          <InputWrap>
            <Text>자기 소개</Text>
            <InputBox type="bio" placeholder={bio} onChange={handleInputValue("bio")} />
          </InputWrap>
          <InputWrap>
            <Text>깃허브 주소</Text>
            <InputBox type="github" placeholder={github} onChange={handleInputValue("github")} />
          </InputWrap>
          <InputWrap>
            <Text>블로그 주소</Text>
            <InputBox type="blog" placeholder={blog} onChange={handleInputValue("blog")} />
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
