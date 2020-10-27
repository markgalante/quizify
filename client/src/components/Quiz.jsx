import React from "react";
import { GET_QUIZ } from "../graphql/queries";
import { useQuery } from "@apollo/client"
import { useRouteMatch, Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import Questions from "./Questions";
import AddQuestion from "./AddQuestion";

const Quiz = () => {
    let match = useRouteMatch();
    const { data, loading, error } = useQuery(GET_QUIZ, {
        variables: {
            id: match.params.id,
        }
    });
    console.log(match.params.id); 

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
                                <Router>
                                    <ul>
                                        <li><Link to={`/${match.params.id}/addquestion`}>Add Question</Link></li>
                                    </ul>

                                    <Switch>
                                        <Route path={`/${match.params.id}/addquestion`}><AddQuestion /></Route>
                                    </Switch>
                                </Router>

                            </div>
                        )
            }
        </div>
    );
};

export default Quiz; 