import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 100px;
  background-color: ${({ theme: { colors } }) => colors.background};
`;

export interface IFooter {
  children: React.ReactNode;
}

const Footer = ({ children, ...restProps }: IFooter) => {
  return <StyledFooter {...restProps}>{children}</StyledFooter>;
};

export default Footer;
