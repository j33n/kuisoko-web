import React from "react";
import { Alert as DefaultAlert } from "theme-ui";

export interface IAlert {
  children: React.ReactNode;
}

const Alert = ({ children, ...restProps }: IAlert) => (
  <DefaultAlert {...restProps}>{children}</DefaultAlert>
);

export default Alert;
