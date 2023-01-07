import styled from "styled-components";

export interface IStyledContainer {
  height?: string;
  width?: string;
  bgColor?: string;
}

export const StyledContainer = styled.div<IStyledContainer>`
  height: ${(props) => props.height || "100%"};
  width: ${(props) => props.width || "100%"};
  background: ${(props) => props.bgColor || "#f9f7f5"};
`;
