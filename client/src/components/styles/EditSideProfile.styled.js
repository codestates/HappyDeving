import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Content from "./Content.styled";
// import githubIcon from "../../static/images/githubIcon.png";
// import blogIcon from "../../static/images/blogIcon.png";
import { editProfileImage } from "../../features/user/userSlice";
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
  higth: 150px;
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
  const [image, setImage] = useState("https://i.ibb.co/nr4FYns/happydevil.png");
  const fileInput = useRef(null);

  const handleChangeImage = (e) => {
    // e.preventDefault();
    if (e.target.files[0]) {
      // dispatch( {image: "https://i.ibb.co/nr4FYns/happydevil.png" });
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
    } else {
      setImage(image);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  //화면에 프로필 사진 표시
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setImage(reader.result);
  //       console.log(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  const handleClick = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("image", image);
    console.log(image);
    if (isError) {
      console.log("editProfile.rejected :", message);
    }
    dispatch(editProfileImage({ id: user.id, formdata }));
    console.log("id? :", user.id);
  };
  // useEffect(() => {
  //   preview();
  //   return () => preview();
  // });

  // const preview = () => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImage(reader.result);
  //   };
  //   reader.readAsDataURL(image);
  // };
  return (
    <>
      <Container>
        <div>보인다.</div>
        <Profile>
          <ProfileImage src={image} />
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
            name="profile_img"
            onChange={handleChangeImage}
            ref={fileInput}
          />
          {/* <label htmlFor="image">저장하기</label> */}
          <button type="submit" onClick={handleClick}>
            저장하기
          </button>
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

// import React, { useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
// import Content from "./Content.styled";
// // import githubIcon from "../../static/images/githubIcon.png";
// // import blogIcon from "../../static/images/blogIcon.png";
// import { editProfileImage } from "../../features/user/userSlice";
// // import { useEffect } from "react";
// // import { editProfile } from "../../features/user/userSlice";

// const Container = styled(Content)`
//   grid-column: 2/ 5;
//   display: grid;
//   height: 400px;
//   position: relative;
//   background-color: pink;
//   grid-template-columns: repeat(5, 1fr);
// `;

// const Profile = styled(Content)`
//   grid-column: 2/ 5;
//   height: 400px;
//   position: relative;
//   background-color: white;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
// `;
// const ProfileImage = styled.img`
//   border-radius: 100px;
//   width: 150px;
//   higth: 150px;
//   margin-top: 15px;
//   border: 5px solid #c593fe;
// `;

// // const Button = styled.button`
// //   margin-top: 15px;
// //   border-radius: 10px;
// //   padding: 5px 10px;
// //   background-color: #c593fe;
// // `;

// // const LinkButtons = styled.div`
// //   margin-top: 20px;
// //   display: flex;
// //   img {
// //     width: 3vh;
// //   }
// //   a {
// //     margin-left: 5px;
// //     margin-right: 5px;
// //   }
// // `;
// const EditSideProfile = () => {
//   // user.image
//   const dispatch = useDispatch();
//   const { user, isError, message } = useSelector((state) => state.user);
//   const [image, setImage] = useState("");
//   const fileInput = useRef(null);

//   const handleChangeImage = (e) => {
//     e.preventDefault();
//     console.log(e.target.files[0]);
//     setImage(e.target.files[0]);
//   };
//   //화면에 프로필 사진 표시
//   //   const reader = new FileReader();
//   //   reader.onload = () => {
//   //     if (reader.readyState === 2) {
//   //       setImage(reader.result);
//   //       console.log(reader.result);
//   //     }
//   //   };
//   //   reader.readAsDataURL(e.target.files[0]);
//   // };

//   const handleClick = (e) => {
//     e.preventDefault();
//     const formdata = new FormData();
//     formdata.append("image", image);
//     console.log(image);
//     if (isError) {
//       console.log("editProfile.rejected :", message);
//     }
//     dispatch(editProfileImage({ id: user.id, formdata }));
//     console.log("id? :", user.id);
//   };
//   // useEffect(() => {
//   //   preview();
//   //   return () => preview();
//   // });

//   // const preview = () => {
//   //   const reader = new FileReader();
//   //   reader.onload = () => {
//   //     setImage(reader.result);
//   //   };
//   //   reader.readAsDataURL(image);
//   // };
//   return (
//     <>
//       <Container>
//         <div>dsfsdfsfsdf</div>
//         <Profile>
//           <ProfileImage src={image} />
//           <form>
//             <input
//               type="file"
//               // style={{ display: "none" }}
//               //  image 확장자만 선택적
//               accept="image/jpg, image/jpeg, image/png"
//               name="profile_img"
//               onChange={handleChangeImage}
//               ref={fileInput}
//             />
//             {/* <label htmlFor="image">저장하기</label> */}
//             <button type="submit" onClick={handleClick}>
//               저장하기
//             </button>
//           </form>

//           {/* <LinkButtons>
//             <a href={user.github}>
//               <img src={githubIcon}></img>
//             </a>
//             <a href={user.blog}>
//               <img src={blogIcon}></img>
//             </a>
//           </LinkButtons> */}
//         </Profile>
//       </Container>
//     </>
//   );
// };

// export default EditSideProfile;

// import React, { useRef, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
// import Content from "./Content.styled";
// // import githubIcon from "../../static/images/githubIcon.png";
// // import blogIcon from "../../static/images/blogIcon.png";
// // import { editProfileImage } from "../../features/user/userSlice";
// // import { useEffect } from "react";
// // import { editProfile } from "../../features/user/userSlice";

// const Container = styled(Content)`
//   grid-column: 2/ 5;
//   display: grid;
//   height: 400px;
//   position: relative;
//   background-color: pink;
//   grid-template-columns: repeat(5, 1fr);
// `;

// const Profile = styled(Content)`
//   grid-column: 2/ 5;
//   height: 400px;
//   position: relative;
//   background-color: white;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
// `;
// const ProfileImage = styled.img`
//   border-radius: 100px;
//   width: 150px;
//   higth: 150px;
//   margin-top: 15px;
//   border: 5px solid #c593fe;
// `;

// const Button = styled.button`
//   margin-top: 15px;
//   border-radius: 10px;
//   padding: 5px 10px;
//   background-color: #c593fe;
// `;

// // const LinkButtons = styled.div`
// //   margin-top: 20px;
// //   display: flex;
// //   img {
// //     width: 3vh;
// //   }
// //   a {
// //     margin-left: 5px;
// //     margin-right: 5px;
// //   }
// // `;
// const EditSideProfile = () => {
//   // user.image
//   // const dispatch = useDispatch();
//   // const { user, isError, message } = useSelector((state) => state.user);
//   const [image, setImage] = useState("");
//   const fileInput = useRef(null);

//   const handleChangeImage = (e) => {
//     // e.preventDefault();
//     console.log(e.target.files[0]);
//     if (e.target.files[0]) {
//       // dispatch( {image: "https://i.ibb.co/nr4FYns/happydevil.png" });
//       setImage(e.target.files[0]);
//     } else {
//       // setImage(image);
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImage(reader.result);
//     };
//     reader.readAsDataURL(e.target.files[0]);
//   };
//   const onImgInputBtn = (e) => {
//     e.prevemtDefault();
//     fileInput.current.click();
//   };
//   //화면에 프로필 사진 표시
//   //   const reader = new FileReader();
//   //   reader.onload = () => {
//   //     if (reader.readyState === 2) {
//   //       setImage(reader.result);
//   //       console.log(reader.result);
//   //     }
//   //   };
//   //   reader.readAsDataURL(e.target.files[0]);
//   // };

//   // const handleClick = (e) => {
//   //   e.preventDefault();
//   //   const formdata = new FormData();
//   //   formdata.append("image", e.target.files[0]);
//   //   if (isError) {
//   //     console.log("editProfile.rejected :", message);
//   //   }
//   //   dispatch(editProfileImage({ id: user.id, formdata }));
//   //   console.log("id? :", user.id);
//   // };
//   // useEffect(() => {
//   //   preview();
//   //   return () => preview();
//   // });

//   // const preview = () => {
//   //   const reader = new FileReader();
//   //   reader.onload = () => {
//   //     setImage(reader.result);
//   //   };
//   //   reader.readAsDataURL(image);
//   // };
//   return (
//     <>
//       <Container>
//         <div>dsfsdfsfsdf</div>
//         <Profile>
//           <ProfileImage src={image} />
//           {/* <Button
//             onClick={() => {
//               fileInput.current.click();
//             }}
//           >
//             미리보기
//           </Button> */}
//           <form>
//             <input
//               type="file"
//               // style={{ display: "none" }}
//               //  image 확장자만 선택적
//               accept="image/jpg, image/jpeg, image/png"
//               name="profile_img"
//               onChange={handleChangeImage}
//               ref={fileInput}
//             />
//             {/* <label htmlFor="image">저장하기</label> */}
//             {/* <button type="submit" onClick={handleClick}>
//               저장하기
//             </button> */}
//           </form>

//           {/* <LinkButtons>
//             <a href={user.github}>
//               <img src={githubIcon}></img>
//             </a>
//             <a href={user.blog}>
//               <img src={blogIcon}></img>
//             </a>
//           </LinkButtons> */}
//         </Profile>
//       </Container>
//     </>
//   );
// };

// export default EditSideProfile;
