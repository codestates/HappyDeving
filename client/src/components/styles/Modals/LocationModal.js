import styled from "styled-components";
import Content from "../Content.styled";

const LocationModal = styled(Content)`
  grid-column: 2/8;
  width: 100%;
  position: absolute;
  box-sizing: content-box;
  font-family: "Medium";
  padding: 5% 5% 3% 5%;
  min-height: 7vw;
  max-height: 12vw;
  overflow: scroll;
  z-index: 10;
  box-shadow: ${(props) => props.theme.contents.boxShadow};

  > div {
    border-bottom: 1px solid beige;
    text-align: center;
    padding: 7%;

    &:hover {
      color: ${(props) => props.theme.colors.purple};
      cursor: pointer;
    }
  }
  > input {
    height: 5vw;
    width: 90%;
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
