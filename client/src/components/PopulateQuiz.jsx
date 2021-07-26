import React from "react";
import { useHistory } from "react-router-dom";
import { useReactiveVar, useMutation } from "@apollo/client";
import { DELETE_QUIZ } from "../graphql/mutations"
import { GET_QUIZZES } from "../graphql/queries";
import { showQuizEdit } from "../cache";
import MyUnsubmittedQuiz from "./MyUnsubmittedQuiz";
import AddQuestion from "./AddQuestion";
import UpdateQuizName from "./update-quiz/UpdateQuizName";

const PopulateQuiz = ({ quizData }) => {
    const [deleteQuiz] = useMutation(DELETE_QUIZ);
    const quizEdit = useReactiveVar(showQuizEdit);
    const history = useHistory();

    function deleteNewQuiz() {
        deleteQuiz({
            variables: {
                id: quizData.quiz.id,
                creator: quizData.quiz.creator.id
            },
            refetchQueries: [{ query: GET_QUIZZES }]
        });
        history.push("/");
    }

    return (
        <div>
            {
                quizEdit
                    ? <UpdateQuizName id={quizData.quiz.id} title={quizData.quiz.title} creator={quizData.quiz.creator.id} />
                    : (<h1>{quizData.quiz.title}
                        <span onClick={() => showQuizEdit(true)} className="curser-pointer" > &#9998;</span>
                        <span onClick={deleteNewQuiz} className="curser-pointer" > &#9747;</span>
                    </h1>)
            }


            <div>
                <AddQuestion
                    id={quizData.quiz.id}
                    creator={quizData.quiz.creator.id}
                />
                <MyUnsubmittedQuiz
                    questions={quizData.quiz.questions}
                    quizId={quizData.quiz.id}
                    creator={quizData.quiz.creator.id}
                />
            </div>
        </div>
    );
};

export default PopulateQuiz; 