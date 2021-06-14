import React from "react";
import "../styles/score-card.css";
import "../styles/text.css";

const ScoreCard = () => {
    return (
        <div className="score-card">
            <p><span className="bold">Quiz Name</span> - <span className="italics">20/20</span></p>
        </div>
    );
};

export default ScoreCard;

