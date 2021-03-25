import React, { useState } from "react";
import Signup from "./Signup";
import CreatePage from "./CreatePage";
import Login from "./Login";
import { Container, Nav, Button, Alert } from "react-bootstrap";
import { AuthProvider, useAuth, logOut } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoutes from "../shared/ProtectedRoutes";
import ForgotPassword from "./ForgotPassword";


function App() {
  const [error, setError] = useState("");
  async function handleLogout() {
    setError("");
  try {
    await logOut();
    history.push("/login");
  } catch {
    setError("Failed to Log Out.")
  }};

  const {logOut} = useContext(AuthContext);
  
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ maxHeight: "100vh" }}
    >
      <div style={{ maxWidth: "350px" }}>
        <Router>
          
          <Nav variant="pills" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link href="/">Create Cocktail</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">Option 2</Nav.Link>
            </Nav.Item>
          </Nav>
          <AuthProvider>
            <Button variant="link" onClick={handleLogout}>Log Out</Button>
            {error && <Alert variant="danger">{error}</Alert>}
            <Switch>
              <ProtectedRoutes exact path ="/" component={CreatePage}/>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgotPassword" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
