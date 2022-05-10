import styled from "styled-components";
import Content from "../Content.styled";

const LocationModal = styled(Content)`
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  font-family: "Medium";
  z-index: 10;

  @media screen and (max-width: 768px) {
    height: 100vh;
  }
  grid-column: 2/8;

  min-height: 7vw;
  max-height: 12vw;
  overflow: scroll;
  box-shadow: ${(props) => props.theme.contents.boxShadow};

  > input {
    height: 90%;
    width: 90%;
    margin: 0 auto;
    border-radius: 30px;
    background-color: lightgray;
    box-shadow: ${(props) => props.theme.contents.boxShadow};
    position: absolute;
    z-index: 30;
    opacity: 80%;
    text-align: center;
    caret-color: ${(props) => props.theme.colors.purple};

    &:focus {
      outline: none;
    }
  }
`;

export default LocationModal;
