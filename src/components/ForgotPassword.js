import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../Style.css";

export default function ForgotPassword() {
  const emailRef = useRef("");
  const { resetPassword } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email inbox for further instructions.");
    } catch {
      setError("Failed to reset password.");
    }
    setLoading(false);
  }

  return (
    <Container
      className="bg-black justify-content-center"
      style={{ minHeight: "100vh", maxWidth: 600 }}
    >
      <Card
        style={{ minHeight: "100vh", maxWidth: 600 }}
        border="secondary"
        className="fontM"
        id="bgSignature"
      >
        <Card.Body className="text-center mb-4">
          <h2 className="white fontDafoe">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button
              variant="info"
              disabled={loading}
              className="w-50"
              type="submit"
            >
              Reset
            </Button>
          </Form>
          <div className="w-100 text-center mt-2 ">
            <Link className="lemon" to="/login">
              Login
            </Link>
          </div>
          <div className="bg-black white w-100 text-center mt-4">
            Don't have an account?{" "}
            <Link className="lemon" to="signup">
              Sign Up
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
