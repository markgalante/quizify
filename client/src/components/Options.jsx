import React from "react";

const Options = ({ options, creator, questionIndex, editQuestion }) => {
    console.log({ editQuestion, creator });

    return (
        <div>
            {
                options.length
                    ? options.map((option, index) => (
                        <div key={index}>
                            <input type="radio" id={option.option} value={option.option} name={questionIndex} />
                            <label htmlFor={option.option}>{option.option}</label>
                        </div>

                    ))
                    : <p>No options added</p>
            }
        </div>
    );
};

export default Options; 