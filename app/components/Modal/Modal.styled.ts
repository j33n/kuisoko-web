import styled from "@emotion/styled";

import type { ModalAnimation } from "./Modal";
import { css } from "@emotion/react";
import * as keyframes from "./Keyframes.styled";

// Modal animations types
export const ModalAnimations = [
  "Unfolding",
  "Revealing",
  "Uncovering",
  "BlowUp",
  "MeepMeep",
  "Sketch",
  "Bond",
];

const {
  blowUpContent,
  blowUpContentTwo,
  blowUpModal,
  blowUpModalTwo,
  bondJamesBond,
  fadeIn,
  fadeOut,
  fadeToRed,
  killShot,
  modalContentFadeIn,
  modalContentFadeOut,
  modalFadeIn,
  modalFadeOut,
  moveDown,
  moveUp,
  quickScaleDown,
  roadRunnerIn,
  roadRunnerOut,
  scaleBack,
  scaleDown,
  scaleForward,
  scaleUp,
  sketchIn,
  sketchOut,
  slideDownLarge,
  slideUpLarge,
  slowFade,
  unfoldIn,
  unfoldOut,
  zoomIn,
  zoomOut,
} = keyframes;

export type StyledModalContainerProps = {
  modalAnimation: ModalAnimation,
  open: boolean,
}

export const StyledModalContainer = styled.div<StyledModalContainerProps>`
  position: fixed;
  /* display: table; */
  display: ${({ open }) => (open ? "table" : "none")};
  overflow: hidden;
  height: 100%;
  width: 100%;
  transform: scale(0);
  z-index: 1;
  background: red;
  max-height: 50vh;
  max-width: 50vw;
  background: ${({ theme: { colors } }) => colors.background};
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};

  ${({ modalAnimation }) =>
    modalAnimation === ModalAnimations[0] &&
    css`
      &.unfolding {
        transform: scaleY(0.01) scaleX(0);
        animation: ${unfoldIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        .modal-background {
          .modal {
            transform: scale(0);
            animation: ${zoomIn} 0.5s 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
          }
        }
        &.out {
          transform: scale(1);
          animation: ${unfoldOut} 1s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)
            forwards;
          .modal-background {
            .modal {
              animation: ${zoomOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
                forwards;
            }
          }
        }
      }
    `};

  ${({ modalAnimation }) =>
    modalAnimation === ModalAnimations[1] &&
    css`
      &.revealing {
        transform: scale(1);
        background: red;
        .modal-background {
          background: rgba(0, 0, 0, 0);
          animation: ${fadeIn} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
          .modal {
            opacity: 0;
            animation: ${scaleUp} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
          }
        }
        + .content {
          animation: ${scaleBack} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
            forwards;
        }
        &.out {
          animation: ${quickScaleDown} 0s 0.5s linear forwards;
          .modal-background {
            animation: ${fadeOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
            .modal {
              animation: ${scaleDown} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
                forwards;
            }
          }
          + .content {
            animation: ${scaleForward} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
          }
        }
      }
    `};

  ${({ modalAnimation }) =>
    modalAnimation === ModalAnimations[2] &&
    css`
      &.uncovering {
        z-index: 0;
        transform: scale(1);
        .modal-background {
          background: rgba(0, 0, 0, 0.6);
          .modal {
            animation: ${moveUp} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
          }
        }
        + .content {
          z-index: 1;
          animation: ${slideUpLarge} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
            forwards;
        }
        &.out {
          .modal-background {
            .modal {
              animation: ${moveDown} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
                forwards;
            }
          }
          + .content {
            animation: ${slideDownLarge} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
          }
        }
      }
    `};

  ${({ modalAnimation }) =>
    modalAnimation === ModalAnimations[3] &&
    css`
      &.blowup {
        z-index: 0;
        transform: scale(1);
        .modal-background {
          background: rgba(0, 0, 0, 0.7);
          .modal {
            animation: ${blowUpModal} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
          }
        }
        + .content {
          z-index: 1;
          animation: ${blowUpContent} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
            forwards;
        }
        &.out {
          .modal-background {
            .modal {
              animation: ${blowUpModalTwo} 0.5s
                cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
          }
          + .content {
            animation: ${blowUpContentTwo} 0.5s
              cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
          }
        }
      }
    `};

  ${({ modalAnimation }) =>
    modalAnimation === ModalAnimations[4] &&
    css`
      &.meepmeep {
        transform: scale(1);
        .modal-background {
          background: rgba(0, 0, 0, 0);
          animation: ${fadeIn} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
          .modal {
            transform: translateX(-1500px);
            animation: ${roadRunnerIn} 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
          }
        }
        &.out {
          animation: ${quickScaleDown} 0s 0.5s linear forwards;
          .modal-background {
            animation: ${fadeOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
            .modal {
              animation: ${roadRunnerOut} 0.5s
                cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
          }
        }
      }
    `};

  ${({ modalAnimation }) =>
    modalAnimation === ModalAnimations[5] &&
    css`
      &.sketch {
        transform: scale(1);
        .modal-background {
          background: rgba(0, 0, 0, 0);
          animation: ${fadeIn} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
          .modal {
            background-color: transparent;
            animation: ${modalFadeIn} 0.5s 0.8s
              cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            h2,
            p {
              opacity: 0;
              position: relative;
              animation: ${modalContentFadeIn} 0.5s 1s
                cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
            .modal-svg {
              rect {
                animation: ${sketchIn} 0.5s 0.3s
                  cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
              }
            }
          }
        }
        &.out {
          animation: ${quickScaleDown} 0s 0.5s linear forwards;
          .modal-background {
            animation: ${fadeOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
            .modal {
              animation: ${modalFadeOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
                forwards;
              h2,
              p {
                animation: ${modalContentFadeOut} 0.5s
                  cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
              }
              .modal-svg {
                rect {
                  animation: ${sketchOut} 0.5s
                    cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }
              }
            }
          }
        }
      }
    `};

  ${({ modalAnimation }) =>
    modalAnimation === ModalAnimations[6] &&
    css`
      &.bond {
        transform: scale(1);
        .modal-background {
          background: rgba(0, 0, 0, 0);
          animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
          .modal {
            /* TODO: To look into, consider using min-w, min-h  */
            height: 75px;
            width: 75px;
            border-radius: 75px;
            overflow: hidden;
            animation: ${bondJamesBond} 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
            h2,
            p {
              opacity: 0;
              position: relative;
              animation: ${modalContentFadeIn} 0.5s 1.4s linear forwards;
            }
          }
        }
        &.out {
          animation: ${slowFade} 0.5s 1.5s linear forwards;
          .modal-background {
            background-color: rgba(0, 0, 0, 0.7);
            animation: ${fadeToRed} 2s cubic-bezier(0.165, 0.84, 0.44, 1)
              forwards;
            .modal {
              border-radius: 3px;
              height: 162px;
              width: 227px;
              animation: ${killShot} 1s cubic-bezier(0.165, 0.84, 0.44, 1)
                forwards;
              h2,
              p {
                animation: ${modalContentFadeOut} 0.5s 0.5
                  cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
              }
            }
          }
        }
      }
    `};
`;

export const StyledModalBackground = styled.div`
  display: table-cell;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  vertical-align: middle;
`;

export const StyledModal = styled.div`
  background: white;
  padding: 1rem;
  display: inline-block;
  border-radius: 4px;
  font-weight: 300;
  position: relative;

  .modal-svg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 4px;

    rect {
      stroke: #fff;
      stroke-width: 2px;
      stroke-dasharray: 778;
      stroke-dashoffset: 778;
    }
  }
`;

export const StyledHeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.text};
`;

export const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

// Modal Footer
export const StyledModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.text};
`;

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.text};
`;
