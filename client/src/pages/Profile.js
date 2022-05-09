import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, deleteUser, getProfile } from "../features/user/userSlice";
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";
import Content from "../components/styles/Content.styled";
import { signout } from "../features/user/userSlice";
import EditSideProfile from "../components/styles/EditSideProfile.styled";

const MyStudyTab = styled(Content)``;
const LikedStudyTab = styled(Content)``;

const ProfileWrap = styled(Content)`
  /* background-color: red; */
  width: 62vw;
`;

const ProfileInfoWrap = styled.div`
  box-shadow: none;
  width: 62vw;
  height: auto;
  padding: 0.5% 2% 1% 2%;
`;
const Name = styled.div``;
const Biography = styled.div``;
const GitHub = styled.div``;
const Blog = styled.div``;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: right;
`;

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
`;

const Text = styled.div`
  width: 120px;
  font-family: "Medium";
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
    dispatch(getProfile(user?.id));
    dispatch(reset());
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <EditSideProfile />
      <StyledEditProfile>
        <MyStudyTab onClick={() => navigate("/mystudy")}>
          나의 스터디
        </MyStudyTab>
        <LikedStudyTab onClick={() => navigate("/likedstudy")}>
          찜한 스터디
        </LikedStudyTab>
        <Title>내 정보 수정</Title>
        <ProfileWrap>
          <ProfileInfoWrap>
            <Text>닉네임</Text>
            <Name>{user?.username}</Name>
          </ProfileInfoWrap>
          <ProfileInfoWrap>
            <Text>자기 소개</Text>
            <Biography>{user?.bio}</Biography>
          </ProfileInfoWrap>
          <ProfileInfoWrap>
            <Text>깃허브 주소</Text>
            <GitHub>{user?.github}</GitHub>
          </ProfileInfoWrap>
          <ProfileInfoWrap>
            <Text>블로그 주소</Text>
            <Blog>{user?.blog}</Blog>
          </ProfileInfoWrap>
          <ButtonWrap>
            <Button
              className="cursor-pointer px-3 py-2 text-sm text-blue-100 bg-purple-500 rounded hover:bg-purple-400"
              onClick={MoveToEditPage}
            >
              수정하기
            </Button>
          </ButtonWrap>
        </ProfileWrap>
      </StyledEditProfile>
    </>
  );
};

export default Profile;
