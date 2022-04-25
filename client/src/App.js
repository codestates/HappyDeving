import React from "react";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import Container from "../src/components/styles/Container.styled";
import Header from "../src/components/styles/Header.styled";
import Search from "../src/components/styles/Search.styled";
import Section from "../src/components/styles/Section.styled";
import Footer from "../src/components/styles/Footer.styled";
import SigninModal from "./components/styles/SigninModal.styled";
import SignupModal from "./components/styles/SignupModal.styled";
// import "./static/fonts/font.css";

const theme = {
  colors: {
    purple: "#5E17EB",
    lavender: "#C593FE",
    bg: "#d8e4f4",
  },
  logo: "https://cdn.discordapp.com/attachments/965506579564732419/967356348390076427/happylogo2.png",
  contents: {
    marginBottom: "15px",
    bg: "rgb(252, 252, 239)",
    borderRadius: "30px",
    boxShadow: "10px 5px 15px 0.1px rgba(0, 0, 0, 0.1)",
  },
  font: {},
};

function App() {
  const { signinModal, signupModal } = useSelector((store) => store.modal);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        {signinModal ? <SigninModal /> : null}
        {signupModal ? <SignupModal /> : null}
        <Search />
        <Section />
        {/* <Map /> */}
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
