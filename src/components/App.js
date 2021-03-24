import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ maxHeight: "100vh" }}
    >
      <div style={{ maxWidth: "350px" }}>
        <Signup />
      </div>
    </Container>
  );
}

export default App;
