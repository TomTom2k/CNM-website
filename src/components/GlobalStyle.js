import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-60: #e0e8ef;
    --color-30: #0091ff;
    --color-10: #1A73E8;
    --blue-message: #e5efff;
    --white-message: #fff;
    --text-primary: #081c36;
    --button-tertiary-neutral-hover: #dfe2e7;
    --button-tertiary-primary-text: #0068ff;
    --border: #d6dbe1;
    --border-focused: #0068ff;
    --button-neutral-text: #081c36;
    --color-10: #91caee;
    --color-11: #dce1e8;
  }

  * {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
