import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {
  Accordion,
  Button,
  Card,
  Col,
  Row,
  Form,
  Alert,
  Container,
} from "react-bootstrap";
import firebase from "../Firebase";
import "../Style.css";

export default function SavedRecipes() {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    db.doc(recipe.id)
      .delete();
    } catch {
      setError("Something went wrong, unable to delete.")
    }
  }

  function editRecipe(editedRecipe) {
    setLoading();
    db.doc(editedRecipe.id)
      .update(editedRecipe)
      .catch((err) => {
        console.error(err);
      });
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section id="bgParchGrey" style={{ minHeight: 800 }}>
      <h1 className="text-center fontDafoe">My Saved Recipes</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Accordion>
      <Row>
      <Col md={{ span: 6, offset: 3 }}>
        {loading ? <h1>Loading...</h1> : null}
        {recipes.map((recipe) => (
          <div className="fontM" key={recipe.id}>
            <h4>{recipe.name}</h4>
            <img
              className="drinkImage mb-2"
              src={recipe.fileUrl}
              alt="Cocktail Picture"
            />
            <div>
            <Accordion.Toggle as={Button} variant="info" eventKey="1">
              Click Here For Recipe
            </Accordion.Toggle>
            </div>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <p>Main Spirit: {recipe.spirit}</p>
                <p>{recipe.ingredients1}</p>
                <p>{recipe.ingredients2}</p>
                <p>{recipe.directions}</p>
                  <div>
                    <Button
                      className="m-2"
                      variant="info"
                      onClick={() => deleteRecipe(recipe)}
                    >
                      Delete Recipe
                    </Button>
                    <Button
                      className="m-2"
                      variant="info"
                      onClick={() =>
                        editRecipe(
                          recipe.name,
                          recipe.spirit,
                          recipe.ingredients1,
                          recipe.ingredients2,
                          recipe.directions
                        )
                      }
                    >
                      Edit Recipe
                    </Button>
                  </div>
              </Card.Body>
            </Accordion.Collapse>
          </div>
        ))}
        </Col>
        </Row>
      </Accordion>
    </section>
  );
}
