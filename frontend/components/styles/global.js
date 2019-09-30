import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('${(props) => props.theme.primaryFontSource}');
  @import url('${(props) => props.theme.logoFontSource}');

  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: ${(props) => props.theme.primaryFontFamily};
    font-display: fallback;
  }
  a {
    text-decoration: none;
    color: ${(props) => props.theme.black};
  }
`;

export default GlobalStyle;
