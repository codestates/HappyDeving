import React from "react";
// import { gitSignin, kakaoSignin } from "./features/user/userSlice";
// import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Container from "../src/components/styles/Container.styled";
import Header from "../src/components/styles/Header.styled";
import { Search } from "../src/components/styles/Search.styled";
// import Footer from "../src/components/styles/Footer.styled";
import Landing from "./pages/Landing";
import Write from "././components/styles/WriteStudyDesc.styled";
import Map from "././components/styles/Map.styled";
import Study from "./components/styles/StudyDesc.styled";
import MyStudy from "./pages/MyStudy";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import LikedStudy from "./pages/LikedStudy";
import EditStudyDesc from "./components/styles/EditStudyDesc.styled";
import EditSideProfile from "./components/styles/EditSideProfile.styled";
import "./static/fonts/font.css";
import "./App.css";
import "./static/fonts/font.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Slider from "./components/Slider";
// import axios from "axios";
import landing_01 from "../src/assets/AdobeStock_434132331.jpeg";
import landing_02 from "../src/assets/AdobeStock_340974671.jpeg";
import landing_03 from "../src/assets/AdobeStock_347708874.jpeg";
import "./App.css";

function App() {
  const theme = {
    colors: {
      purple: "#5E17EB",
      lavender: "#C593FE",
      bg: "#d8e4f4",
    },
    icons: {
      logo: "https://cdn.discordapp.com/attachments/965506579564732419/967356348390076427/happylogo2.png",
      write: "https://cdn.discordapp.com/attachments/965506579564732419/968872695011885076/7.png",
      login: "https://cdn.discordapp.com/attachments/965506579564732419/968872695255142420/8.png",
      mypage: "https://cdn.discordapp.com/attachments/965506579564732419/969043355067617321/9.png",
    },
    contents: {
      marginBottom: "20px",
      bg: "white",
      borderRadius: "30px",
      boxShadow: "10px 5px 15px 0.1px rgba(0, 0, 0, 0.1)",
    },
    font: {},
  };

  // const getAccessToken = async (authorizationCode) => {
  //   let resp = await axios.post("https://server.happydeving.com/users/login/kakao", {
  //     authorizationCode: authorizationCode,
  //   });
  //   console.log(resp);
  // };

  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   console.log(url);

  //   const authorizationCode = url.searchParams.get("code");
  //   if (authorizationCode) {
  //     if (localStorage.getItem("login") === "git") {
  //       console.log("client auth git", authorizationCode);
  //       dispatch(gitSignin(authorizationCode));
  //     } else if (localStorage.getItem("login") === "kakao") {
  //       console.log("client auth kakao", authorizationCode);
  //       dispatch(kakaoSignin(authorizationCode));
  //     }
  //   }
  // });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container>
          <Header img={theme.icons} />

          <div className="App">
            <header className="App-header"></header>
          </div>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  {/* <Search /> */}
                  <Landing imageSrc={landing_01} />
                  <Slider
                    imageSrc={landing_02}
                    title={`" 위치 기반 검색 "`}
                    subtitle={"당신의 주변에서 일어나고 있는 놀라운 프로젝트를 찾아보세요."}
                  />
                  <Slider
                    imageSrc={landing_03}
                    title={`" 같이의 가치 "`}
                    subtitle={"당신의 드림 프로젝트, 함께 하면 현실이 됩니다."}
                    flipped={true}
                  />
                </>
              }
            />
            <Route path="/write" element={<Write />} />
            <Route
              path="/map"
              exact
              element={
                <>
                  <Search />
                  <Map />
                </>
              }
            />
            <Route path="/study/:id" element={<Study />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/study/edit/:id" element={<EditStudyDesc />} />
            <Route
              path="/editprofile"
              element={
                <>
                  <EditSideProfile />
                  <ProfileEdit />
                </>
              }
            />
            <Route path="/mystudy" element={<MyStudy />} />
            <Route path="/likedStudy" element={<LikedStudy />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          {/* <Footer /> */}
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
