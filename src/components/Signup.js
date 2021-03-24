import React, { useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";


export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    
    return (
        <>
        <Card>
            <Card.Body className="text-center mb-4">
                <h2>Sign Up To Make Cocktail Recipes!</h2>
                <Form>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group id="passwordConfirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button className="w-100" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-4">
            Already signed up? Log In here.
        </div>
        </>
        

    )

}