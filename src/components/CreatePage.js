import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Card, Form, Alert } from "react-bootstrap";
import "../Style.css";

export default function CreatePage() {
  const [error, setError] = useState("");
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // <Card>
    //   <Card.Body>
        // <Card.Title className="text-center">Create a Cocktail Recipe</Card.Title>
        <Form>
            <h1 className="text-center">Create a Cocktail Recipe</h1>
          <Form.Group>
            <Form.Label>Cocktail Name</Form.Label>
            <Form.Control text="name" placeholder="Enter Name Of Cocktail" />
          </Form.Group>
          <Form.Group>
          <div className="text-center mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageUploader}
              style={{
                display: "none",
              }}
            />
            <div className="imgUpload mb-2"
              onClick={() => imageUploader.current.click()}
            >
              <img className="drinkImage"
                ref={uploadedImage}
              />
            </div>
            Click to upload Image
          </div>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Main Spirit</Form.Label>
            <Form.Control as="select">
              <option>Vodka</option>
              <option>Gin</option>
              <option>Rum</option>
              <option>Tequila</option>
              <option>Bourbon</option>
              <option>Scotch</option>
              <option>Misc. Whiskey</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Spirits and Measurements</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter all spirits and measurements here."
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>All other ingredients</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter sweet, bitter, juices, syrups, soda, egg whites, and all other ingredients & measurements here."
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Directions</Form.Label>
            <Form.Control as="textarea" placeholder="Enter directions here." />
          </Form.Group>
        </Form>
    //   </Card.Body>
    // </Card>
  );
}
