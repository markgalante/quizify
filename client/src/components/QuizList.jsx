import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_QUIZZES } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import SignInSignUp from "./SignInSignUp"; 
import Error from "./Error";
import Quiz from "./Quiz";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const QuizList = () => {
    //Using useQuery above useState only causes useEffect to run once. 
    const { loading, data, error } = useQuery(GET_QUIZZES);
    const [quizes, setQuizes] = useState(null);
    const [pageLoading, setLoading] = useState(true);
    const [fetchError, setError] = useState(null);
    

    useEffect(() => {
        if(!loading)setLoading(false); 
        if(error) setError(error);
        if(data) setQuizes(data);
    }, [loading, data, error]);

    return (
        <div className="quiz-list">
            <Router>
                {
                    pageLoading
                        ? (<LoadingSpinner />)
                        : fetchError
                            ? <Error message={error.message} />
                            :
                            quizes ?
                                <ul>
                                    <Route>
                                        {
                                            quizes.quizes.map(quiz => (
                                                <li key={quiz.id}><Link to={`/${quiz.id}`}>{quiz.title}</Link></li>
                                            ))
                                        }
                                    </Route>
                                </ul>
                            : null
                }

                <Switch>
                    <Route path="/:id"><Quiz /></Route>
                    <Route path="/signinsignup"><SignInSignUp /></Route>
                </Switch>
            </Router>

        </div>
    )
};

export default QuizList; 