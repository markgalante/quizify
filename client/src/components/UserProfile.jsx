import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_QUIZZES, COMPLETED_QUIZZES, USER } from "../graphql/queries";

//COMPONENTS 
import LoadingSpinner from "./LoadingSpinner";
import UserQuiz from "./UserQuiz";
import Error from "./Error";
import ScoreCard from "./ScoreCard";
import QuizCard from "./QuizCard";

//STYLES
import "../styles/user-profile.css";

const UserProfile = () => {
    const params = useParams();
    const { data: quizData } = useQuery(USER_QUIZZES);
    const { data: userData } = useQuery(USER, { variables: { id: params.profile } });
    const { data: completedQuizData } = useQuery(COMPLETED_QUIZZES,
        { variables: { userId: params.profile }, fetchPolicy: "no-cache" });

    //STATE
    const [quizzes, getQuizzes] = useState(null);
    const [user, getUser] = useState(null);
    const [completed, setCompleted] = useState(null);


    useEffect(() => {
        if (quizData) getQuizzes(quizData.myQuizzes);
        if (userData) getUser(userData.user);
        if (completedQuizData) setCompleted(completedQuizData.userCompletedQuizzes.completedQuizzes);
    }, [quizData, userData, quizzes, user, completedQuizData, completed]);

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
                            <ScoreCard quizzes={completed} />
                        </ul>)
                        : <p>Nothing...yet</p>}
                </div>
            </div>
            <div className="user-profile-wrapper">
                {user ?
                    user.id === params.profile ? <p>This is the user</p> : null
                    : null}
            </div>
        </div>
    );
};

export default UserProfile;