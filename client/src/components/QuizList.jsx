import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SUBMITTED_QUIZZES } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import SignInSignUp from "./SignInSignUp"; 
import Error from "./Error";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SubmittedQuiz from "./SubmittedQuiz";

const QuizList = () => {
    //Using useQuery above useState only causes useEffect to run once. 
    const { loading, data, error } = useQuery(SUBMITTED_QUIZZES);
    const [quizzes, setQuizzes] = useState(null);
    const [pageLoading, setLoading] = useState(true);
    const [fetchError, setError] = useState(null);
    

    useEffect(() => {
        if(!loading)setLoading(false); 
        if(error) setError(error);
        if(data) setQuizzes(data.submittedQuizzes);
    }, [loading, data, error, quizzes]);

    return (
        <div className="quiz-list">
            <Router>
                {
                    pageLoading
                        ? (<LoadingSpinner />)
                        : fetchError
                            ? <Error message={error.message} />
                            :
                            quizzes ?
                                <ul>
                                    <Route>
                                        {
                                            quizzes.map(quiz => (
                                                <li key={quiz.id}><Link to={`/${quiz.id}`}>{quiz.title}</Link></li>
                                            ))
                                        }
                                    </Route>
                                </ul>
                            : null
                }

                <Switch>
                    <Route path="/:id"><SubmittedQuiz /></Route>
                    <Route path="/signinsignup"><SignInSignUp /></Route>
                </Switch>
            </Router>
        </div>
    )
};

export default QuizList; 