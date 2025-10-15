import styled from "styled-components";
import { propsToStyles } from "../_utils";

export const Text = styled.p`
  ${(props) => propsToStyles(props)}
`;
