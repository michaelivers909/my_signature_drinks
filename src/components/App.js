import React from "react";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ maxHeight: "100vh" }}
    >
      <div style={{ maxWidth: "350px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path ="/" component={Dashboard}/>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
