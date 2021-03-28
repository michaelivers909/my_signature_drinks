import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";

export const RecipeContext = React.createContext()

export function RecipeProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        auth.createUserWithEmailAndPassword(email, password);
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logOut() {
        return auth.signOut();
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            console.log(user);
            setLoading(false);
        })
        return unsubscribe
    }, []);

    const value = {
        
    }

    return (
        <RecipeContext.Provider value={value}>
            {!loading && children}
        </RecipeContext.Provider>
    )

};