import React, { ReactNode } from "react";
import styled from "styled-components";

import Box from "./Box/Box";

export interface IHeader {
  title: string;
  children?: ReactNode;
}

const Container = styled(Box)`
  padding: 16px;
  font-size: 14px;
  line-height: 1.5;
  margin: 1.5rem 0;
  background-color: ${({ theme: { colors } }) => colors.background};
`;

const Header = ({ children, title, ...restProps }: IHeader) => {
  return (
    <Container {...restProps}>
      {/* <head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head> */}
      {children}
    </Container>
  );
};

export default Header;
