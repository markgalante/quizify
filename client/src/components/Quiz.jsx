import React from "react";
import { GET_QUIZ } from "../graphql/queries";
import { useQuery } from "@apollo/client"
import { useRouteMatch } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error"; 

const Quiz = () => {
    let match = useRouteMatch();
    const { data, loading, error, variables } = useQuery(GET_QUIZ, {
        variables: {
            id: match.params.id,
        }
    });
    console.log({ loading, data, variables });
    if (data) console.log(data.quiz.title);
    if (error) console.error({ error });
    console.log({ match });

    const question = (
            data.quiz.questions.map(question => (
            <div key={question.id}>{question.question}</div>
            ))
        );
    console.log({question})
    return (
        <div>
            {
                loading
                    ? <LoadingSpinner />
                    : error
                        ? <Error />
                        : (
                            <h1>{data.quiz.title}</h1>
                        )
            }
        </div>
    );
};

export default Quiz; 