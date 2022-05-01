import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Content from "./Content.styled";
import githubIcon from "../../static/images/githubIcon.png";
import blogIcon from "../../static/images/blogIcon.png";
import { editUserData } from "../../features/myPage/myPageSlice";

const Container = styled(Content)`
  grid-column: 2/ 5;
  display: grid;
  height: 400px;
  position: relative;
  background-color: pink;
  grid-template-columns: repeat(5, 1fr);
`;

const Profile = styled(Content)`
  grid-column: 2/ 5;
  height: 400px;
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const ProfileImage = styled.img`
  border-radius: 80px;
  width: 12vh;
  margin-top: 15px;
  border: 5px solid #c593fe;
`;

const Button = styled.button`
  margin-top: 15px;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #c593fe;
`;

const LinkButtons = styled.div`
  margin-top: 20px;
  display: flex;
  img {
    width: 3vh;
  }
  a {
    margin-left: 5px;
    margin-right: 5px;
  }
`;
const EditSideProfile = () => {
  // user.image
  const [image, setImage] = useState("https://i.ibb.co/nr4FYns/happydevil.png");
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.myPage);

  const handleChangeImage = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      // dispatch( {image: "https://i.ibb.co/nr4FYns/happydevil.png" });
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
      dispatch(editUserData({ user: e.target.files[0] }));
    } else {
      // 기존의 이미지
      setImage(user.image);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Container>
        <Profile>
          <ProfileImage src={image} />
          <Button
            onClick={() => {
              fileInput.current.click();
            }}
          >
            업로드
          </Button>
          <input
            type="file"
            style={{ display: "none" }}
            //  image 확장자만 선택적
            accept="image/*"
            name="profile_img"
            onChange={handleChangeImage}
            ref={fileInput}
          />

          <LinkButtons>
            <a href={user.github}>
              <img src={githubIcon}></img>
            </a>
            <a href={user.blog}>
              <img src={blogIcon}></img>
            </a>
          </LinkButtons>
        </Profile>
      </Container>
    </>
  );
};

export default EditSideProfile;
