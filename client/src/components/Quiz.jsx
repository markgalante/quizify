import React from "react";
import { GET_QUIZ } from "../graphql/queries";
import { useQuery } from "@apollo/client"
import { useRouteMatch } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import Questions from "./Questions"

const Quiz = () => {
    let match = useRouteMatch();
    const { data, loading, error } = useQuery(GET_QUIZ, {
        variables: {
            id: match.params.id,
        }
    }); 

    return (
        <div>
            {
                loading
                    ? <LoadingSpinner />
                    : error
                        ? <Error />
                        : (
                            <div>
                                <h1>{data.quiz.title}</h1>
                                <Questions questions={data.quiz.questions} />
                            </div>
                        )
            }
        </div>
    );
};

export default Quiz; 