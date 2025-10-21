import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  /* Use spacing token so button spacing aligns with the rest of the UI */
  padding: calc(var(--space-unit) * 0.6667) calc(var(--space-unit) * 1.6667);
  border-radius: 0.5rem;
  background: var(--gradient-accent);
  color: var(--color-text-main);
  font-weight: bold;
  border: none;
  box-shadow: 0 6px 20px rgba(10, 20, 40, 0.6);
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s, box-shadow 0.2s, transform 0.12s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width};
    `}

  ${(props) =>
    props.$full &&
    css`
      width: 100%;
    `}

  &:hover {
    background: var(--gradient-accent-hover);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  $width,
  $full = false,
  className,
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      disabled={disabled}
      $width={typeof $width === "number" ? `${$width}px` : $width}
      $full={!!$full}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
