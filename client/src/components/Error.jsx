import React from "react";

const Error = ({ message }) => {
    return (
        <div className="message-box">
            <div>
                <h3 className="centre-text">ERROR:</h3>
                <p className="centre-text">{message}</p>
            </div>

        </div>
    );
};

export default Error;