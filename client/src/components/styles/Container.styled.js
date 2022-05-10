import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(14, 40px);
  width: 100%;
  height: 100vh;
  padding-top: 80px;
  margin: 0 auto;
  /* background-color: #d8e4f4; */

  position: relative;
  z-index: 0;
`;

export default Container;
