import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Card, Form, Alert, Container } from "react-bootstrap";
import firebase from "../Firebase";
import "../Style.css";

export default function SavedRecipes() {
  const {currentUser} = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = firebase.firestore().collection("recipes");
  console.log(db);

  function getRecipes() {
    setLoading(true);
    db
    .where('owner', '==', currentUserId)
    .onSnapshot((querySnapshot) => {
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
    db.doc(recipe.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
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
    <body className="bgParchGrey text-center" style={{ minHeight: 800 }}>
      <h1 className="text-center fontDafoe">My Saved Recipes</h1>
      {loading ? <h1>Loading...</h1> : null}
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h4>{recipe.name}</h4>
          <p>{recipe.picture}</p>
          <p>{recipe.spirit}</p>
          <p>{recipe.ingredients1}</p>
          <p>{recipe.ingredients2}</p>
          <p>{recipe.directions}</p>
          {/* {recipes > 1 && ( */}
            <>
          <div>
            <Button
              className="m-2"
              variant="info"
              onClick={() => deleteRecipe(recipe)}
            >
              Delete Recipe
            </Button>
          </div>
          <div>
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
          </>
            {/* )} */}
        </div>
      ))}
    </body>
  );
}
