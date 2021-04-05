import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Card, Form, Alert, Container } from "react-bootstrap";
import firebase from "../Firebase";
import "../Style.css";

export default function SavedRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const ref = firebase.firestore().collection("recipes");
    console.log(ref);

    function getRecipes() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) =>{
                items.push(doc.data());
            });
            setRecipes(items);
            setLoading(false);
        });
    }

    useEffect(() => {
        getRecipes();
    }, []);

    // if (loading) {
        // return <h1>Loading...</h1>;
    // }

    return (
       
        <body className="bgParchGrey"
        style={{ minHeight: 800 }}>
         <h1 className="text-center fontDafoe">My Saved Recipes</h1>
            {loading ? <h1>Loading...</h1> : null}
            {recipes.map((recipe) =>
            <div key={recipe.id}>
                <h2>{recipe.name}</h2>
                <img>{recipe.picture}</img>
                <p>{recipe.spirit}</p>
                <p>{recipe.ingredients1}</p>
                <p>{recipe.ingredients2}</p>
                <p>{recipe.directions}</p>
            </div>
            )}
      </body>
      
    
    )
};

   