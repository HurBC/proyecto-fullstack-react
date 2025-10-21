import React from "react";
import { Padding } from "../ui/Padding";
import Wrapper from "../ui/layout/Wrapper";
import { Row } from "../ui/layout/Row";

const Card = ({
  children,
  title,
  width,
  height,
  background,
  titlePos = "center",
  shadow,
  hover,
}) => {
  return (
    <Wrapper
      id="card"
      $width={width}
      $height={height}
      $background={background}
      $border="1px solid var(--color-border)"
      $radius="1.25rem"
      $shadow={shadow ? "0 6px 24px rgba(0, 0, 0, 0.18)" : "none"}
      $transition="transform 0.18s cubic-bezier(.4,2,.3,.7), box-shadow 0.18s cubic-bezier(.4,2,.3,.7)"
      $overflow="hidden"
      $hover={hover}
    >
      <Padding $y={1.5} $x={0.75}>
        <Row $alignItems="center" $justify={titlePos}>
          {title && React.isValidElement(title) ? title : <h1>{title}</h1>}
        </Row>
        {children}
      </Padding>
    </Wrapper>
  );
};

export default React.memo(Card);
