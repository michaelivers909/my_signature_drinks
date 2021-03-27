import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../Style.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      history.push("/Create");
    } catch {
      setError("Something went wrong, unable to sign in. Please try again.");
    }
    setLoading(false);
  }

  return (
    <>
      <Card className="bgParchGrey fontM">
        <Card.Body className="text-center mb-4">
          <h2 className="fontDafoe">Log In To Create Cocktail Recipes!</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button
              variant="info"
              disabled={loading}
              className="w-100"
              type="submit"
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2 ">
            <Link to="/ForgotPassword">Forgot Password?</Link>
          </div>

          <div className="w-100 text-center mt-4">
            Don't have an account?{" "}
            <Link to="Signup">
              Sign Up
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
