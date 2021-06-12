import React, { useState, useEffect } from "react";
import { CURRENT_USER } from "../graphql/queries";
import { UPDATE_USER } from "../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
    const { data, error } = useQuery(CURRENT_USER, { fetchPolicy: "cache-and-network" });
    const [updateUser] = useMutation(UPDATE_USER);
    const [isLoggedIn, setUser] = useState(null);
    const history = useHistory(); 
    useEffect(() => {
        if (data) setUser(data.currentUser);
        if (error) console.log({ error });
    }, [data, error]);

    const logOut = () => {
        axios.get("/auth/logout", {})
            .then(res => {
                console.log("Successful client logout", { res })
                history.push("/");
                updateUser({
                    refetchQueries: [{ query: CURRENT_USER }]
                });
            })
            .catch(err => console.log({ err }))
    }

    return (
        <nav className="main-nav-bar">
            {!isLoggedIn
                ? (
                    <ul className="nav-list">
                        <li className="nav-link"><Link to="/signin">Sign In</Link></li>
                    </ul>)
                : (
                    <ul className="nav-list">
                        <li className="nav-link"><Link to="/">Home</Link> </li>
                        <li className="nav-link"><Link to="/create">Create Quiz</Link></li>
                        <li className="nav-link"><Link to={`/profile/${isLoggedIn.id}`} >My Profile</Link></li>
                        <li className="nav-link" onClick={logOut}><a>Sign Out</a></li>
                    </ul>)}
        </nav>
    );
};

export default NavBar;