import * as Dialog from "@radix-ui/react-dialog";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export interface IDialogContent {
  noPadding?: boolean;
  sx?: any;
}

export const overlayShow = keyframes`
  0% { opacity: 0 };
  100%: { opacity: 1 };
`;

export const contentShow = keyframes`
  0%: { opacity: 0, transform: translate(-50%, -48%) scale(.96) };
  100%: { opacity: 1, transform: translate(-50%, -50%) scale(1) };
`;

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: ${({ theme: { colors } }) => colors.blackA9};
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
`;

export const DialogContent = styled(Dialog.Content)<IDialogContent>`
  background-color: ${({ theme: { colors } }) => colors.background};
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
  border-radius: 0.5rem;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90vw;
  max-width: 450px;
  max-height: 60vh;
  padding: 1.5rem;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
  overflow: auto;

  &:focus {
    outline: "none";
  }
`;

export const DialogTitle = styled(Dialog.Title)`
  margin: 0,
  color: ${({ theme: { colors } }) => colors.crimson9};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
`;

export const DialogDescription = styled(Dialog.Description)`
  margin: 10px 0 20px;
  color: ${({ theme: { colors } }) => colors.gray9};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
  line-height: 1.5rem;
`;
