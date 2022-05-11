import styled from "styled-components";

const Content = styled.div`
  /* background-color: ${(props) => props.theme.contents.bg}; */
  margin-bottom: ${(props) => props.theme.contents.marginBottom};
  /* border-radius: ${(props) => props.theme.contents.borderRadius}; */
  /* box-shadow: ${(props) => props.theme.contents.boxShadow}; */
  position: relative;
  z-index: 0;
  min-height: 100%;
`;

export default Content;
