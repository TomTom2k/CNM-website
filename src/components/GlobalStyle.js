import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-60: #e0e8ef;
    --color-30: #0091ff;
    --color-10: #1A73E8;
    --blue-message: #e5efff;
    --white-message: #fff;
    --text-primary: #081c36;
  }

  * {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
