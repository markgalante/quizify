import React from "react";
import { GET_QUIZ, GET_QUIZZES } from "../graphql/queries";
import { DELETE_QUIZ } from "../graphql/mutations";
import { useQuery, useReactiveVar, useMutation } from "@apollo/client"
import { useRouteMatch, Link, Switch, Route, BrowserRouter as Router, useHistory } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import Questions from "./Questions";
import AddQuestion from "./AddQuestion";
import UpdateQuizName from "./UpdateQuizName";
import { showQuizEdit } from "../cache";

const Quiz = () => {
    const [deleteQuiz] = useMutation(DELETE_QUIZ);
    const quizEdit = useReactiveVar(showQuizEdit);
    const history = useHistory(); 
    let match = useRouteMatch();
    const { data, loading, error } = useQuery(GET_QUIZ, {
        variables: {
            id: match.params.id,
        }
    });

    function handleDeleteQuiz() {
        deleteQuiz({
            variables: { id: match.params.id },
            refetchQueries: [{ query: GET_QUIZZES }]
        });
        history.push("/");
    }
    
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
                                                <h1 onDoubleClick={() => showQuizEdit(true)}>
                                                    {data.quiz.title} <span className="delete-button" onClick={handleDeleteQuiz}>X</span>
                                                </h1>
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