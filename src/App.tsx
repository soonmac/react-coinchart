import React, { useState } from "react";
import styled from "styled-components";
import { isPropertySignature } from "typescript";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <Container>
      <H1>프로텍터</H1>
    </Container>
  );
}

export default App;
