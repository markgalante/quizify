import React, { useState, useEffect } from "react";
import { GET_QUIZ } from "../graphql/queries";
import { useQuery } from "@apollo/client"
import { useRouteMatch, Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import Questions from "./Questions";
import AddQuestion from "./AddQuestion";
import UpdateQuizName from "./UpdateQuizName";

const Quiz = () => {
    let match = useRouteMatch();
    const [edit, showEdit] = useState(false);
    const { data, loading, error } = useQuery(GET_QUIZ, {
        variables: {
            id: match.params.id,
        }
    });

    useEffect(() => {
        showEdit(false);
    }, [data])

    return (
        <div>
            {
                loading
                    ? <LoadingSpinner />
                    : error
                        ? <Error />
                        : (
                            <div>
                                {
                                    edit
                                        ? (<UpdateQuizName title={data.quiz.title} id={match.params.id} edit={edit} />)
                                        : (
                                            <div>
                                                <h1 onDoubleClick={() => showEdit(true)}>{data.quiz.title}</h1>
                                            </div>
                                        )
                                }

                                <Questions questions={data.quiz.questions} quizId={match.params.id} />
                                <Router>
                                    <ul>
                                        <li><Link to={`/${match.params.id}/addquestion`}>Add Question</Link></li>
                                    </ul>

                                    <Switch>
                                        <Route path={`/${match.params.id}/addquestion`}><AddQuestion id={match.params.id} /></Route>
                                    </Switch>
                                </Router>

                            </div>
                        )
            }
        </div>
    );
};

export default Quiz; 