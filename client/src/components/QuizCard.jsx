import React from "react";
import { useHistory } from "react-router-dom";

const QuizCard = ({ quizId, quizTitle }) => {
    const history = useHistory();
    return (
        <li className="quiz-list-item">
            <div className="quiz-div" onClick={() => { history.push(`/quiz/${quizId}`) }}>
                <p><span className="quiz-title">{quizTitle}</span> - <span>Author</span></p>
            </div>
        </li>
    );
};

export default QuizCard;