export const white = '#FFFFFF' as const;
export const black = '#000000' as const;

export const green = {
  50: '#EAF7F6',
  100: '#B6D2D0',
  200: '#65B3AE',
  300: '#66CDAA',
  400: '#57D0CB',
  500: '#00CCBF',
  600: '#00B3A8',
  700: '#00988f',
} as const;

export const blue = {
  100: '#27AFCF',
  200: '#31a6ff',
  300: '#1c7cd0',
  400: '#4d6fd6',
  500: '#4337F5',
} as const;

export const yellow = {
  100: '#FACC10',
  200: '#FFA500',
  300: '#FA9848',
} as const;

export const pink = {
  100: '#ffe9e9',
  200: '#f578b6',
  300: '#f16ca2',
  400: '#ff72ab',
  500: '#db12ed',
} as const;

export const purple = {
  100: '#B463C9',
  200: '#BA55D3',
  300: '#6A5ACD',
} as const;

export const red = {
  100: '#EB7051',
  200: '#F17274',
  300: '#FA4B6A',
  400: '#E44662',
  500: '#E63D22',
  600: '#E73F24',
} as const;

export const gray = {
  100: '#EAEAEA',
  200: '#C9C9C9',
  300: '#BABABA',
  400: '#979ca4',
  500: '#808080',
  600: '#3A3C40',
} as const;

export const text = {
  0: '#FFFFFF',
  100: '#EBEBEB',
  200: '#A0A0A0',
  300: '#909090',
  400: '#808080',
  500: '#616161',
  600: '#595B60',
  700: '#282C34',
} as const;

export const content = {
  0: '#FFFFFF',
  100: '#F5F5F5',
  200: '#F0F0F0',
  300: '#EAEAEA',
  400: '#CFCFCF',
  500: '#B2B2B2',
  600: '#ACACAC',
  700: '#8C8F94',
  800: '#6D7075',
} as const;

export const box = {
  0: '#FFFFFF',
  100: '#EAEAEA',
  200: '#E2E2E2',
  300: '#282C34',
  400: '#282C34',
} as const;

export const toggle = {
  0: '#FFFFFF',
  100: '#E5E2E1',
} as const;

export const error = {
  50: '#ffe4e4',
  100: '#feb4b4',
  200: '#fb8383',
  300: '#f95352',
  400: '#f82721',
  500: '#de1409',
  600: '#ad0d06',
  700: '#7c0604',
  800: '#4b0101',
  900: '#1d0000',
} as const;

export const neutral = {
  100: '#F5F5F5',
  200: '#E9E9E9',
  300: '#C4C4C4',
  400: '#9D9D9D',
  500: '#7B7B7B',
  600: '#555555',
  700: '#434343',
  800: '#262626',
  900: '#000000',
} as const;

export const primary = {
  lemonCream: '#FFFDE7',
  'light-pink': '#F1D4DC',
  'bg-pink': '#E7A8BB',
  'point-pink': '#D5708E',
} as const;

export const secondary = {
  brown: '#CA9C8F',
  'light-brown': '#F4E5E1',
  beige: '#FCFAF2',
} as const;

export const yellowGray = {
  700: '#43413B',
} as const;

const light = {
  white,
  black,
  neutral,
  primary,
  secondary,
  yellowGray,
  green,
  blue,
  yellow,
  pink,
  purple,
  red,
  gray,
  text,
  content,
  box,
  toggle,
  error,
};

export default light;
