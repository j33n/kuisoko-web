import styled from "@emotion/styled";
import { Form } from "@remix-run/react";
import type { StyledTheme } from "~/styles/page.styled";

export const StyledCreateStore = styled.div<StyledTheme>`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

export const StyledImg = styled.img<StyledTheme>`
  max-height: 300px;
  opacity: 0.7;
`;

export const StyledForm = styled(Form)<StyledTheme>`
  width: 50%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    margin: 0.5rem;
  }
`;

export const StyledBtnContainer = styled.div<StyledTheme>`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const StyledTitle = styled.div<StyledTheme>`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
  font-weight: 200;
  text-transform: uppercase;
`;

export const StyledImageHolder = styled.div<StyledTheme>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  background-color: ${({ theme: { colors } }) => colors.buttonBgHover};
  border-radius: 0.5rem;
  padding: 0.5rem;

  img {
    max-width: 5rem;
  }
`;

export const StyledInputHolder = styled.div<StyledTheme>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;

export const StyledImageWrapper = styled.div<StyledTheme>`
  height: 300px;
  overflow: hidden;
  border-radius: 1rem;
  border: ${({ theme: { colors } }) => `1px solid ${colors.buttonBgHover}`};
  cursor: pointer;
  padding: 1rem;

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;

export const StyledImgNew = styled.img<StyledTheme>`
  object-fit: cover;
  transition: transform 0.8s;
  height: 100%;
`;