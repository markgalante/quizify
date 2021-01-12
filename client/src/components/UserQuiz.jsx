import React, { useEffect, useState } from "react";
import { CURRENT_USER, GET_QUIZZES, QUIZ } from "../graphql/queries";
import { DELETE_QUIZ, SUBMIT_QUIZ } from "../graphql/mutations";
import { useQuery, useReactiveVar, useMutation } from "@apollo/client"
import { useRouteMatch, Link, Switch, Route, BrowserRouter as Router, useHistory, Redirect } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import Questions from "./Questions";
import AddQuestion from "./AddQuestion";
import UpdateQuizName from "./UpdateQuizName";
import { showQuizEdit } from "../cache";

const UserQuiz = () => {
    const [deleteQuiz] = useMutation(DELETE_QUIZ);
    const [submitQuiz] = useMutation(SUBMIT_QUIZ);
    const quizEdit = useReactiveVar(showQuizEdit);
    const history = useHistory();
    let match = useRouteMatch();
    const [isCreator, setCreator] = useState(false);
    const [userId, setUserId] = useState(null);
    const [submitted, setSubmitted] = useState(true);
    const { data, loading, error } = useQuery(QUIZ, {
        variables: {
            id: match.params.id,
        }
    });
    const { data: userData } = useQuery(CURRENT_USER);

    useEffect(() => {
        if (data && userData.currentUser) {
            if (userData.currentUser.id === data.quiz.creator.id) {
                setCreator(true);
                setUserId(userData.currentUser.id)
            } else {
                setCreator(false);
            }
        }
        if (data) {
            setSubmitted(data.quiz.submitted);
        }
    }, [data, userData, isCreator]);

    function handleDeleteQuiz() {
        deleteQuiz({
            variables: {
                id: match.params.id,
                creator: data.quiz.creator.id
            },
            refetchQueries: [{ query: GET_QUIZZES }]
        });
        history.push("/");
    };

    function handleSubmitQuiz() {
        submitQuiz({
            variables: {
                quizId: match.params.id,
                creator: userId
            },
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
                        ? <Error message={error.message} />
                        : (<div>
                            { quizEdit
                                ? (<UpdateQuizName title={data.quiz.title} id={match.params.id} creator={userData.currentUser.id} />)
                                : (<div>
                                    <h1>
                                        {data.quiz.title}
                                        {
                                            isCreator
                                                ? (<>
                                                    {!submitted
                                                        ? <span onClick={() => showQuizEdit(true)} className="curser-pointer" > &#9998;</span>
                                                        : null}
                                                    <span className="delete-button" onClick={handleDeleteQuiz}> &#9747;</span>
                                                </>)
                                                : null
                                        }
                                    </h1>
                                </div>)
                            }
                            <div onClick={() => showQuizEdit(false)}>
                                <Questions quizId={match.params.id} creator={data.quiz.creator.id} submitted={data.quiz.submitted} />
                            </div>

                            <Router>
                                {isCreator && !submitted
                                    ? (<ul>
                                        <li><Link to={`/${match.params.id}/addquestion`}>Add Question</Link></li>
                                    </ul>)
                                    : null
                                }


                                <Switch>
                                    <Route path={`/${match.params.id}/addquestion`}>
                                        {
                                            isCreator
                                                ? <AddQuestion id={match.params.id} creator={data.quiz.creator.id} />
                                                : <Redirect to={`/${match.params.id}`} />
                                        }
                                    </Route>
                                </Switch>
                            </Router>
                            {
                                !submitted
                                    ? <button onClick={handleSubmitQuiz}>Submit Quiz</button>
                                    : null
                            }

                        </div>)
            }
        </div>
    );
};

export default UserQuiz; 