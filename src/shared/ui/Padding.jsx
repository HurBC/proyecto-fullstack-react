import styled from "styled-components";

export const Padding = styled.div`
  ${({ $left, $right, $top, $bottom, $x, $y }) => {
    // Interpret numeric props as multiples of the spacing token --space-unit.
    // If a caller passes a string (like '8px'), we keep it as-is.
    const unit = 'var(--space-unit)';
    const toSpacing = (v) => (typeof v === 'number' ? `calc(${unit} * ${v})` : v);

    let finalStyles = "";

    if ($x)
      finalStyles += `
            padding-right: ${toSpacing($x)};
            padding-left: ${toSpacing($x)};
        `;

    if ($y)
      finalStyles += `
        padding-top: ${toSpacing($y)};
        padding-bottom: ${toSpacing($y)};
    `;
    if ($left)
      finalStyles += `
        padding-left: ${toSpacing($left)};
    `;
    if ($right)
      finalStyles += `
        padding-right: ${toSpacing($right)};
    `;
    if ($top)
      finalStyles += `
        padding-top: ${toSpacing($top)};
    `;
    if ($bottom)
      finalStyles += `
        padding-bottom: ${toSpacing($bottom)};
    `;

    return finalStyles;
  }}
`;
