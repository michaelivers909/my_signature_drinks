import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Card, Form, Alert, Container } from "react-bootstrap";
import "../Style.css";

const CreatePage = (props) => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [mainSpirit, setMainSpirit] = useState("");
  const [ingredients1, setIngredients1] = useState("");
  const [ingredients2, setIngredients2] = useState("");
  const [directions, setDirections] = useState("");
  const [error, setError] = useState("");
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  
  const handleName = event => {
     const { target } = event;
     setName(name => ({
       ...name,
       name: target.value
    }))
    };
  const handleMainSpirit = event => {
    const { target } = event;
    setMainSpirit(mainSpirit => ({
      ...mainSpirit,
      name: target.value
    }))
   };
   const handleIngredients1 = event => {
    const { target } = event;
    setIngredients1(ingredients1 => ({
      ...ingredients1,
      name: target.value
    }))
   };
   const handleIngredients2 = event => {
    const { target } = event;
    setIngredients2(ingredients2 => ({
      ...ingredients2,
      name: target.value
    }))
   };
   const handleDirections = event => {
    const { target } = event;
    setDirections(directions => ({
      ...directions,
      name: target.value
    }))
   };

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

  const handleSubmit = () => {
    
  }

  return (
      <body className="bgParchGrey">
       <Container>
        <Form className="bgParchGrey fontM">
            <h1 className="text-center fontDafoe">Create a Cocktail Recipe</h1>
          <Form.Group>
            <Form.Label className="margin-auto">Cocktail Name</Form.Label>
            <Form.Control value={name} className="text-center justify-element-center" style={{maxWidth: 600}} type="text" placeholder="Enter Name Of Cocktail" />
          </Form.Group>
          <Form.Group>
          <div className="text-center mb-4">
            <input
              value={picture}
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
          <Form.Group>
            <Form.Label>Select Main Spirit</Form.Label>
            <Form.Control value={mainSpirit} className="text-center" style={{maxWidth: 150}}as="select">
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
          <Form.Group>
            <Form.Label>Spirits and Measurements</Form.Label>
            <Form.Control
              value={ingredients1}
              as="textarea"
              placeholder="Enter all spirits and measurements here."
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label >All other ingredients</Form.Label>
            <Form.Control
              value={ingredients2}
              as="textarea"
              placeholder="Enter sweet, bitter, juices, syrups, soda, egg whites, and all other ingredients & measurements here."
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Directions</Form.Label>
            <Form.Control value={directions} as="textarea" placeholder="Enter directions here." />
          </Form.Group>
        </Form>
        <div>
          <Button className="text-center" variant="info">Save Recipe</Button>
        </div>
       
      </Container>
    </body>
    
  );
}

export default CreatePage;
