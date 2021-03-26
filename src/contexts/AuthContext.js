import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";

export const AuthContext = React.createContext()

// export function useAuth() {
    // return useContext(AuthContext);
// 
// }

export function AuthProvider({children}) {
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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            console.log(user);
            setLoading(false);
        })
        return unsubscribe
    }, []);

    const value = {
        currentUser,
        signUp,
        logIn, 
        logOut, 
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

};