import styled, { css } from "styled-components";
import { layoutStyles } from "./layoutStyles";

// Column accepts props:
// - $reverse (boolean): when true, use column-reverse
// - $size (string|number): value for the flex shorthand (e.g. "1", "0 1 auto", 1)
// - $wrap (boolean|string): if true, applies `flex-wrap: wrap`; can also pass 'nowrap' or 'wrap-reverse'
export const Column = styled.div`
    display: flex;
    flex-direction: ${(p) => (p.$reverse ? "column-reverse" : "column")};
    ${(p) => p.$size !== undefined && css`flex: ${p.$size};`}
    ${layoutStyles}
`;
