import React from "react";

const Questions = ({questions}) => {
    return (
        <div>
            {
                questions.length ? 
                questions.map(question => (
                    <div key={question.id}>{question.question}</div>
                )) 
                : <em>No questions asked</em>
            }
        </div>
    )
};

export default Questions; 