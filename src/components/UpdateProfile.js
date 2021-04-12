import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../Style.css";

export default function UpdateProfile() {
  const { currentUser, updateEmail, updatePassword } = useContext(AuthContext);
  const originalEmail = currentUser.email;
  const [email, setEmail] = useState(originalEmail);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function changePassword(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== passwordConfirm) {
      setError("Passwords must match");
      return;
    }
    setLoading(true);
    try {
      await updatePassword(password);
      setSuccess("Successfully updated password");
    } catch (err) {
      setError("Failed to update your account.");
    } finally {
      setLoading(false);
    }
  }

  async function changeEmail(e) {
    e.preventDefault();
    setError("");
    if (!/\S+@\S+\.\S+/.test(email) || email === currentUser) {
      setError("Invalid email provided");
      return;
    }
    setLoading(true);
    try {
      await updateEmail(email);
      setSuccess("Successfully updated email");
    } catch (err) {
      setError("Failed to update your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
        <Container className="m-auto text-center justify-content-center fontM" style={{ minHeight: "50vh", maxWidth: "600" }}>
        <Card border="secondary" className="bgParchGrey">
          <Card.Body>
            <h2 className="fontDafoe">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={currentUser.email}
                  onChange={(e) => {setEmail(e.target.value)}}
                />
              </Form.Group>
              <Button
                variant="info"
                disabled={loading}
                className="w-50 mb-4"
                type="submit"
                onClick={changeEmail}
              >
                Update Email
              </Button>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Leave blank to keep current password."
                  onChange={(e) => {setPassword(e.target.value)}}
                />
              </Form.Group>
              <Form.Group id="passwordConfirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Leave blank to keep current password."
                  onChange={(e) => {setPasswordConfirm(e.target.value)}}
                />
              </Form.Group>
              <Button
                variant="info"
                disabled={loading}
                className="w-50"
                type="submit"
                onClick={changePassword}
              >
                Update Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-4">
              <Link to="/create">Cancel</Link>
            </div>
          </Card.Body>
        </Card>
        </Container>
    
  );
}
