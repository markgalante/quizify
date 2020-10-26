import React from "react";
import Options from "./Options"; 

const Questions = ({questions}) => {
    return (
        <div>
            {
                questions.length ? 
                questions.map(question => (
                    <div key={question.id}>
                        <h3>{question.question}</h3>
                        <div className="options">
                            <Options /> 
                        </div>
                    </div>
                )) 
                : <em>No questions asked</em>
            }
        </div>
    )
};

export default Questions; 