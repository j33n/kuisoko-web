import styled from "@emotion/styled";
import { Label } from "theme-ui";

export const StyledLabel = styled(Label)`
  display: flex;
  font-weight: ${({ theme: { colors } }) => colors.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  max-width: 10rem;
  align-items: center;
  font-size: 0.875rem;
  padding: 0.5rem 0;
`;

export interface ICustomLabel {
  htmlFor?: string;
  children?: React.ReactNode;
  className?: string;
  sx?: any;
}

const TextLabel = ({ children, ...props }: ICustomLabel) => {
  return <StyledLabel {...props}>{children}</StyledLabel>;
};

export default TextLabel;
