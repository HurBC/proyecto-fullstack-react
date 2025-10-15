import styled from "styled-components";

export const Row = styled.div`
    display: flex;
    ${({ $gap, $gapX, $gapY, $alignItems, $justify }) => {
        let finalStyles = "";

        if ($gap) 
            finalStyles += `gap: ${$gap}rem;`;

        if ($gapX)
            finalStyles += `column-gap: ${$gapX}rem;`;

        if ($gapY)
            finalStyles += `row-gap: ${$gapY}rem;`;

        if ($alignItems) {
            switch ($alignItems) {
                case "center":
                    finalStyles += "align-items: center;";
                    break;
                case "start":
                    finalStyles += "align-items: flex-start;";
                    break;
                case "end":
                    finalStyles += "align-items: flex-end;";
                    break;
                case "stretch":
                    finalStyles += "align-items: stretch;";
                    break;
                default:
                    break;
            }
        }

        if ($justify) {
            switch ($justify) {
                case "center":
                    finalStyles += "justify-content: center;";
                    break;
                case "between":
                    finalStyles += "justify-content: space-between;";
                    break;
                case "around":
                    finalStyles += "justify-content: space-around;";
                    break;
                case "evenly":
                    finalStyles += "justify-content: space-evenly;";
                    break;
                case "start":
                    finalStyles += "justify-content: flex-start;";
                    break;
                case "end":
                    finalStyles += "justify-content: flex-end;";
                    break;
                default:
                    break;
            }
        }

        return finalStyles;
    }}
`;
