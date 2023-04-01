// GlobalStyle.jsx

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  body {  
    margin: 0;
    background-color: #f9f9f9;
    font-family: "Inter", sans-serif;
  }
  
  ::-webkit-scrollbar {
    display: none;

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export default GlobalStyle;
