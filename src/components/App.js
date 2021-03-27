import React, { useState, useContext } from "react";
import Signup from "./Signup";
import CreatePage from "./CreatePage";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import SavedRecipes from "./SavedRecipes";
import { AuthContext } from "../contexts/AuthContext";
import { Container, Nav, Button, Alert } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from "react-router-dom";
import ProtectedRoutes from "../shared/ProtectedRoutes";
import "../Style.css";



function App() {
  const [error, setError] = useState("");
  const history = useHistory();
  const { currentUser, logOut } = useContext(AuthContext);

  async function handleLogOut() {
    
    setError("");
  try {
    await logOut();
    history.push("/Login");
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
      style={{ minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "350px" }}>
        <Router>
          {currentUser && (
            <>
          <Nav className="justify-content-center pill" fill variant="pills" defaultActiveKey="/create">
            <Nav.Item>
              <Nav.Link href="/Create">Create Cocktail</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/Saved">Saved Recipes</Nav.Link>
            </Nav.Item>
          </Nav>
          
          <Button className="content-align-right" variant="link" onClick={handleLogOut}>Log Out</Button>
          {error && <Alert className="text-center"variant="danger">{error}</Alert>}
          </>
          )}
            <Switch>
              <ProtectedRoutes isAuth={currentUser} path="/Login" authRequired={false} component={Login} />
              <ProtectedRoutes isAuth={currentUser} path="/SignUp" authRequired={false} component={Signup}/>
              <ProtectedRoutes isAuth={currentUser} path="/ForgotPassword" authRequired={false} component={ForgotPassword}/>
              <ProtectedRoutes isAuth={currentUser} path="/Create" authRequired={true} component={CreatePage} />
              <ProtectedRoutes isAuth={currentUser} path="/Saved" authRequired={true} component={SavedRecipes} />
              <Route path="*">
                <Redirect to="/Login" />
              </Route>
            </Switch>
          </Router>
      </div>
    </Container>
  )
};

export default App;
