import React from "react";
import Question from "./Question";

const Questions = ({ questions, creator }) => {
    return questions.map((question, index) => (
        <div key={index}>
            <Question options={question.options} questionId={question.id} question={question.question} creator={creator} index={index + 1} questionIndex={index} />
        </div>
    ));
};

export default Questions;