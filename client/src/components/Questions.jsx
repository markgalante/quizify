import React, { useEffect, useState } from "react";
import Options from "./Options";
import { showQuestionEdit } from "../cache";
import { useReactiveVar, useMutation, useQuery } from "@apollo/client";
import { DELETE_QUESTION } from "../graphql/mutations";
import { QUIZ, CURRENT_USER } from "../graphql/queries";

import UpdateQuestion from "./UpdateQuestion";
import LoadingSpinner from "./LoadingSpinner";

const Questions = ({ questions, creator, quizId }) => {
    const [deleteQuestion] = useMutation(DELETE_QUESTION);
    const editQuestion = useReactiveVar(showQuestionEdit);
    const { data: userData } = useQuery(CURRENT_USER);
    const { data: quizData, loading: quizLoading, error: quizError } = useQuery(QUIZ, { variables: { id: quizId } });
    const [isCreator, setisCreator] = useState(null);
    const [quizInfo, setQuestions] = useState(null);

    useEffect(() => {
        if (userData.currentUser) {
            if (userData.currentUser.id === creator) {
                setisCreator(true);
            } else {
                setisCreator(false);
            }
        }
        if (quizData) setQuestions(quizData);
        console.log("useState - questions", { quizInfo });
    }, [userData, creator, quizInfo, setQuestions, quizData, quizLoading, quizError]);

    function handleDeleteQuestion(questionId) {
        deleteQuestion({
            variables: {
                questionId,
                creator: userData.currentUser.id,
            },
            refetchQueries: [{ query: QUIZ, variables: { id: quizId } }]
        });
    }
    return (
        <div>

            {
                quizLoading
                    ? <LoadingSpinner />
                    : !quizInfo
                        ? <p>Error</p>
                        : quizInfo.quiz.questions.map((question, index) => (
                            <div key={index}>
                                {
                                    isCreator
                                        ? (editQuestion
                                            ? <UpdateQuestion question={question} editQuestion={editQuestion} creator={creator} quizId={quizId} />
                                            : (
                                                <div>
                                                    <h3>
                                                        {index + 1}. {question.question}
                                                        <span className="curser-pointer" title="Edit Question" onClick={() => showQuestionEdit(true)}> &#9998;</span>
                                                        <span className="delete-button" title="Delete Question" onClick={() => handleDeleteQuestion(question.id)}> &#9747;</span>
                                                    </h3>

                                                    <div className="options" onClick={() => {
                                                        if (isCreator) showQuestionEdit(false)
                                                    }}>
                                                        <Options options={question.options} creator={creator} questionIndex={index} editQuestion={editQuestion} />
                                                    </div>
                                                </div>
                                            ))
                                        : <h3>{question.question}</h3>
                                }

                            </div>
                        ))
            }
        </div>
    )
};

export default Questions; 