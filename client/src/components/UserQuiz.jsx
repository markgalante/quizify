import React, { useEffect, useState } from "react";
import { CURRENT_USER, GET_QUIZZES, QUIZ } from "../graphql/queries";
import { DELETE_QUIZ } from "../graphql/mutations";
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
    const quizEdit = useReactiveVar(showQuizEdit);
    const history = useHistory();
    let match = useRouteMatch();
    const [isCreator, setCreator] = useState(false);
    const { data, loading, error } = useQuery(QUIZ, {
        variables: {
            id: match.params.id,
        }
    });
    const { data: userData } = useQuery(CURRENT_USER);

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

    useEffect(() => {
        if (data && userData.currentUser) {
            if (userData.currentUser.id === data.quiz.creator.id) {
                setCreator(true);
            } else {
                setCreator(false);
            }
        }
    }, [data, userData, isCreator]);

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
                                                    <span onClick={() => showQuizEdit(true)} className="curser-pointer" > &#9998;</span>
                                                    <span className="delete-button" onClick={handleDeleteQuiz}> &#9747;</span></>)
                                                : null
                                        }
                                    </h1>
                                </div>)
                            }
                            <div onClick={() => showQuizEdit(false)}>
                                <Questions questions={data.quiz.questions} quizId={match.params.id} creator={data.quiz.creator.id} />
                            </div>

                            <Router>
                                {isCreator
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

                        </div>)
            }
        </div>
    );
};

export default UserQuiz; 