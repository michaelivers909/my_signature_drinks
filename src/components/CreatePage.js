import React from "React";

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function CreatePage() {
    const [ error, setError ] = useState("");
    const [ currentUser, setCurrentUser] = useAuth();

    function handleLogout() {
        setError("");
    try {
        await logOut();
        history.push("/login");
    } catch {
        setError("Failed to Log Out.");
    }
    return (
        <div>
            
        </div>
    )
    }
}

