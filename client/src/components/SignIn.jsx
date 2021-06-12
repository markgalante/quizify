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
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="form" id="sign-in">
                {
                    error
                        ? <p>Incorrect username or password</p>
                        : null
                }
                <div className="form-item">
                    <label>Email</label>
                    <input type="text" onChange={e => setEmail(e.target.value)} value={email || ""} className="form-text-input" />
                </div>
                <div className="form-item">
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password || ""} autoComplete="true" className="form-text-input" />
                </div>

                <div className="form-button-div">
                    <button
                        type="submit"
                        form="sign-in"
                        disabled={!email || !password}
                        className="auth-submit-button"
                    >Submit</button>
                </div>
            </form>
        </div>

    );
};

export default SignIn;