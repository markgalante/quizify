import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { showOptionsEdit } from "../cache";
import { UPDATE_OPTION } from "../graphql/mutations";
import { SHOW_OPTIONS } from "../graphql/queries";

const UpdateOption = ({ option, questionId, creator }) => {
    const [updateOption] = useMutation(UPDATE_OPTION);
    const [updatedOption, setOption] = useState("");
    const [updatedIsCorrect, setIsCorrect] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();
        updateOption({
            variables: {
                id: option.id,
                questionId: questionId,
                option: updatedOption,
                isCorrect: updatedIsCorrect,
                creator
            },
            refetchQueries: [{ query: SHOW_OPTIONS, variables: { questionId } }],
        });
        showOptionsEdit(false); 
    }

    useEffect(() => {
        setOption(option.option);
        setIsCorrect(option.isCorrect);
    }, [option.option, option.isCorrect]);

    return (
        <form onSubmit={handleSubmit}>
            <div key={option.id}>
                <input
                    type="checkbox"
                    id={option.option}
                    value={option.option}
                    defaultChecked={option.isCorrect}
                    onChange={() => setIsCorrect(!updatedIsCorrect)}
                />
                <input type="text" value={updatedOption} onChange={e => setOption(e.target.value)} />
            </div>
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateOption; 