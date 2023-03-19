import styled from "@emotion/styled";
import * as Tooltip from "@radix-ui/react-tooltip";

export const StyledTooltipContent = styled(Tooltip.Content)`
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 15px;
  line-height: 1;
  color: var(--violet11);
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  [data-state="delayed-open"][data-side="top"] {
    animation-name: slideDownAndFade;
  }

  [data-state="delayed-open"][data-side="right"] {
    animation-name: slideLeftAndFade;
  }

  [data-state="delayed-open"][data-side="left"] {
    animation-name: slideRightAndFade;
  }
`;

export const StyledTooltipArrow = styled(Tooltip.Arrow)`
    fill: white;
`;
