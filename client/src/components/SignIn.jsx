import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";
import { UPDATE_USER } from "../graphql/mutations";

const SignIn = () => {
    const history = useHistory();
    const [updateUser] = useMutation(UPDATE_USER);
    const [email, setEmail] = useState("mark@gmail.com");
    const [password, setPassword] = useState("1234");
    const [error, setError] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        axios
            .post("/auth/login", userData)
            .then(res => {
                console.log("res", res.data);
                updateUser({
                    refetchQueries: [{ query: CURRENT_USER }]
                });
                history.push("/");
            })
            .catch(err => {
                setError(true); 
                console.log("ERROR WITH LOGIN", err)
            })
    };

    return (
        <form onSubmit={handleSubmit}>
            {
                error 
                ? <p>Incorrect username or password</p>
                : null
            }
            <div>
                <label>Email</label>
                <input type="text" onChange={e => setEmail(e.target.value)} value={email || ""} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)} value={password || ""} autoComplete="true" />
            </div>

            <button
                type="submit"
                disabled={!email || !password}
            >Submit</button>
        </form>
    );
};

export default SignIn; 