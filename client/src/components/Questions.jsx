import React, { useState, useEffect } from "react";
import Options from "./Options";
import { useLocation } from "react-router-dom";

import UpdateQuestion from "./UpdateQuestion";

const Questions = ({ questions }) => {
    const location = useLocation();
    const [editQuestion, setEditQuestion] = useState(false);
    useEffect(()=>{
        setEditQuestion(false); 
    }, []); 
    return (
        <div>
            {
                questions.length ?
                    questions.map(question => (
                        <div key={question.id}>
                            {
                                editQuestion
                                    ? <UpdateQuestion question={question.question} id={question.id} editQuestion={editQuestion} />
                                    : <h3 onDoubleClick={() => setEditQuestion(!editQuestion)}>{question.question}</h3>
                            }
                            <div className="options" onClick={() => setEditQuestion(false)}>
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