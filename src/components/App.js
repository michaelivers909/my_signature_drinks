import React, { useState, useContext } from "react";
import Signup from "./Signup";
import CreatePage from "./CreatePage";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import SavedRecipes from "./SavedRecipes";
import UpdateProfile from "./UpdateProfile";
import { AuthContext } from "../contexts/AuthContext";
import { Nav, Alert, NavDropdown } from "react-bootstrap";
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
  
  return (
    
      <div>
        <Router>
          {currentUser && (
            <>
          <Nav className="pills" justify variant="pills info">
            <Nav.Item>
              <Nav.Link className="white blue" href="/Create">Create Cocktail</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="white" href="/Saved">Saved Recipes</Nav.Link>
            </Nav.Item>
            <NavDropdown title={<span className="white">Session</span>} id="nav-dropdown">
            <NavDropdown.Item onSelect={handleLogOut}>Log Out</NavDropdown.Item>
            <NavDropdown.Item href="/UpdateProfile">Update Account</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {error && <Alert className="text-center"variant="danger">{error}</Alert>}
          </>
          )}
            <Switch>
              <ProtectedRoutes currentUser={currentUser} path="/Login" authRequired={false} component={Login} />
              <ProtectedRoutes currentUser={currentUser} path="/SignUp" authRequired={false} component={Signup}/>
              <ProtectedRoutes currentUser={currentUser} path="/ForgotPassword" authRequired={false} component={ForgotPassword}/>
              <ProtectedRoutes currentUser={currentUser} path="/UpdateProfile" authRequired={true} component={UpdateProfile}/>
              <ProtectedRoutes currentUser={currentUser} path="/Create" authRequired={true} component={CreatePage} />
              <ProtectedRoutes currentUser={currentUser} path="/Saved" authRequired={true} component={SavedRecipes} />
              <Route path="*">
                <Redirect to="/Login" />
              </Route>
            </Switch>
          </Router>
      </div>
  
  )
};

export default App;
