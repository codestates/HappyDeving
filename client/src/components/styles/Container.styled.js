import styled from "styled-components";

const Container = styled.div`
  display: grid;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: repeat(14, 1fr);
  max-width: 970px;
  grid-gap: 10px;
  max-width: 100%;
  padding: 150px 2px;
  margin: 0 auto;
  position: relative;
  z-index: 0;
`;

export default Container;
