import React from "react";
import { Box as DefaultBox } from 'theme-ui';

const Box = ({ ...restProps }) => {
  return <DefaultBox {...restProps} />;
};

export default Box;
