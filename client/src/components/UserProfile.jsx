import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_QUIZZES, CURRENT_USER, COMPLETED_QUIZZES } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import UserQuiz from "./UserQuiz";
import Error from "./Error";
import QuizCard from "./QuizCard";
import "../styles/user-profile.css";

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
            {user ? <h2 className="header-text">{user.email}</h2> : <LoadingSpinner />}
            <div className="user-profile-wrapper">
                <div className="test">
                    <h3>User's Quizzes</h3>
                    <ul className="quiz-list-element">
                        {quizzes ? <QuizCard quizList={quizzes} /> : <p>No quizzes</p>}
                    </ul>
                </div>
                <div className="test">
                    <h3>Completed Quizzes</h3>
                    {completed ?
                        (<ul className="quiz-list-element">
                            <li>Hi</li>
                        </ul>)
                        : <p>Nothing...yet</p>}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;