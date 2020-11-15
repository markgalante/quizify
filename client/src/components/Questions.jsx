import React from "react";
import Options from "./Options";
import { useLocation, useParams } from "react-router-dom";
import { showQuestionEdit } from "../cache";
import { useReactiveVar, useMutation } from "@apollo/client";
import { DELETE_QUESTION } from "../graphql/mutations";
import { QUESTION_LIST } from "../graphql/queries";

import UpdateQuestion from "./UpdateQuestion";

const Questions = ({ questions }) => {
    const [deleteQuestion] = useMutation(DELETE_QUESTION);
    const editQuestion = useReactiveVar(showQuestionEdit);
    const location = useLocation();
    const params = useParams();

    function handleDeleteQuestion(questionId) {
        deleteQuestion({
            variables: { questionId },
            refetchQueries: [{ query: QUESTION_LIST, variables: { id: params.id } }]
        });
    }
    return (
        <div>
            {
                questions.length ?
                    questions.map(question => (
                        <div key={question.id}>
                            {
                                editQuestion
                                    ? <UpdateQuestion question={question.question} questionId={question.id} editQuestion={editQuestion} />
                                    : <h3 onDoubleClick={() => showQuestionEdit(true)}>
                                        {question.question} <span className="delete-button" onClick={() => handleDeleteQuestion(question.id)}>X</span>
                                    </h3>
                            }
                            <div className="options" onClick={() => showQuestionEdit(false)}>
                                <Options options={question.options} questionId={question.id} path={location.pathname} />
                            </div>
                        </div>
                    ))
                    : <em>No questions asked</em>
            }
        </div>
    )
};

export default Questions; 