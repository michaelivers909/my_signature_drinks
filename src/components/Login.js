import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { logIn } = useAuth();
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        
    try {
        setError ("");
        setLoading(true);
        await logIn(emailRef.current.value, passwordRef.current.value);
        history.push("/");
    } catch {
        setError ("Something went wrong, unable to sign in. Please try again.");
    }
        setLoading(false); 
    }
        
    return (
        
        <>
        <Card>
            <Card.Body className="text-center mb-4">
                <h2>Log In To Make Cocktail Recipes!</h2>
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
                    <Button variant="info" disabled={loading} className="w-100" type="submit">Log In</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-4">
            Don't have an account? <Link to="signup">Sign Up</Link>
        </div>
        </>
        

    )

}
