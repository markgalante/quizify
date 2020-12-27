import React, { useEffect, useState } from "react";
import Options from "./Options";
import { useLocation, useParams } from "react-router-dom";
import { showQuestionEdit } from "../cache";
import { useReactiveVar, useMutation, useQuery } from "@apollo/client";
import { DELETE_QUESTION } from "../graphql/mutations";
import { QUIZ, CURRENT_USER } from "../graphql/queries";

import UpdateQuestion from "./UpdateQuestion";

const Questions = ({ questions, creator }) => {
    const [deleteQuestion] = useMutation(DELETE_QUESTION);
    const editQuestion = useReactiveVar(showQuestionEdit);
    const { data: userData } = useQuery(CURRENT_USER);
    const [isCreator, setisCreator] = useState(null);
    const location = useLocation();
    const params = useParams();
    console.log({questions, creator, location, params})

    useEffect(() => {
        if (userData.currentUser) {
            if (userData.currentUser.id === creator) {
                setisCreator(true);
            } else {
                setisCreator(false);
            }
        }
    }, [userData, creator]);

    function handleDeleteQuestion(questionId) {
        deleteQuestion({
            variables: { questionId, creator },
            refetchQueries: [{ query: QUIZ, variables: { id: params.id } }]
        });
    }
    return (
        <div>
            {
                questions.length ?
                    questions.map((question, index) => (
                        <div key={index}>
                            {
                                isCreator
                                    ? (editQuestion
                                        ? <UpdateQuestion question={question.question} questionId={question.id} editQuestion={editQuestion} creator={creator} />
                                        : <h3 onDoubleClick={() => showQuestionEdit(true)}>
                                            {question.question} <span className="delete-button" onClick={() => handleDeleteQuestion(question.id)}>X</span>
                                        </h3>)
                                    : <h3>{question.question}</h3>
                            }
                            <div className="options" onClick={() => {
                                if (isCreator) showQuestionEdit(false)
                            }}>
                                <Options options={question.options} creator={creator} questionIndex={index} />
                            </div>
                        </div>
                    ))
                    : <em>No questions asked</em>
            }
        </div>
    )
};

export default Questions; 