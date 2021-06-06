import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_QUIZZES, CURRENT_USER, COMPLETED_QUIZZES, GET_QUIZZES } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import UserQuiz from "./UserQuiz";
import Error from "./Error";

const UserProfile = () => {
    const params = useParams();
    const { data: quizData, loading: quizLoading, error: quizError } = useQuery(USER_QUIZZES);
    const { data: userData } = useQuery(CURRENT_USER);
    const { data: completedQuizData, loading: completedQuizLoading, error: completedQuizError } = useQuery(COMPLETED_QUIZZES,
        { variables: { userId: params.profile }, fetchPolicy: "no-cache" });
    const [quizzes, getQuizzes] = useState(null);
    const [user, getUser] = useState(null);
    const [completed, setCompleted] = useState(null);


    useEffect(() => {
        if (quizData) getQuizzes(quizData.myQuizzes);
        if (userData) getUser(userData.currentUser);
        if (completedQuizData) setCompleted(completedQuizData);
        console.log({ params })
    }, [quizData, userData, quizzes, user]);

    return (
        <div>
            <Router>
                {user
                    ? <h2>{user.email}</h2>
                    : <LoadingSpinner />
                }

                {quizLoading
                    ? <LoadingSpinner />
                    : quizError
                        ? <p>Error</p>
                        : quizzes
                            ? (<Route>
                                {quizzes.map(quiz =>
                                    <li key={quiz.id} className="nav-link"><Link to={`/profile/user-quiz/${quiz.id}`}>{quiz.title}</Link></li>)}
                            </Route>)
                            : <Error />
                }
                <Switch>
                    <Route path="/profile/user-quiz/:id"><UserQuiz /></Route>
                </Switch>
            </Router>
        </div>
    )
};

export default UserProfile;