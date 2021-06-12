import React from "react"; 

import SignIn from "./SignIn"; 
import SignUp from "./SignUp"; 

const SignInSignUp = () => {
    return(
        <div className="auth-form">
            <SignIn /> 
            <SignUp /> 
        </div>
    )
}

export default SignInSignUp; 