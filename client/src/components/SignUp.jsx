import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import { useHistory } from "react-router-dom"

const SignUp = () => {
    const [addUser] = useMutation(ADD_USER);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        addUser({
            variables: {
                email,
                password
            }
        });
        history.push("/");
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-item">
                    <label>Email</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-text-input" />
                </div>
                <div className="form-item">
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-text-input" />
                </div>
                <div className="form-item">
                    <label>Confirm password</label>
                    <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="form-text-input" />
                </div>
                <div className="form-button-div">
                    <button
                        type="submit"
                        disabled={!email || !password || password !== confirm}
                        className="auth-submit-button"
                    >Submit</button>
                </div>
            </form>
        </div>

    );
};

export default SignUp;