import { useQuery } from "@apollo/client";
import React from "react";
import { GET_QUIZZES } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import Quiz from "./Quiz";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const QuizList = () => {
    const { loading, data, error } = useQuery(GET_QUIZZES);

    return (
        <div className="quiz-list">
            <Router>
                {
                    loading
                        ? (<LoadingSpinner />)
                        : error
                            ? <Error message={error.message} />
                            : <ul>
                                <Route>
                                    {
                                        data.quizes.map(quiz => (
                                            <li key={quiz.id}><Link to={`/${quiz.id}`}>{quiz.title}</Link></li>
                                        ))
                                    }
                                </Route>
                            </ul>
                }

                <Switch>
                    <Route path="/:id"><Quiz /></Route>
                </Switch>
            </Router>

        </div>
    )
};

export default QuizList; 