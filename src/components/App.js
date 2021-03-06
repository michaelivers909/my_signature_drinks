import React, { useState, useContext } from "react";
import Signup from "./Signup";
import CreatePage from "./CreatePage";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import SavedRecipes from "./SavedRecipes";
import UpdateProfile from "./UpdateProfile";
import { AuthContext } from "../contexts/AuthContext";
import { Nav, Alert, NavDropdown } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoutes from "../shared/ProtectedRoutes";
import "../Style.css";

function App() {
  const [error, setError] = useState("");
  const { currentUser, logOut } = useContext(AuthContext);

  async function handleLogOut() {
    setError("");
    try {
      await logOut();
    } catch {
      setError("Failed to Log Out.");
    } 
  }

  return (
    <div>
      <Router>
      <div>
            {error && 
              <Alert className="text-center" variant="danger">
                {error}
              </Alert>
            }
            </div>
        {currentUser && (
          <>
            <Nav className="fontM font-weight-bold pills" justify variant="pills info">
              <Nav.Item>
                <Nav.Link className="white cursor" href="/Create">
                  Create Cocktail
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="white cursor" href="/Saved">
                  Saved Recipes
                </Nav.Link>
              </Nav.Item>
              <NavDropdown
                title={<span className="white cursor">Session</span>}
                id="nav-dropdown"
              >
                <NavDropdown.Item onSelect={handleLogOut}>
                  Log Out
                </NavDropdown.Item>
                <NavDropdown.Item href="/update-profile">
                  Update Account
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            
            </>
            
          
        )}
        <Switch>
          <ProtectedRoutes
            currentUser={currentUser}
            path="/login"
            authRequired={false}
            component={Login}
          />
          <ProtectedRoutes
            currentUser={currentUser}
            path="/signUp"
            authRequired={false}
            component={Signup}
          />
          <ProtectedRoutes
            currentUser={currentUser}
            path="/forgot-password"
            authRequired={false}
            component={ForgotPassword}
          />
          <ProtectedRoutes
            currentUser={currentUser}
            path="/update-profile"
            authRequired={true}
            component={UpdateProfile}
          />
          <ProtectedRoutes
            currentUser={currentUser}
            path="/create"
            authRequired={true}
            component={CreatePage}
          />
          <ProtectedRoutes
            currentUser={currentUser}
            path="/saved"
            authRequired={true}
            component={SavedRecipes}
          />
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
