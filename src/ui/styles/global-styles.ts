'use client';

import {createGlobalStyle} from 'styled-components';
import {normalize} from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  a:link, a:visited {
    text-decoration: none;
  }

  body {
    font-family: RIDIBatang, serif;
  }

  @font-face {
    font-family: RIDIBatang;
    src: url('/font/RIDIBatang.otf');
  }
`;

export default GlobalStyle;
