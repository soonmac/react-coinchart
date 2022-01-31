import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;500&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
* {
  box-sizing: border-box;
}
body {
	line-height: 1;
  font-family: 'Inconsolata', monospace,'Roboto', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  line-height: 1.2;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
  text-decoration: none;
  color:inherit;
}
`;

const ToggleBtn = styled.button`
  border:none;
  background-color: transparent;
  font-size: 30px;
  position: absolute;
  top:10px;
  right:20px;
  cursor: pointer;
`;
const Container = styled.div`
  width: 480px;
  margin: 0 auto;
  position: relative;
`;

function App() {
  const [theme, setTheme] = useState("dark");
  const themeToggler = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Container>
        <ToggleBtn onClick={themeToggler}>
          {theme === "dark" ? (
            <FontAwesomeIcon icon={faSun} style={{color: "#f5f6fa"}} />
          ) : (
            <FontAwesomeIcon icon={faCloudMoon} style={{color: "#9c88ff"}} />
          )}
        </ToggleBtn>
        </Container>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
