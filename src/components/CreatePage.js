import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Form, Alert, Row, Col, Container } from "react-bootstrap";
import firebase from "../Firebase";
import { v4 as uuidv4 } from "uuid";
import "../Style.css";

const CreatePage = () => {
  const [error, setError] = useState("");
  const {currentUser} = useContext(AuthContext);
  const currentUserEmail = currentUser ? currentUser.email : "";
  const owner = currentUser ? currentUser.uid : 'unknown';
  const [name, setName] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [setFileName] = useState("");
  const [spirit, setSpirit] = useState("");
  const [ingredients1, setIngredients1] = useState("");
  const [ingredients2, setIngredients2] = useState("");
  const [directions, setDirections] = useState("");
  const history = useHistory();

  const db = firebase.firestore().collection("recipes");

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  function addRecipe(newRecipe) {
    try {
      setError("");
      db.doc(newRecipe.id)
      .set(newRecipe)
    } catch {
      setError("Unable to add new recipe to Saved Recipes.")
    } history.push("/saved")
  }

  return (
    <Container fluid border="primary" id="bgParchGrey">
      <Form className="fontM">
        <h4 className="text-center">{`Welcome ${currentUserEmail}`}</h4>
        <h1 className="text-center fontDafoe m-2">Create a Cocktail Recipe</h1>
        <Form.Group className="mr-5 ml-5 mb-2">
        <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Label column="lg">Cocktail Name</Form.Label>
          <Form.Control
            className="text-center"
            style={{ maxWidth: 600 }}
            type="text"
            placeholder="Enter Name Of Cocktail"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mr-5 ml-5 mb-2">
        <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Label column="lg">Choose an Image for Your Recipe</Form.Label>
          <Form.File
          type="file"
          onChange={(e) => setFileName(e.target.files[0].name), onFileChange}
        />
        <img className="drinkImage" src = {fileUrl} alt=""/>
        </Col>
        </Row>
        </Form.Group>
        <Form.Group className="mr-5 ml-5 mb-2">
        <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Label column="lg">Select Main Spirit</Form.Label>
          <Form.Control
            className="text-center mx-auto"
            style={{ maxWidth: 150 }}
            as="select"
            value={spirit}
            onChange={(e) => setSpirit(e.target.value)}
          >
            <option value="Vodka">Vodka</option>
            <option value="Gin">Gin</option>
            <option value="Rum">Rum</option>
            <option value="Tequila">Tequila</option>
            <option value="Bourbon">Bourbon</option>
            <option value="Scotch">Scotch</option>
            <option value="Whiskey">Misc. Whiskey</option>
            <option value="Other">Other</option>
          </Form.Control>
          </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mr-5 ml-5 mb-2">
        <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Label column="lg">Spirits and Measurements</Form.Label>
          <Form.Control
            as="textarea"
            style={{ maxWidth: 600 }}
            placeholder="Enter all spirits and measurements here."
            value={ingredients1}
            onChange={(e) => setIngredients1(e.target.value)}
          ></Form.Control>
          </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mr-5 ml-5 mb-2">
        <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Label column="lg">All Other Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            style={{ maxWidth: 600 }}
            placeholder="Enter sweet, bitter, juices, syrups, soda, egg whites, and all other ingredients & measurements here."
            value={ingredients2}
            onChange={(e) => setIngredients2(e.target.value)}
          ></Form.Control>
          </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mr-5 ml-5 mb-2">
        <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Label column="lg">Directions</Form.Label>
          <Form.Control
            as="textarea"
            style={{ maxWidth: 600 }}
            placeholder="Enter directions here."
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
          />
          </Col>
          </Row>
        </Form.Group>
      </Form>
      <div className="mr-5 ml-5 mb-2">
        {error && <Alert variant="danger">{error}</Alert>}
        <Button
          type="submit"
          variant="info"
          onClick={() => {
            addRecipe({
              name,
              fileUrl,
              spirit,
              ingredients1,
              ingredients2,
              directions,
              owner,
              id: uuidv4(),
            })
          }}
        >
          Save Recipe
        </Button>
      </div>
    </Container>
  );
};

export default CreatePage;
