import React from "react";
import AddOption from "./AddOption";

const Options = ({ options, questionId }) => {
    const answerOptions = options.map(option => (
        <div key={option.id}>
            <input type="radio" id={option.option} name="answer" value={option.option} /> <label>{option.option}</label>
        </div>
    ));

    return (
        <div>
            <form>
                {answerOptions}
            </form>
            <AddOption length={options.length} questionId={questionId} /> 
        </div>
    );
};

export default Options; 