import React, { useState } from "react";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <form action="/login" method="POST">
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