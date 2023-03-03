import "@emotion/react";

import type { ColorModesScale, Theme as LibTheme } from "theme-ui";

declare module "@emotion/react" {
  export interface Theme extends LibTheme {
    colors: ColorModesScale;
    fontSizes: Scale<CSS.Property.FontSize<number>>;
    fontWeights: Scale<CSS.Property.FontWeight>;
  }
}
