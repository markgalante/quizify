import React from "react";
import Options from "./Options";
import { useLocation } from "react-router-dom";

const Questions = ({ questions }) => {
    const location = useLocation();
    return (
        <div>
            {
                questions.length ?
                    questions.map(question => (
                        <div key={question.id}>
                            <h3>{question.question}</h3>
                            <div className="options">
                                <Options options={question.options} questionId={question.id} path={location.pathname} />
                            </div>
                        </div>
                    ))
                    : <em>No questions asked</em>
            }
        </div>
    )
};

export default Questions; 