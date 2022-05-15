import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Container from "./components/styles/Container.styled";
import Header from "./components/styles/Header.styled";
import { Search } from "./components/styles/Search.styled";
import Footer from "./components/styles/Footer.styled";
import Landing from "./pages/Landing";
import Write from "./components/styles/WriteStudyDesc.styled";
import Map from "./components/styles/Map.styled";
import Study from "./components/styles/StudyDesc.styled";
import MyStudy from "./pages/MyStudy";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import LikedStudy from "./pages/LikedStudy";
import EditStudyDesc from "./components/styles/EditStudyDesc.styled";
import "./static/fonts/font.css";
import "./App.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "./App.css";
import axios from "axios";
import { Github_url } from "./config";
import WriteButtonModal from "./WriteButtonModal.styled";
import BottomMenu from "./components/styles/bottommenu.styled";
// import Content from "./components/styles/Content.styled";
import ConfirmModal from "./components/styles/Modals/ConfirmModal";
import landing_01 from "../src/assets/landing1.png";
import GlobalFonts from "./fonts/fonts";

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
      borderRadius: "20px",
      boxShadow: "10px 5px 15px 0.1px rgba(0, 0, 0, 0.1)",
    },
    size: {
      mobile: "520px",
      tablet: "768px",
      desktop: "1024px",
    },
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalFonts />
        <Header img={theme.icons} />
        <Container>
          <ConfirmModal />
          <div className="App">
            <header className="App-header"></header>
          </div>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <Landing imageSrc={landing_01} />
                  <WriteButtonModal />
                </>
              }
            />
            <Route path="/write" element={<Write />} />
            <Route
              path="/map"
              exact
              element={
                <>
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
                  <ProfileEdit />
                </>
              }
            />
            <Route path="/mystudy" element={<MyStudy />} />
            <Route path="/likedStudy" element={<LikedStudy />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <BottomMenu />
        </Container>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
