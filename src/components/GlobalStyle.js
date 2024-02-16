import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #1A73E8;
    --secondary: #e0e8ef;
  }

  * {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
