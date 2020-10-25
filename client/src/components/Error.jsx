import React from "react"; 

const Error = ({message, test}) => {
    return(
        <div>
            Error: {message} {test}
        </div>
    ); 
}; 

export default Error; 