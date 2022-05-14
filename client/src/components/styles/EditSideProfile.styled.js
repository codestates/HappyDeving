import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { editProfileImage } from "../../features/user/userSlice";
import LoadingIndicator from "../LoadingIndicator";

const Container = styled.div`
  margin-bottom: 20px;
`;

const Profile = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 14px;
`;
const ProfileImage = styled.div`
  position: relative;
  border-radius: 100px;
  width: 150px;
  height: 150px;
  margin-top: 15px;
  border: 3px solid #c593fe;

  img {
    border-radius: 100px;
    width: 100%;
    height: 100%;
  }
`;

const ProfilePrieview = styled.div`
  position: absolute;
  color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  border-radius: 100px;
  top: 0px;
  left: 0px;
  cursor: pointer;
  &:hover {
    display: flex;
    background: white;
    color: black;
    opacity: 0.6;
    align-items: center;
    justify-content: center;
  }
`;
const ProfileButton = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid gray;
  font-weight: 500;
  font-size: 16px;
  color: gray;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: black;
    border-bottom: 3px solid #dfc1ff;
  }
`;

const EditSideProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const fileInput = useRef(null);

  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const onChangePicture = (e) => {
    setFile(e.target.files[0]);
    let reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;
      if (previewImgUrl) {
        setPreviewImg(previewImgUrl);
      }
    };
  };

  const onSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    dispatch(editProfileImage({ id: user.id, formData }));
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Container>
        <Profile>
          <ProfileImage>
            <img src={previewImg ? previewImg : user.image} />
            <ProfilePrieview
              onClick={() => {
                fileInput.current.click();
              }}
            >
              프로필 업로드
            </ProfilePrieview>
          </ProfileImage>

          <input
            type="file"
            style={{ display: "none" }}
            accept="image/jpg, image/jpeg, image/png"
            name="image"
            onChange={onChangePicture}
            ref={fileInput}
          />

          <ProfileButton onClick={onSave}>프로필 저장하기</ProfileButton>
        </Profile>
      </Container>
    </>
  );
};

export default EditSideProfile;
