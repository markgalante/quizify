import React from "react";
import { useHistory } from "react-router-dom";

const QuizCard = ({ quizList }) => {
    const history = useHistory();
    return (
        <li className="quiz-list-item">
            {quizList.map(quiz => (
                <div className="quiz-div" onClick={() => { history.push(`/quiz/${quiz.id}`) }}>
                    <p><span className="quiz-title">{quiz.title}</span> - <span>Author</span></p>
                </div>))}
        </li>
    );
};

export default QuizCard;