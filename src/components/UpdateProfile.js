import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "../Style.css";

export default function UpdateProfile() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const passwordConfirmRef = useRef("");
    const { currentUser, updateEmail, updatePassword } = useContext(AuthContext);
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== 
        passwordConfirmRef.current.value) {
            return setError("Passwords must match");
    }

        const upDates = []
        setLoading(true);
        setError("");

        if (emailRef.current.value !== currentUser.email) {
        upDates.push(updateEmail(emailRef.current.value));
        }

        Promise.all(upDates).then(() => {
            history.push("/create")
        }).catch(() => {
            setError("Failed to update your account.");
        }).finally(() => {
            setLoading(false);
        })
    };   
    
    return (
        <body className="bgParchGrey">
        <Container
            className="justify-content-center"
            style={{ minHeight: "100vh", maxWidth: 600}}
        >
        <Card border="secondary" className="bgParchGrey fontM">
            <Card.Body className="text-center mb-4 mt-4">
                <h2 className="fontDafoe">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef}  
                        defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef}  
                        placeholder="Leave blank to keep current password."/>
                    </Form.Group>
                    <Form.Group id="passwordConfirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef}  
                        placeholder="Leave blank to keep current password."/>
                    </Form.Group>
                    <Button variant="info" disabled={loading} className="w-50" type="submit">Update Account</Button>
                </Form>
                <div className="w-100 text-center mt-4">
                <Link to="/create">Cancel</Link>
                </div>
            </Card.Body>
        </Card>
        </Container>
        </body>
        

    )

}
