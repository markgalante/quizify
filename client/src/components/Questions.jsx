import React from "react";
import Options from "./Options"; 

const Questions = ({questions}) => {
    // console.log(questions)
    return (
        <div>
            {
                questions.length ? 
                questions.map(question => (
                    <div key={question.id}>
                        <h3>{question.question}</h3>
                        <div className="options">
                            <Options options={question.options}/> 
                        </div>
                    </div>
                )) 
                : <em>No questions asked</em>
            }
        </div>
    )
};

export default Questions; 