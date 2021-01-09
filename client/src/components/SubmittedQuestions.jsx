import React from "react";
import SubmittedOptions from "./SubmittedOptions";

const SubmittedQuestions = ({ questions }) => {

    return (
        <form>
            {
                questions.map((question, index) => (
                    <div key={index}>
                        <h3>{index + 1}. {question.question}</h3>
                        <SubmittedOptions options={question.options} question={question.id} questionIndex={index} />
                    </div>
                ))
            }
        </form>
    )
};

export default SubmittedQuestions;

