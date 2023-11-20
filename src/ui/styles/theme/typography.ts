export const letterSpacings = {
  xs: -0.7,
  sm: -0.35,
  md: 0,
  lg: 0.35,
  xl: 0.7,
  '2xl': 1.4,
} as const;

export const lineHeights = {
  xs: 22,
  sm: 24,
  md: 26,
  lg: 28,
  xl: 30,
} as const;

export const fontWeights = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  bold: 700,
  black: 900,
} as const;

export const fontSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 24,
  xl: 26,
} as const;
const typography = {letterSpacings, lineHeights, fontWeights, fontSizes};
export default typography;
