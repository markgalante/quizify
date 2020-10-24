import { useQuery } from "@apollo/client";
import React from "react";
import { GET_QUIZZES } from "../graphql/queries"

const QuizList = () => {
    const { loading, data, error } = useQuery(GET_QUIZZES);
    if (loading) console.log("loading")
    if (data) console.log({ data });
    if (error) console.log({ error });
    return (
        <div className="quiz-list">
            List of quizes
            <ul>
                {
                    data.quizes.map(quiz => (
                        <li key={quiz.id}>{quiz.title}</li>
                    ))
                }
            </ul>

        </div>
    )
};

export default QuizList; 