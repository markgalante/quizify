import React, { useEffect, useState } from "react";

// GRAPH QL
import { useQuery } from "@apollo/client";
import { UNSUBMITTED_QUIZZES_LIST } from "../graphql/queries";

// COMPONENT IMPORTS
import QuizCard from "./QuizCard";

const UnsubmittedQuizList = () => {
    const { data: unsubmittedQuizData, error: unsubmittedQuizError } = useQuery(UNSUBMITTED_QUIZZES_LIST);
    const [quizData, setQuizData] = useState(null);
    const [quizError, setQuizError] = useState(null);

    useEffect(() => {
        if (unsubmittedQuizData) setQuizData(unsubmittedQuizData.myUnsubmittedQuizzes);
        if (unsubmittedQuizError) setQuizError(unsubmittedQuizError);
    }, [quizData, setQuizData, unsubmittedQuizData, quizError, setQuizError, unsubmittedQuizError]);

    return (
        <div>
            <p>Unsubmitted Quiz List</p>
            {quizData
                ? <ul className="quiz-list-element"><QuizCard quizList={quizData} /></ul>
                : quizError
                    ? <p>ERROR:</p>
                    : null}
        </div>
    );
};

export default UnsubmittedQuizList;