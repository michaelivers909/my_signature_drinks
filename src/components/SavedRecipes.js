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
} from "react-bootstrap";
import firebase from "../Firebase";
import "../Style.css";

export default function SavedRecipes() {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [recipes, setRecipes] = useState([]);
  const [name, setName ] = useState("");
  const [ingredients1, setIngredients1] = useState("");
  const [ingredients2, setIngredients2] = useState("");
  const [directions, setDirections ] = useState("");
  const [recipeEdit, setRecipeEdit] = useState(null);
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
    try {
    setError("");
    db.doc(editedRecipe.id)
      .update(editedRecipe)
    } catch {
      setError("Something went wrong, unable to edit recipe.")
    }
      setRecipeEdit(null);
  }

  return (
    <>
    <section className="mb-4"id="bgParchGrey" style={{ minHeight: 800 }}>
      <h1 className="text-center fontDafoe">My Saved Recipes</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
      <Col md={{ span: 6, offset: 3 }}>
        {loading ? <h1>Loading...</h1> : null}
        {recipes.map((recipe) => (
          <div className="fontM" key={recipe.id}>
            {recipe.id === recipeEdit && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}/>
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
                    onChange={(e) => setIngredients1(e.target.value)}/>
                )}
                <p className="space" >{recipe.ingredients1}</p>
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
                    <Button
                      className="m-2"
                      variant="info"
                      onClick={() => deleteRecipe(recipe)}
                    >
                      Delete Recipe
                    </Button>
                    {recipe.id === recipeEdit ? (
                  
                    <Button
                      className="m-2"
                      variant="info"
                      onClick={() => 
                        editRecipe({
                          name,
                          fileUrl: recipe.fileUrl,
                          spirit: recipe.spirit,
                          ingredients1,
                          ingredients2,
                          directions,
                          id: recipe.id
                        })
                      }>
                      Save Edit
                    </Button>
                    ) : (
                    <Button variant="info"
                      onClick={() => setRecipeEdit(recipe.id)}>Edit Recipe
                    </Button>
                    )}
                  </div>
              </main>
          </div>
        ))}
        </Col>
        </Row>
    </section>
    </>
  );
}
