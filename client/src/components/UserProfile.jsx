import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_QUIZZES, COMPLETED_QUIZZES, USER, CURRENT_USER } from "../graphql/queries";

//COMPONENTS 
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import ScoreCard from "./ScoreCard";
import QuizCard from "./QuizCard";
import UnsubmittedQuizList from "./UnsubmittedQuizList";

//STYLES
import "../styles/user-profile.css";

const UserProfile = () => {
    const params = useParams();
    const { data: quizData } = useQuery(USER_QUIZZES);
    const { data: userData, error: userFetchError, loading: userFetchLoading } = useQuery(USER, { variables: { id: params.profile } });
    const { data: currentUser } = useQuery(CURRENT_USER);
    const { data: completedQuizData, error: completedQuizFetchError } = useQuery(COMPLETED_QUIZZES,
        { variables: { userId: params.profile }, fetchPolicy: "no-cache" });

    //STATE
    const [quizzes, getQuizzes] = useState(null);
    const [user, getUser] = useState(null);
    const [current_user, getCurrentUser] = useState(null);
    const [completed, setCompleted] = useState(null);


    useEffect(() => {
        if (quizData) getQuizzes(quizData.myQuizzes);
        if (userData) getUser(userData.user);
        if (completedQuizData) {
            if (completedQuizData.userCompletedQuizzes) setCompleted(completedQuizData.userCompletedQuizzes.completedQuizzes)
        };
        if (currentUser) getCurrentUser(currentUser.currentUser);
        console.log({ current_user, userFetchError });
    }, [quizData, userData, quizzes, user, completedQuizData, completed]);

    if (!user && !userFetchLoading) return <Error message="This user doesn't exist!" />;

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
                {current_user ?
                    current_user.id === params.profile ? <UnsubmittedQuizList /> : null
                    : null}
            </div>
        </div>
    );
};

export default UserProfile;