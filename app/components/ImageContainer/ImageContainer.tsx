import styled from "@emotion/styled";
import React, { ReactNode } from "react";

export interface StyledImageContainerProps {
  align: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "center";
}

export const StyledImageContainer = styled.div<StyledImageContainerProps>`
  position: absolute;
  width: 100%;
  display: flex;

  ${({ align }) => {
    switch (align) {
      case "topLeft":
        return `
                align-items: flex-start;
                justify-content: flex-start;
                top: 0;
                left: 0;
            `;
      case "topRight":
        return `
                align-items: flex-start;
                justify-content: flex-end;
                top: 0;
                right: 0;
            `;
      case "bottomLeft":
        return `
                align-items: flex-end;
                justify-content: flex-start;
                bottom: 0;
                left: 0;
            `;
      case "bottomRight":
        return `
                align-items: flex-end;
                justify-content: flex-end;
                bottom: 0;
                right: 0;
            `;
      default:
        return `
                align-items: center;
                justify-content: center;
            `;
    }
  }}
`;

export interface IImageContainer {
  align: StyledImageContainerProps["align"];
  children: ReactNode;
}

export const ImageContainer = ({ children, align }: IImageContainer) => {
  return <StyledImageContainer align={align}>{children}</StyledImageContainer>;
};
