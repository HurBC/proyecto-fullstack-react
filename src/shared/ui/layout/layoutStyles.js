// Utilidad para generar estilos flexibles para flex y grid
export const layoutStyles = ({
  $gap,
  $gapX,
  $gapY,
  $alignItems,
  $justify,
  $direction,
  $wrap,
  $templateColumns,
  $templateRows,
  $autoFlow,
  $gridGap,
  $gridColumnGap,
  $gridRowGap,
  $placeItems,
  $placeContent,
  $alignContent,
}) => {
  let styles = "";

  if ($gap) styles += `gap: ${$gap}rem;`;
  if ($gapX) styles += `column-gap: ${$gapX}rem;`;
  if ($gapY) styles += `row-gap: ${$gapY}rem;`;
  if ($direction) styles += `flex-direction: ${$direction};`;
  // $wrap can be boolean (true -> 'wrap') or a string like 'wrap' | 'nowrap' | 'wrap-reverse'
  if ($wrap !== undefined) {
    if ($wrap === true) styles += `flex-wrap: wrap;`;
    else if ($wrap === false) {
      /* explicit false -> no wrap style */
    } else styles += `flex-wrap: ${$wrap};`;
  }

  if ($alignItems) {
    switch ($alignItems) {
      case "center":
        styles += "align-items: center;";
        break;
      case "start":
        styles += "align-items: flex-start;";
        break;
      case "end":
        styles += "align-items: flex-end;";
        break;
      case "stretch":
        styles += "align-items: stretch;";
        break;
      default:
        styles += `align-items: ${$alignItems};`;
    }
  }

  if ($justify) {
    switch ($justify) {
      case "center":
        styles += "justify-content: center;";
        break;
      case "between":
        styles += "justify-content: space-between;";
        break;
      case "around":
        styles += "justify-content: space-around;";
        break;
      case "evenly":
        styles += "justify-content: space-evenly;";
        break;
      case "start":
        styles += "justify-content: flex-start;";
        break;
      case "end":
        styles += "justify-content: flex-end;";
        break;
      default:
        styles += `justify-content: ${$justify};`;
    }
  }

  // Grid specific
  if ($templateColumns) styles += `grid-template-columns: ${$templateColumns};`;
  if ($templateRows) styles += `grid-template-rows: ${$templateRows};`;
  if ($autoFlow) styles += `grid-auto-flow: ${$autoFlow};`;
  if ($gridGap) styles += `grid-gap: ${$gridGap};`;
  if ($gridColumnGap) styles += `grid-column-gap: ${$gridColumnGap};`;
  if ($gridRowGap) styles += `grid-row-gap: ${$gridRowGap};`;
  if ($placeItems) styles += `place-items: ${$placeItems};`;
  if ($placeContent) styles += `place-content: ${$placeContent};`;
  if ($alignContent) styles += `align-content: ${$alignContent};`;

  return styles;
};
