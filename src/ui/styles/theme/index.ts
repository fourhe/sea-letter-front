import * as colors from './colors';
import {media} from './media';
import opacity from './opacity';
import size from './size';
import typography from './typography';

export const enum ColorScheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export type Color<T extends ColorScheme> = Recursive<(typeof colors)[T]>;
export type Size = Recursive<typeof size>;
export type Media = Recursive<typeof media>;
export type Typography = Recursive<typeof typography>;
export type Opacity = Recursive<typeof opacity>;

export type Theme<T extends ColorScheme> = {
  color: Color<T>;
  size: Size;
  typography: Typography;
  opacity: Opacity;
  media: Media;
};

const themeWithoutColor: Omit<Theme<ColorScheme>, 'color'> = {
  size,
  opacity,
  typography,
  media,
};

const themeWithColorScheme: Record<ColorScheme, Theme<ColorScheme>> = {
  light: {color: colors.light, ...themeWithoutColor},
  dark: {color: colors.dark, ...themeWithoutColor},
};

export default themeWithColorScheme;
