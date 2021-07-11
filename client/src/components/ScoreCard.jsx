import React from "react";
import "../styles/score-card.css";
import "../styles/text.css";

const ScoreCard = ({ quizzes }) => {
    return (
        <div>
            {quizzes.map((quiz, key) => (
                <li className="score-card" key={key}>
                    <p>
                        <span className="bold">{quiz.quiz.title} </span>
                        <span className="italics">{quiz.score}/{quiz.totalQuestions}</span>
                    </p>
                </li>))}
        </div>
    );
};

export default ScoreCard;

