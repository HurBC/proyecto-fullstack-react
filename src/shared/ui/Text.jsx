
import styled from "styled-components";

// Convierte un objeto de props en un string de estilos CSS
const propsToStyles = (props) =>  {
  if (!props || typeof props !== "object") return "";
  let styles = "";
  if (props.$decoration) styles += `text-decoration: ${props.$decoration};`;
  if (props.$color) styles += `color: ${props.$color};`;
  if (props.$weight) styles += `font-weight: ${props.$weight};`;
  if (props.$family) styles += `font-family: ${props.$family};`;
  if (props.$size) styles += `font-size: ${props.$size}rem;`;
  if (props.$cursor) styles += `cursor: ${props.$cursor};`;
  if (props.$align) styles += `text-align: ${props.$align};`;
  if (props.$transition) {
    const t = props.$transition;
    styles += `transition: ${t.property ?? "all"} ${t.duration ?? 0.3}s ${t.timingFunction ?? "ease"} ${t.delay ?? 0}s;`;
  }
  
  Object.entries(props).forEach(([key, value]) => {
    if (!key.startsWith('$')) return;
    if (["$decoration","$color","$weight","$family","$size","$cursor","$align","$transition","$hover"].includes(key)) return;
    let cssKey = key.slice(1).replace(/([A-Z])/g, "-$1").toLowerCase();
    styles += `${cssKey}: ${value};`;
  });
  return styles;
}

export const Text = styled.p`
  ${({
    $margin = 0,
    $decoration,
    $color,
    $weight,
    $family,
    $size,
    $cursor,
    $align,
    $transition,
    $hover,
  }) => {
    return `
      margin: ${$margin};
      ${$decoration ? `text-decoration: ${$decoration};` : ""}
      ${$color ? `color: ${$color};` : ""}
      ${$weight ? `font-weight: ${$weight};` : ""}
      ${$family ? `font-family: ${$family};` : ""}
      ${$size ? `font-size: ${$size}rem;` : ""}
      ${$cursor ? `cursor: ${$cursor};` : ""}
      ${$align ? `text-align: ${$align};` : ""}
      ${$transition ? `transition: ${$transition.property ?? "all"} ${$transition.duration ?? 0.3}s ${$transition.timingFunction ?? "ease"} ${$transition.delay ?? 0}s;` : ""}
      ${$hover ? `&:hover { ${propsToStyles($hover)} }` : ""}
    `;
  }}
`;
