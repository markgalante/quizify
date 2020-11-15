import React from "react";
import { GET_QUIZ } from "../graphql/queries";
import { useQuery, useReactiveVar } from "@apollo/client"
import { useRouteMatch, Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import Questions from "./Questions";
import AddQuestion from "./AddQuestion";
import UpdateQuizName from "./UpdateQuizName";
import { showQuizEdit } from "../cache";

const Quiz = () => {
    const quizEdit = useReactiveVar(showQuizEdit);
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
                                {
                                    quizEdit
                                        ? (<UpdateQuizName title={data.quiz.title} id={match.params.id} />)
                                        : (
                                            <div>
                                                <h1 onDoubleClick={() => showQuizEdit(true)}>{data.quiz.title} <span className="delete-button">X</span></h1>
                                            </div>
                                        )
                                }
                                <div onClick={() => showQuizEdit(false)}>
                                    <Questions questions={data.quiz.questions} quizId={match.params.id} />
                                </div>

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