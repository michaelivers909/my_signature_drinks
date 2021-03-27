import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "../Style.css";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signUp } = useContext(AuthContext);
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== 
        passwordConfirmRef.current.value) {
            return setError("Passwords must match");
    }
    try {
        setError ("");
        setLoading(true);
        await signUp(emailRef.current.value, passwordRef.current.value);
        history.push("/create");
    } catch {
        setError ("Something went wrong, unable to create account. Please try again.");
    }
        setLoading(false); 
    }
        
    return (
        
        <>
        <Card className="bgParchGrey fontM">
            <Card.Body className="text-center mb-4">
                <h2 className="fontDafoe">Sign Up To Make Cocktail Recipes!</h2>
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
                    <Form.Group id="passwordConfirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button variant="info" disabled={loading} className="w-100" type="submit">Sign Up</Button>
                </Form>
                <div className="w-100 text-center mt-4">
                    Already signed up? <Link to="/login">Log In</Link>
                </div>
            </Card.Body>
        </Card>
        </>
        

    )

}