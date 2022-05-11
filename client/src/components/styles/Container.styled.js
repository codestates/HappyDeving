import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(14, 40px);
  /* max-width: 970px; */
  grid-gap: 10px;
  max-width: 100%;
  padding: 0 2px;
  margin: 0 auto;
  /* background-color: #d8e4f4; */
  /* min-height: 100%; */
  position: relative;
  z-index: 0;
`;

export default Container;
