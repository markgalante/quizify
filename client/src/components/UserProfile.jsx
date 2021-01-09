import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_QUIZZES, CURRENT_USER } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import UserQuiz from "./UserQuiz";
import Error from "./Error";

const UserProfile = () => {
    const { data: quizData, loading: quizLoading, error: quizError } = useQuery(USER_QUIZZES);
    const { data: userData } = useQuery(CURRENT_USER);
    const [quizzes, getQuizzes] = useState(null);
    const [user, getUser] = useState(null);

    useEffect(() => {
        if (quizData) getQuizzes(quizData.myQuizzes);
        if (userData) getUser(userData.currentUser);
    }, [quizData, userData, quizzes, user]);

    return (
        <div>
            <Router>


                {user
                    ? <h2>{user.email}</h2>
                    : <LoadingSpinner />
                }

                {
                    quizLoading
                        ? <LoadingSpinner />
                        : quizError
                            ? <p>Error</p>
                            : quizzes
                                ? (
                                    <Route>
                                        {
                                            quizzes.map(quiz => <li key={quiz.id}><Link to={`/profile/${quiz.id}`}>{quiz.title}</Link></li>)
                                        }
                                    </Route>)
                                : <Error />
                }
                <Switch>
                    <Route path="/profile/:id"><UserQuiz /></Route>
                </Switch>
            </Router>
        </div>
    )
};

export default UserProfile; 