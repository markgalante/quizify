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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
                <label>Confirm password</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
            </div>


            <button
                type="submit"
                disabled={!email || !password || password !== confirm}
            >Submit</button>
        </form>
    );
};

export default SignUp; 