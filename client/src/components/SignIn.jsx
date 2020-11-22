import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleSubmit(e) {
        e.preventDefault(); 
        const userData = {
            email,
            password
        }
        console.log({userData}); 
        axios
            .post("/server/auth/login", userData)
            .then(res => console.log(res))
            .catch(err => console.log(err.response))
        console.log("promise has run"); 
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
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