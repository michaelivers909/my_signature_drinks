import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  Button,
  Col,
  Row,
  Alert,
  Container,
  Modal,
  Form,
} from "react-bootstrap";
import firebase from "../Firebase";
import "../Style.css";

export default function SavedRecipes() {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("");
  const [ingredients1, setIngredients1] = useState("");
  const [ingredients2, setIngredients2] = useState("");
  const [directions, setDirections] = useState("");
  const [recipeEdit, setRecipeEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const db = firebase.firestore().collection("recipes");

  function getRecipes() {
    setLoading(true);
    db.where("owner", "==", currentUserId).onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setRecipes(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getRecipes();
  }, []);

  function deleteRecipe(recipe) {
    try {
      setError("");
      db.doc(recipe.id).delete();
    } catch {
      setError("Something went wrong, unable to delete.");
    }
  }

  function setEdit(recipe) {
    // setRecipeEdit(recipe.id);
    setIngredients1(recipe.ingredients1);
    setIngredients2(recipe.ingredients2);
    setDirections(recipe.directions);
    setName(recipe.name);
  }

  function editRecipe(editedRecipe) {
    setLoading();
    try {
      setError("");
      db.doc(editedRecipe.id).update(editedRecipe);
    } catch {
      setError("Something went wrong, unable to edit recipe.");
    }
    setRecipeEdit(null);
    setName("");
    setIngredients1("");
    setIngredients2("");
    setDirections("");
  }

  return (
    <>
      <Container
        fluid
        className="mb-4"
        id="bgParchGrey"
        style={{ minHeight: 800 }}
      >
        <h1 className="text-center fontDafoe">My Saved Recipes</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row className="mb-4">
          <Col
            className="d-flex justify-content-center"
            md={{ span: 6, offset: 3 }}
          >
            <Form.Row>
              <div>
                <Form.Label column="sm">Filter By Main Spirit</Form.Label>
                <Form.Control
                  size="sm"
                  className="text-center mb-2"
                  style={{ fontSize: 12, maxWidth: 150 }}
                  as="select"
                  // value={spirit}
                  // onChange={(e) => setSpirit(e.target.value)}
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
              </div>
              <div>
                <Form.Label column="sm">Sort By Name</Form.Label>
                <Form.Control
                  size="sm"
                  className="text-center"
                  style={{ fontSize: 12, maxWidth: 150 }}
                  as="select"
                  // value={spirit}
                  // onChange={(e) => setSpirit(e.target.value)}
                >
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </Form.Control>
              </div>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {loading ? <h1>Loading...</h1> : null}
            {recipes.map((recipe) => (
              <div className="fontM" key={recipe.id}>
                {recipe.id === recipeEdit && (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                <h4>{recipe.name}</h4>
                <img
                  className="drinkImage mb-2"
                  src={recipe.fileUrl}
                  alt="Cocktail"
                />
                <main>
                  <p>Main Spirit: {recipe.spirit}</p>
                  {recipe.id === recipeEdit && (
                    <textarea
                      cols="35"
                      rows="3"
                      placeholder="Edit Spirits"
                      value={ingredients1}
                      onChange={(e) => setIngredients1(e.target.value)}
                    />
                  )}
                  <p className="space">{recipe.ingredients1}</p>
                  {recipe.id === recipeEdit && (
                    <textarea
                      cols="35"
                      rows="3"
                      placeholder="Edit Other Ingredients"
                      value={ingredients2}
                      onChange={(e) => setIngredients2(e.target.value)}
                    />
                  )}
                  <p className="space">{recipe.ingredients2}</p>
                  {recipe.id === recipeEdit && (
                    <textarea
                      cols="35"
                      rows="3"
                      placeholder="Edit Directions"
                      value={directions}
                      onChange={(e) => setDirections(e.target.value)}
                    ></textarea>
                  )}
                  <p>{recipe.directions}</p>
                  <div>
                    {recipe.id === recipeEdit ? (
                      <>
                        <Button
                          variant="danger"
                          size="sm"
                          className="mb-2 mr-2"
                          onClick={handleShow}
                        >
                          Delete Recipe
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Delete Recipe</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you'd like to delete?
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => {
                                deleteRecipe(recipe);
                                handleClose();
                              }}
                            >
                              Delete Recipe
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <Button
                          className="mb-2 ml-2"
                          variant="success"
                          size="sm"
                          onClick={() => {
                            setEdit(recipe);
                            editRecipe({
                              name,
                              ingredients1,
                              ingredients2,
                              directions,
                              fileUrl: recipe.fileUrl,
                              spirit: recipe.spirit,
                              id: recipe.id,
                            });
                          }}
                        >
                          Save Edits
                        </Button>
                        <div>
                          <Button
                            variant="primary"
                            size="sm"
                            className="mb-4"
                            onClick={() => setRecipeEdit(null)}
                          >
                            Cancel Edit
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Button
                        className="mb-4"
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                          setRecipeEdit(recipe.id);
                          setEdit(recipe);
                        }}
                      >
                        Edit Recipe
                      </Button>
                    )}
                  </div>
                </main>
                <Button
                  variant="link"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo(0, 0);
                  }}
                >
                  Back to Top
                </Button>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
