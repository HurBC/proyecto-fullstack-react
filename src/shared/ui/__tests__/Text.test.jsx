import { describe, expect, it } from "vitest";
import { Text } from "../Text";
import { render, screen } from "@testing-library/react";

const propsToStyles = (props) => {
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
    styles += `transition: ${t.property ?? "all"} ${t.duration ?? 0.3}s ${
      t.timingFunction ?? "ease"
    } ${t.delay ?? 0}s;`;
  }

  Object.entries(props).forEach(([key, value]) => {
    if (!key.startsWith("$")) return;
    if (
      [
        "$decoration",
        "$color",
        "$weight",
        "$family",
        "$size",
        "$cursor",
        "$align",
        "$transition",
        "$hover",
      ].includes(key)
    )
      return;
    let cssKey = key
      .slice(1)
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase();
    styles += `${cssKey}: ${value};`;
  });
  return styles;
};

// Describe permite agrupar diferentes test
describe("propsToStyles_test", () => {
  it("Return a empty string if the props are invalid", () => {
    expect(propsToStyles(null)).toBe("");
    expect(propsToStyles(undefined)).toBe("");
    expect(propsToStyles(2)).toBe("");
    expect(propsToStyles("hello")).toBe("");
  });

  it("Must apply styles correctly", () => {
    const styles = propsToStyles({
      $decoration: "underline",
      $color: "red",
      $weight: "bold",
      $family: "Arial",
      $size: 1.5,
      $cursor: "pointer",
      $align: "center",
    });

    expect(styles).toContain("text-decoration: underline;");
    expect(styles).toContain("color: red;");
    expect(styles).toContain("font-weight: bold;");
    expect(styles).toContain("font-family: Arial;");
    expect(styles).toContain("font-size: 1.5rem;");
    expect(styles).toContain("cursor: pointer;");
    expect(styles).toContain("text-align: center;");
  });

  it('debería aplicar estilos de transición correctamente', () => {
    const styles = propsToStyles({
      $transition: { property: 'opacity', duration: 0.5, timingFunction: 'linear', delay: 0.1 }
    });

    expect(styles).toContain('transition: opacity 0.5s linear 0.1s;');

    const defaultTransitionStyles = propsToStyles({
      $transition: {}
    });

    expect(defaultTransitionStyles).toContain('transition: all 0.3s ease 0s;');
  });

  it('Must apply only styles with the prefix $', () => {
    const styles = propsToStyles({
      $backgroundColor: 'blue',
      $borderRadius: '5px',
      $zIndex: 10,
    });
    expect(styles).toContain('background-color: blue;');
    expect(styles).toContain('border-radius: 5px;');
    expect(styles).toContain('z-index: 10;');
  });

  it('Should ignore props without $ prefix', () => {
    const styles = propsToStyles({
      $color: 'red',
      backgroundColor: 'green',
      $transition: { duration: 0.5 },
    });
    expect(styles).toContain('color: red;');
    expect(styles).toContain('transition: all 0.5s ease 0s;');
    expect(styles).not.toContain('background-color: green;');
  });
});

describe("Text component", () => {
  it("Must render a paraph", () => {
    render(<Text>Text Component Test</Text>)

    const element = screen.getByText("Text Component Test");

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P');
  })

  it("Must render a header 1 with the default margin", () => {
    render(<Text as="h1">Text Component Test</Text>)

    const element = screen.getByText("Text Component Test");

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H1');
  })

  it('Must apply 2rem font-size', () => {
    render(<Text $size={2}>Big Text</Text>);
    const textElement = screen.getByText('Big Text');
    expect(textElement).toHaveStyle('font-size: 2rem;');
  });

  it('Must apply transitions properties', () => {
    render(<Text $transition={{ duration: 1, property: 'color' }}>Transition</Text>);
    const textElement = screen.getByText('Transition');
    expect(textElement).toHaveStyle('transition: color 1s ease 0s;');
    expect(textElement).toHaveTextContent("Transition");
  });

  it('Must combine multiple styles', () => {
    render(
      <Text $margin="5px" $color="green" $size={1.2} $weight="500">
        Multiples styles text
      </Text>
    );
    const textElement = screen.getByText('Multiples styles text');
    expect(textElement).toHaveStyle('margin: 5px;');
    expect(textElement).toHaveStyle('font-size: 1.2rem;');
    expect(textElement).toHaveStyle('font-weight: 500;');
    
    // With styled components the color they become their RGB representation.
    expect(textElement).toHaveStyle('color: rgb(0, 128, 0);');
  });
})
