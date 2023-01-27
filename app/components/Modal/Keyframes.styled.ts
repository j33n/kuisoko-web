import { keyframes } from "@emotion/react";

export const unfoldIn = keyframes`
    0% {
      transform: scaleY(0.005) scaleX(0);
    }
    50% {
      transform: scaleY(0.005) scaleX(1);
    }
    100% {
      transform: scaleY(1) scaleX(1);
    }
  `;

export const unfoldOut = keyframes`
    0% {
      transform: scaleY(1) scaleX(1);
    }
    50% {
      transform: scaleY(0.005) scaleX(1);
    }
    100% {
      transform: scaleY(0.005) scaleX(0);
    }
  `;

export const zoomIn = keyframes`
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
    `;

export const zoomOut = keyframes`
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  `;

export const fadeIn = keyframes`
    0% {
      background: rgba(0, 0, 0, 0);
    }
    100% {
      background: rgba(0, 0, 0, 0.7);
    }
  `;

export const fadeOut = keyframes`
    0% {
      background: rgba(0, 0, 0, 0.7);
    }
    100% {
      background: rgba(0, 0, 0, 0);
    }
  `;

export const scaleUp = keyframes`
    0% {
      transform: scale(0.8) translateY(1000px);
      opacity: 0;
    }
    100% {
      transform: scale(1) translateY(0px);
      opacity: 1;
    }
  `;

export const scaleDown = keyframes`
    0% {
      transform: scale(1) translateY(0px);
      opacity: 1;
    }
    100% {
      transform: scale(0.8) translateY(1000px);
      opacity: 0;
    }
  `;

export const scaleBack = keyframes`
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.85);
    }
  `;

export const scaleForward = keyframes`
    0% {
      transform: scale(0.85);
    }
    100% {
      transform: scale(1);
    }
  `;

export const quickScaleDown = keyframes`
    0% {
      transform: scale(1);
    }
    99.9% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  `;

export const slideUpLarge = keyframes`
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-100%);
    }
  `;

export const slideDownLarge = keyframes`
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  `;

export const moveUp = keyframes`
    0% {
      transform: translateY(150px);
    }
    100% {
      transform: translateY(0);
    }
  `;

export const moveDown = keyframes`
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(150px);
    }
  `;

export const blowUpContent = keyframes`
    0% {
      transform: scale(1);
      opacity: 1;
    }
    99.9% {
      transform: scale(2);
      opacity: 0;
    }
    100% {
      transform: scale(0);
    }
  `;

export const blowUpContentTwo = keyframes`
    0% {
      transform: scale(2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  `;

export const blowUpModal = keyframes`
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  `;

export const blowUpModalTwo = keyframes`
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  `;

export const roadRunnerIn = keyframes`
    0% {
      transform: translateX(-1500px) skewX(30deg) scaleX(1.3);
    }
    70% {
      transform: translateX(30px) skewX(0deg) scaleX(0.9);
    }
    100% {
      transform: translateX(0px) skewX(0deg) scaleX(1);
    }
  `;

export const roadRunnerOut = keyframes`
    0% {
      transform: translateX(0px) skewX(0deg) scaleX(1);
    }
    30% {
      transform: translateX(-30px) skewX(-5deg) scaleX(0.9);
    }
    100% {
      transform: translateX(1500px) skewX(30deg) scaleX(1.3);
    }
  `;

export const sketchIn = keyframes`
    0% {
      stroke-dashoffset: 778;
    }
    100% {
      stroke-dashoffset: 0;
    }
  `;

export const sketchOut = keyframes`
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: 778;
    }
  `;

export const modalFadeIn = keyframes`
    0% {
      background-color: transparent;
    }
    100% {
      background-color: white;
    }
  `;

export const modalFadeOut = keyframes`
    0% {
      background-color: white;
    }
    100% {
      background-color: transparent;
    }
  `;

export const modalContentFadeIn = keyframes`
    0% {
      opacity: 0;
      top: -20px;
    }
    100% {
      opacity: 1;
      top: 0;
    }
  `;

export const modalContentFadeOut = keyframes`
    0% {
      opacity: 1;
      top: 0px;
    }
    100% {
      opacity: 0;
      top: -20px;
    }
  `;

export const bondJamesBond = keyframes`
    0% {
      transform: translateX(1000px);
    }
    80% {
      transform: translateX(0px);
      border-radius: 75px;
      height: 75px;
      width: 75px;
    }
    90% {
      border-radius: 3px;
      height: 182px;
      width: 247px;
    }
    100% {
      border-radius: 3px;
      height: 162px;
      width: 227px;
    }
  `;

export const killShot = keyframes`
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(300px) rotate(45deg);
      opacity: 0;
    }
  `;

export const fadeToRed = keyframes`
    0% {
      background-color: rgba(black, 0.6);
    }
    100% {
      background-color: rgba(red, 0.8);
    }
  `;

export const slowFade = keyframes`
    0% {
      opacity: 1;
    }
    99.9% {
      opacity: 0;
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  `;
