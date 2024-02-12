import * as color from './colors';
import opacity from './opacity';
import size from './size';
import typography from './typography';

export type Color = Recursive<typeof color>;
export type Size = Recursive<typeof size>;
export type Typography = Recursive<typeof typography>;
export type Opacity = Recursive<typeof opacity>;

export type Theme = {
  color: Color;
  size: Size;
  typography: Typography;
  opacity: Opacity;
};

const themeWithoutColor: Omit<Theme, 'color'> = {
  size,
  opacity,
  typography,
};

const themeWithColorScheme = {
  color,
  ...themeWithoutColor,
};

export default themeWithColorScheme;
