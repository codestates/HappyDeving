import styled from "styled-components";
import Content from "../Content.styled";

const LanguageModal = styled(Content)`
  grid-column: 8/14;
  position: relative;
  z-index: 10;

  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 90%;
    height: 90%;
    margin: 5% auto;
    border: none;

    > img {
      display: block;
      border-radius: 50%;
      padding: 1%;
      width: 25%;
      height: 25%;
      margin: 4%;

      &:hover {
        box-shadow: ${(props) => props.theme.contents.boxShadow};
        cursor: pointer;
      }
      &:active {
        box-shadow: 10px 5px 15px 0.1px rgba(0, 0, 0, 0.5);
      }
    }
  }
`;

export default LanguageModal;
