import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Card, Form, Alert, Container } from "react-bootstrap";
import firebase from "../Firebase";
import { v4 as uuidv4 } from "uuid";
import "../Style.css";

const CreatePage = () => {
  const [error, setError] = useState("");
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  // const [recipe, setRecipe] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [spirit, setSpirit] = useState("");
  const [ingredients1, setIngredients1] = useState("");
  const [ingredients2, setIngredients2] = useState("");
  const [directions, setDirections] = useState("");
  const history = useHistory();

  const db = firebase.firestore().collection("recipes");

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

  function addRecipe(newRecipe) {
    db.doc(newRecipe.id)
      .set(newRecipe)
      history.push("/saved")
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <body className="bgParchGrey">
    {/* <Container className="bgParchGrey"> */}
      <Form className="bgParchGrey fontM">
        <h1 className="text-center fontDafoe">Create a Cocktail Recipe</h1>
        <Form.Group>
          <Form.Label className="margin-auto">Cocktail Name</Form.Label>
          <Form.Control
            className="text-center justify-element-center"
            style={{ maxWidth: 600 }}
            type="text"
            placeholder="Enter Name Of Cocktail"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            <div
              className="imgUpload mb-2"
              onClick={() => imageUploader.current.click()}
            >
              <img className="drinkImage" ref={uploadedImage} />
            </div>
            Click to upload Image
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Main Spirit</Form.Label>
          <Form.Control
            className="text-center"
            style={{ maxWidth: 150 }}
            as="select"
            value={spirit}
            onChange={(e) => setSpirit(e.target.value)}
          >
            <option value="vodka">Vodka</option>
            <option value="gin">Gin</option>
            <option value="rum">Rum</option>
            <option value="tequila">Tequila</option>
            <option value="bourbon">Bourbon</option>
            <option value="scotch">Scotch</option>
            <option value="whiskey">Misc. Whiskey</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Spirits and Measurements</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter all spirits and measurements here."
            value={ingredients1}
            onChange={(e) => setIngredients1(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>All other ingredients</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter sweet, bitter, juices, syrups, soda, egg whites, and all other ingredients & measurements here."
            value={ingredients2}
            onChange={(e) => setIngredients2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Directions</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter directions here."
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div>
        <Button
          type="submit"
          variant="info"
          onClick={() => {
            addRecipe({
              name,
              picture,
              spirit,
              ingredients1,
              ingredients2,
              directions,
              id: uuidv4(),
            })
          }}
        >
          Save Recipe
        </Button>
      </div>
    {/* </Container> */}
    </body>
  );
};

export default CreatePage;
