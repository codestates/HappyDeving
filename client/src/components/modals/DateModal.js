import styled from "styled-components";

const DateModal = styled.div`
  grid-column: 5/11;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  box-shadow: ${(props) => props.theme.contents.boxShadow};

  /* align-items: center; */
  margin: 0 auto;
  position: absolute;
  z-index: 10;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export default DateModal;
