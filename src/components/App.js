import React, { useState, useContext } from "react";
import { auth } from "../Firebase";
import Signup from "./Signup";
import CreatePage from "./CreatePage";
import Login from "./Login";
import SavedRecipes from "./SavedRecipes";
import { AuthContext } from "../contexts/AuthContext";
import { Container, Nav, Button, Alert } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import ProtectedRoutes from "../shared/ProtectedRoutes";
import ForgotPassword from "./ForgotPassword";
import "../Style.css";



function App() {
  const [error, setError] = useState("");
  const history = useHistory();
  const { currentUser, logOut } = useContext(AuthContext);

  async function handleLogOut() {
    
    setError("");
  try {
    await logOut();
    history.push("/login");
  } catch {
    setError("Failed to Log Out.")
  }};

  // async function handleLogOut() {
    // setError("");
    // try {
      // await auth.signOut();
      // history.push("/login");
    // } catch {
      // setError("Failed To Log Out.")
    // }
  // };
  
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ maxHeight: "100vh" }}
    >
      <div style={{ maxWidth: "350px" }}>
      
        <Router>
          {currentUser && (
            <>
          <Nav className="justify-content-center pill" fill variant="pills" defaultActiveKey="/create">
            <Nav.Item>
              <Nav.Link href="/create">Create Cocktail</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/saved">Saved Recipes</Nav.Link>
            </Nav.Item>
          </Nav>
          
          <Button className="content-align-right" variant="link" onClick={handleLogOut}>Log Out</Button>
          {error && <Alert className="text-center"variant="danger">{error}</Alert>}
          </>

          )}
            <Switch>
              <ProtectedRoutes exact path ="/create" component={CreatePage} />
              <ProtectedRoutes exact path ="/saved" component={SavedRecipes} />
              <Route currentUser path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgotPassword" component={ForgotPassword} />
            </Switch>
          </Router>
      </div>
    </Container>
  )
};

export default App;
