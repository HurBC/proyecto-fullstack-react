import styled from "styled-components";
import React from "react";
import {Padding} from "../ui/Padding"

const Wrapper = styled.div`
  font-size: 1rem;
  font-weight: bold;
  background-color: ${(props) =>
    props.$primary ? "var(--color-surface)" : "white"};
  border: 1px solid var(--color-border);
  border-radius: 8px;
`;

const Card = ({ children, primary, title }) => {
  return (
    <Wrapper $primary={primary}>
      <Padding $y={1.5} $x={0.75}>
        {title && React.isValidElement(title) ? title : <h1>{title}</h1>}
        {children}
      </Padding>
    </Wrapper>
  );
};

export default React.memo(Card);
