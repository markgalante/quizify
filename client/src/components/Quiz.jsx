import React from "react";
import { useRouteMatch } from "react-router-dom";

const Quiz = () => {
    let match = useRouteMatch();
    console.log({match})
    return (
        <div>Quiz</div>
    );
};

export default Quiz; 