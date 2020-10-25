import React from "react";
import { GET_QUIZ } from "../graphql/queries";
import { useQuery } from "@apollo/client"
import { useRouteMatch } from "react-router-dom";

const Quiz = () => {
    let match = useRouteMatch();
    const { data, loading, error, variables } = useQuery(GET_QUIZ, {
        variables: {
            id: match.params.id, 
        }
    });
    console.log({ loading, data, variables });
    if (error) console.error({ error });

    console.log({ match })
    return (
        <div>Quiz</div>
    );
};

export default Quiz; 