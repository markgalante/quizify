import React from "react";

const Options = ({ options }) => {
    const answerOptions = options.map(option => (
        <div key={option.id}>
            <input type="radio" id={option.option} name="answer" value={option.option} /> <label>{option.option}</label>
        </div>
    ));

    return (
        <form>
            {answerOptions}
        </form>
    );
};

export default Options; 