import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_QUESTION } from "../../graphql/mutations";
import { QUIZ_OF_USER, CURRENT_USER } from "../../graphql/queries";

//React-Router
import { useRouteMatch } from "react-router-dom";

// Components 
import UpdateQuestion from "../update-quiz/UpdateQuestion";
import Options from "../unsubmitted-quiz/Options";


const Question = ({ question, index, options, creator, questionIndex, questionId }) => {
    const match = useRouteMatch();
    const [deleteQuestion] = useMutation(DELETE_QUESTION);
    const { data: userData } = useQuery(CURRENT_USER);
    const { data: quizData, loading: quizLoading, error: quizError } = useQuery(QUIZ_OF_USER, { variables: { id: match.params.id } });

    const handleDeleteQuestion = (questionId) => {
        deleteQuestion({
            variables: {
                questionId,
                creator: userData.currentUser.id,
            },
            refetchQueries: [{ query: QUIZ_OF_USER, variables: { id: match.params.id } }]
        });
    };
    const [editQuestion, setEditQuestion] = useState(false);

    if (editQuestion) {
        return <UpdateQuestion
            question={question}
            options={options}
            setEditQuestion={setEditQuestion}
            questionId={questionId}
            creator={creator}
            index={index}
        />
    } else {
        return (
            <div>
                <div className="question-title-div"><h3>
                    {index}. {question}
                    <span className="curser-pointer" title="Edit Question" onClick={() => setEditQuestion(true)}> &#9998;</span>
                    <span className="delete-button" title="Delete Question"> &#9747;</span>
                </h3></div>
                <div className="question-options-div">
                    <Options options={options} creator={creator} questionIndex={questionIndex} />
                </div>
            </div>
        );
    }


};

export default Question;