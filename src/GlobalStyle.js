import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Apply theme background and text color to body */
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.primaryBackground};
    color: ${({ theme }) => theme.primaryText};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow: hidden; /* disables scroll and hides scrollbar */
  }

  /* Remove scrollbars completely (even if scroll is enabled) */
  ::-webkit-scrollbar {
    display: none;
  }

  /* For Firefox */
  html {
    scrollbar-width: none; /* hides scrollbar in Firefox */
  }
`;

export default GlobalStyle;
