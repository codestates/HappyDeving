import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Content from "./Content.styled";
// import githubIcon from "../../static/images/githubIcon.png";
// import blogIcon from "../../static/images/blogIcon.png";
import { editProfileImage } from "../../features/user/userSlice";
import axios from "axios";
// import { useEffect } from "react";
// import { editProfile } from "../../features/user/userSlice";

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
  border-radius: 100px;
  width: 150px;
  height: 150px;
  margin-top: 15px;
  border: 5px solid #c593fe;
`;

const Button = styled.button`
  margin-top: 15px;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #c593fe;
`;

// const LinkButtons = styled.div`
//   margin-top: 20px;
//   display: flex;
//   img {
//     width: 3vh;
//   }
//   a {
//     margin-left: 5px;
//     margin-right: 5px;
//   }
// `;
const EditSideProfile = () => {
  // user.image
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => state.user);
  const fileInput = useRef(null);

  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState("https://i.ibb.co/nr4FYns/happydevil.png");
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      console.log("image: ", e.target.files[0]);
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageData(reader.result);
        console.log("reader.result", reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    if (isError) {
      console.log("editProfileImage.rejected :", message);
    }
    console.log("{ id: user.id, formData }: ", { id: user.id, formData });
    dispatch(editProfileImage({ id: user.id, formData }));
    console.log("id? :", user.id);
  };

  return (
    <>
      <Container>
        <div>보인다.</div>
        <Profile>
          <ProfileImage src={imageData} />
          <Button
            onClick={() => {
              fileInput.current.click();
            }}
          >
            미리보기
          </Button>
          {/* <form> */}
          <input
            type="file"
            style={{ display: "none" }}
            //  image 확장자만 선택적
            accept="image/jpg, image/jpeg, image/png"
            name="image"
            onChange={onChangePicture}
            ref={fileInput}
          />
          {/* <label htmlFor="image">저장하기</label> */}
          <button onClick={onSave}>저장하기</button>
          {/* </form> */}

          {/* <LinkButtons>
            <a href={user.github}>
              <img src={githubIcon}></img>
            </a>
            <a href={user.blog}>
              <img src={blogIcon}></img>
            </a>
          </LinkButtons> */}
        </Profile>
      </Container>
    </>
  );
};

export default EditSideProfile;
