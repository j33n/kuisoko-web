import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styled from "@emotion/styled";
import { contentShow, overlayShow } from "../Dialog/Dialog.styled";
import { StyledFocus } from "../Button/Button.styled";

export const StyledAlertDialogOverlay = styled(AlertDialog.Overlay)`
  background-color: ${({ theme: { colors } }) => colors.blackA9};
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const StyledAlertDialogContent = styled(AlertDialog.Content)`
  background-color: ${({ theme: { colors } }) => colors.background};
  border-radius: 0.5rem;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 1.5rem;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;

  ${StyledFocus};
`;

export const StyledAlertDialogTitle = styled(AlertDialog.Title)`
  margin: 0;
  color: ${({ theme: { colors } }) => colors.gray4};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxs};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
`;

export const StyledAlertDialogDescription = styled(AlertDialog.Description)`
  margin-bottom: 20px;
  color: ${({ theme: { colors } }) => colors.crimson9};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xls};
  line-height: 1.5;
`;
