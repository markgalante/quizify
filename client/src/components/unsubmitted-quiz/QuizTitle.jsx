import React, { useState } from "react";
import UpdateQuizName from "../update-quiz/UpdateQuizName";

const QuizTitle = ({ title }) => {
    const [edit, setEdit] = useState(false);

    switch (edit) {
        case true:
            return <UpdateQuizName title={title} setEdit={setEdit} />
        case false:
            return (
                <div>
                    <h2>
                        {title}
                        <span className="curser-pointer" title="Edit Quiz Title" onClick={() => setEdit(true)}> &#9998;</span>
                    </h2>
                </div>
            )
    }
};

export default QuizTitle;