import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Text } from "theme-ui";

import { Link } from "@remix-run/react";

export const StyledStoresList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${({ theme: { colors } }) => colors.gray4};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.gray4};
  padding: 0.5rem 0;
  overflow: scroll;
  max-height: 50vh;
`;

export const StyledTitle = styled(Text)`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme: { colors } }) => colors.text};
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const StyledLink = css`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.5rem;
    height: 1.5rem;

    /* mobile size */
    @media (max-width: 480px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const Anchor = ({ theme: { colors, fontSizes } }: any) => css`
  display: flex;
  margin: 0 1rem;
  border-radius: 0.5rem;
  color: ${colors.text};
  font-weight: ${colors.fontWeight};
  font-size: ${fontSizes.xxs};
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 480px) {
    font-size: 0.75rem;
    margin: 0;
    text-overflow: ellipsis;
    width: 100%;
    white-space: nowrap;
  }
`;

export const StyledAnchor = styled.span`
  ${Anchor}
  white-space: nowrap;
`;

export const StyledMenuLink = styled.span`
  ${StyledLink}
`;

export const StyledLinkList = styled(Link)`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  cursor: pointer;
  padding: 0.5rem 0;
  align-items: center;

  &:hover {
    background: ${({ theme: { colors } }) => colors.buttonBgHover};

    a {
      visibility: visible !important;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.blue5};
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StyledAnchorStores = styled.span`
  ${Anchor}
  margin: 0;
  padding: 0 1rem;
  justify-content: flex-start;

  @media only screen and (max-width: 768px) {
    padding: 0;
    justify-content: center;
  }
`;

export const StyledLinkStores = styled.span`
  ${StyledLink}
  justify-content: flex-start;

  @media only screen and (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }

  @media only screen and (max-width: 425px) {
    font-size: 0.75rem;
  }
`;

export const StyledProfilePageLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 75%;
  height: 100%;
  cursor: pointer;
  padding-left: 0.5rem;

  &:hover {
    background: ${({ theme: { colors } }) => colors.buttonBgHover};
  }

  @media only screen and (max-width: 768px) {
    width: 45%;
  }
`;
