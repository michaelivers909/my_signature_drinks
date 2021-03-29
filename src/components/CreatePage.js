import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Card, Form, Alert, Container } from "react-bootstrap";
import "../Style.css";


const CreatePage = () => {
  const [error, setError] = useState("");
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [recipe, setRecipe] = React.useState(
    {
      name: "",
      picture: "",
      spirit: "",
      ingredients1: "",
      ingredients2: "",
      directions: "",
    }
  );

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
  
  const handleSubmit = (e) => {
    e.preventDefault();

    setRecipe(recipe => ({
      ...recipe,
    }));
  };


  return (
    <body className="bgParchGrey">
      <Container>
        <Form className="bgParchGrey fontM">
          <h1 className="text-center fontDafoe">Create a Cocktail Recipe</h1>
          <Form.Group>
            <Form.Label className="margin-auto">Cocktail Name</Form.Label>
            <Form.Control
              className="text-center justify-element-center"
              style={{ maxWidth: 600 }}
              type="text"
              placeholder="Enter Name Of Cocktail"
              value={recipe.name}
              onChange={(e) => setRecipe((val) => ({ ...val, name: e.target.value })) 
              }

            />
          </Form.Group>
          <Form.Group>
            <div className="text-center mb-4">
              <input
                value={recipe.picture}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                display: "none" 
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
              value={recipe.spirit}
              onChange={(e) => setRecipe((val) => ({ ...val, spirit: e.target.value })) }
            >
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
              as="textarea"
              placeholder="Enter all spirits and measurements here."
              value={recipe.ingredients1}
              onChange={(e) => setRecipe((val) => ({ ...val, ingredients1: e.target.value }))}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>All other ingredients</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter sweet, bitter, juices, syrups, soda, egg whites, and all other ingredients & measurements here."
              value={recipe.ingredients2}
              onChange={(e) => setRecipe((val) => ({ ...val, ingredients2: e.target.value }))}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Directions</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter directions here."
              value={recipe.directions}
              onChange={(e) => setRecipe((val) => ({ ...val, directions: e.target.value }))}
            />
          </Form.Group>
        </Form>
        <div>
          {recipe.create.map((recipe) => (
            <div>
              <span>{recipe.name}</span>
              <span>{recipe.picture}</span>
              <span>{recipe.spirit}</span>
              <span>{recipe.ingredients1}</span>
              <span>{recipe.ingredients2}</span>
              <span>{recipe.directions}</span>
            </div>
          ))}
        </div>
        <div>
          <Button type="submit" className="text-center" variant="info" onClick={handleSubmit}>
            Save Recipe
          </Button>
        </div>
      </Container>
    </body>
  );
};

export default CreatePage;
