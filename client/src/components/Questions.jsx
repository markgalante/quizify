import React, { useEffect, useState } from "react";
import Options from "./Options";
import { useParams } from "react-router-dom";
import { showQuestionEdit } from "../cache";
import { useReactiveVar, useMutation, useQuery } from "@apollo/client";
import { DELETE_QUESTION } from "../graphql/mutations";
import { QUIZ, CURRENT_USER } from "../graphql/queries";

import UpdateQuestion from "./UpdateQuestion";

const Questions = ({ questions, creator, quizId }) => {
    const [deleteQuestion] = useMutation(DELETE_QUESTION);
    const editQuestion = useReactiveVar(showQuestionEdit);
    const { data: userData } = useQuery(CURRENT_USER);
    const [isCreator, setisCreator] = useState(null);
    const params = useParams();

    useEffect(() => {
        if (userData.currentUser) {
            if (userData.currentUser.id === creator) {
                setisCreator(true);
            } else {
                setisCreator(false);
            }
        }
        console.log()
    }, [userData, creator]);

    function handleDeleteQuestion(questionId) {
        console.log(questionId, userData.currentUser.id)
        deleteQuestion({
            variables: {
                questionId,
                creator: userData.currentUser.id,
            },
            refetchQueries: [{ query: QUIZ, variables: { id: quizId } }]
        });
    }
    return (
        <form>
            {
                questions.length ?
                    questions.map((question, index) => (
                        <div key={index}>
                            {
                                isCreator
                                    ? (editQuestion
                                        ? <UpdateQuestion question={question} editQuestion={editQuestion} creator={creator} />
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
                    : <em>No questions asked</em>
            }
        </form>
    )
};

export default Questions; 