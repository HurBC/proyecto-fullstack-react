export const propsToStyles = ({
    $decoration,
    $color,
    $weight,
    $family,
    $size,
    $cursor,
    $transition,
    $hover,
  } = {}) => {
    return `
      ${$decoration ? `text-decoration: ${$decoration};` : ""}
      ${$color ? `color: ${$color};` : ""}
      ${$weight ? `font-weight: ${$weight};` : ""}
      ${$family ? `font-family: ${$family};` : ""}
      ${$size ? `font-size: ${$size}rem;` : ""}
      ${$cursor ? `cursor: ${$cursor};` : ""}
      ${$transition ? `transition: ${$transition.property ?? "all"} ${$transition.duration ?? 0.3}s ${$transition.timingFunction ?? "ease"} ${$transition.delay ?? 0}s;` : ""}
      ${$hover ? `&:hover { ${propsToStyles($hover)} }` : ""}
    `;
  };