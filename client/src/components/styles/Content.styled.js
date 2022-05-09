import styled from "styled-components";

const Content = styled.div`
  background-color: white;
  border-radius: ${(props) => props.theme.contents.borderRadius};
  position: relative;
`;

export default Content;
