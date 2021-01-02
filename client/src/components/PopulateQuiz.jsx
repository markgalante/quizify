import React from "react";
import Questions from "./Questions";
import AddQuestion from "./AddQuestion";

const PopulateQuiz = ({ quizData }) => {
    console.log("Passed props to PopulateQuiz", quizData);
    return (
        <div>
            <h1>{quizData.quiz.title}</h1>
            <div>
                <AddQuestion
                    id={quizData.quiz.id}
                    creator={quizData.quiz.creator.id}
                />
                <Questions
                    questions={quizData.quiz.questions}
                    quizId={quizData.quiz.id}
                    creator={quizData.quiz.creator.id}
                />
            </div>
        </div>
    );
};

export default PopulateQuiz; 