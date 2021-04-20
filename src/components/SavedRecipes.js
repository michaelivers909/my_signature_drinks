import React, { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { spiritTypes } from "../shared/SpiritTypes";
import { allSpirits} from "../shared/AllSpirits";
import {
  Button,
  Col,
  Row,
  Alert,
  Container,
  Modal,
  Form
} from "react-bootstrap";
import firebase from "../Firebase";
import "../Style.css";

export default function SavedRecipes() {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("");
  const [spirit, setSpirit] = useState("");
  const [ingredients1, setIngredients1] = useState("");
  const [ingredients2, setIngredients2] = useState("");
  const [directions, setDirections] = useState("");
  const [selectMain, setSelectMain] = useState("");
  const [sortOrder, setSortOrder] = useState("1");
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

  const filteredRecipes = useMemo(()=>{
    let filtered = recipes.filter((recipe) =>
          recipe.spirit.toLowerCase().includes(selectMain.toLowerCase())
        ) 
      return filtered.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1 * sortOrder;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1 * sortOrder;
        }
        return 0;
      })
    }, [selectMain, recipes, sortOrder])


  function deleteRecipe(recipe) {
    try {
      setError("");
      db.doc(recipe.id).delete();
    } catch {
      setError("Something went wrong, unable to delete.");
    }
  }

  function setEdit(recipe) {
    setSpirit(recipe.spirit);
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
                  onChange={(e) => setSelectMain(e.target.value)}
                  >;
                    {allSpirits.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.view}
                    </option>
                    ))}
                </Form.Control>
              </div>
              <div>
                <Form.Label column="sm">Sort By Name</Form.Label>
                <Form.Control
                  size="sm"
                  className="text-center"
                  style={{ fontSize: 12, maxWidth: 150 }}
                  as="select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="1">A-Z</option>
                  <option value="-1">Z-A</option>
                </Form.Control>
              </div>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {loading ? <h1>Loading...</h1> : null}
            {filteredRecipes.length === 0 && loading === false && (<h2>You don't have any saved signature cocktails yet!</h2>)}
            {filteredRecipes.map((recipe) => (
              <div className="fontM" key={recipe.id}>
                {recipe.id === recipeEdit && (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                <h4 className="font-weight-bold">{recipe.name}</h4>
                <img
                  className="drinkImage mb-2"
                  src={recipe.fileUrl}
                  alt="Cocktail"
                />
                <main>
                  {recipe.id === recipeEdit && (
                    <Form.Control
                    size="sm"
                    className="text-center mb-2 mx-auto"
                    style={{ fontSize: 12, maxWidth: 150 }}
                    as="select"
                    value={spirit}
                    onChange={(e) => setSpirit(e.target.value)}
                  >;
                    {spiritTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.view}
                    </option>
                ))}
                  </Form.Control>
                  )}
                  <p className="font-weight-bold">Main Spirit: {recipe.spirit}</p>
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
                            Are you sure you'd like to delete this recipe?
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
                              spirit,
                              ingredients1,
                              ingredients2,
                              directions,
                              fileUrl: recipe.fileUrl,
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
                        className="font-weight-bold mb-1"
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
                  className="mb-5"
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
