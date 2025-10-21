import styled, { css } from "styled-components";
import { layoutStyles } from "./layoutStyles";

// Row accepts props:
// - $reverse (boolean): when true, use row-reverse
// - $size (string|number): value for the flex shorthand (e.g. "1", "0 1 auto", 1)
// - $wrap (boolean|string): if true, applies `flex-wrap: wrap`; can also pass 'nowrap' or 'wrap-reverse'
export const Row = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: ${(p) => (p.$reverse ? "row-reverse" : "row")};
    ${(p) => p.$size !== undefined && css`flex: ${p.$size};`}
    ${layoutStyles}
`;
