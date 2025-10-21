import styled, { css } from "styled-components";

// Wrapper uses the same $-prefixed prop convention as other UI components
const Wrapper = styled.div`
  font-size: 1rem;
  font-weight: bold;
  background: ${({ $background }) => ($background ? $background : "none")};
  border: ${({ $border }) => $border || "none"};
  border-radius: ${({ $radius }) => $radius || "0px"};
  box-shadow: ${({ $shadow }) => $shadow || "none"};
  transition: ${({ $transition }) =>
    $transition ||
    "none"};
  text-align: ${({ $textAlign }) => $textAlign || "center"};
  width: ${(p) => (p.$width ? p.$width : "auto")};
  height: ${(p) => (p.$height ? p.$height : "auto")};
  overflow: ${({ $overflow }) => $overflow || "hidden"};

  /* flex shorthand support via $flex */
  ${(p) =>
    p.$flex !== undefined &&
    css`
      flex: ${p.$flex};
    `}

  &:hover {
    ${({ $hover }) => $hover || ""}
  }

  /* allow injecting arbitrary css via $css */
  ${(p) => (p.$css ? css([p.$css]) : "")}
`;

export default Wrapper;
