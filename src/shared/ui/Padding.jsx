import styled from "styled-components";

export const Padding = styled.div`
  ${({ $left, $right, $top, $bottom, $x, $y }) => {
    let finalStyles = "";

    if ($x)
      finalStyles += `
            padding-right: ${$x}rem;
            padding-left: ${$x}rem;
        `;

    if ($y)
      finalStyles += `
        padding-top: ${$y}rem;
        padding-bottom: ${$y}rem;
    `;
    if ($left)
      finalStyles += `
        padding-left: ${$left}rem;
    `;
    if ($right)
      finalStyles += `
        padding-right: ${$right}rem;
    `;
    if ($top)
      finalStyles += `
        padding-top: ${$top}rem;
    `;
    if ($bottom)
      finalStyles += `
        padding-bottom: ${$bottom}rem;
    `;

    return finalStyles;
  }}
`;
