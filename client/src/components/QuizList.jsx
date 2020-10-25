import { useQuery } from "@apollo/client";
import React from "react";
import { GET_QUIZZES } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";

const QuizList = () => {
    const { loading, data, error } = useQuery(GET_QUIZZES);

    return (
        <div className="quiz-list">
            {
                loading
                    ? (<LoadingSpinner />)
                    : error
                        ? <Error message={error.message}/>
                        : <ul>
                            {
                                data.quizes.map(quiz => (
                                    <li key={quiz.id}><a href={`/${quiz.id}`}>{quiz.title}</a></li>
                                ))
                            }
                        </ul>
            }
        </div>
    )
};

export default QuizList; 