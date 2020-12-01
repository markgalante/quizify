import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 

const SignIn = () => {
    const history = useHistory(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleSubmit(e) {
        e.preventDefault(); 
        const userData = {
            email,
            password
        }
        axios
            .post("/auth/login", userData, {withCredentials: true})
            .then(res => {
                history.push("/");
                console.log("RESPONSE", res)
            })
            .catch(err => console.log("ERROR", err.response))
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Emailaaaa</label>
                <input type="text" onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </div>

            <button
                type="submit"
                disabled={!email || !password}
            >Submit</button>
        </form>
    );
};

export default SignIn; 