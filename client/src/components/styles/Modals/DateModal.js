import styled from "styled-components";
import Content from "../Content.styled";

const DateModal = styled(Content)`
  grid-column: 5/11;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /* align-items: center; */
  margin: 5% auto;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export default DateModal;
