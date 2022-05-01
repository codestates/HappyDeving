import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, deleteUser } from "../features/user/userSlice";
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
import { signout } from "../features/user/userSlice";

const StyledProfileContainer = styled(Content)`
  grid-column: 3 / 13;
  height: 400px;
  text-align: center;
  /* x, y, blur-radius, spread */
`;
const Title = styled(Content)`
  /* background-color: green; */
  margin-top: 10px;
  margin-left: 30px;
  margin-bottom: 30px;
  font-size: 20px;
`;

const ProfileWrap = styled(Content)`
  background-color: red;
  /* grid-column: 3 / 13; */
  width: 70vw;
  display: inline-flexbox;
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

const ProfileInfoWrap = styled.div``;
const Name = styled.div``;
const Biography = styled.div``;
const GitHub = styled.div``;
const Blog = styled.div``;

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

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  console.log("user 왔니: ", user);

  const MoveToEditPage = (e) => {
    e.preventDefault();
    navigate("/editprofile");
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
    <StyledProfileContainer>
      <ProfileWrap>
        <Title>회원 정보 수정</Title>
        <ProfileImg>{user.data.userInfo?.image}</ProfileImg>
        <ProfileInfoWrap>
          <Name>{user.data.userInfo?.username}</Name>
          <Biography>{user.data.userInfo?.bio}</Biography>
          <GitHub>{user.data.userInfo?.github}</GitHub>
          <Blog>{user.data.userInfo?.blog}</Blog>
        </ProfileInfoWrap>
      </ProfileWrap>
      <ButtonWrap>
        <Button
          className="cursor-pointer px-3 py-2 text-sm text-blue-100 bg-purple-500 rounded hover:bg-purple-400"
          onClick={MoveToEditPage}
        >
          수정하기
        </Button>

        <Button
          className="cursor-pointer px-3 py-2 text-sm text-blue-100 bg-purple-500 rounded hover:bg-purple-400"
          onClick={handlePermanentDeletion}
        >
          회원 탈퇴
        </Button>
      </ButtonWrap>
    </StyledProfileContainer>
  );
};

export default Profile;
