import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_OPTION } from "../graphql/mutations";
import { SHOW_OPTIONS } from "../graphql/queries";

const AddOption = ({ options, questionId }) => {
    const [addOption] = useMutation(ADD_OPTION);
    const [option, setOption] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    let allowCorrectAnser = true;
    for (let i = 0; i < options.length; i++) {
        if (options[i].isCorrect) allowCorrectAnser = false;
    };

    function handleSubmit(e) {
        e.preventDefault();
        addOption({
            variables: {
                questionId,
                option,
                isCorrect
            },
            refetchQueries: [{ query: SHOW_OPTIONS, variables: {questionId}}],
        });
        setOption(''); 
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                {options.length > 5
                    ? (<input type="text" disabled />)
                    : (
                        <div>
                            {
                                allowCorrectAnser
                                    ? <input type="checkbox" onChange={() => setIsCorrect(!isCorrect)} />
                                    : <input type="checkbox" disabled />
                            }
                            <input type="text" onChange={e => setOption(e.target.value)} value={option || ""} />
                            <button type="submit">Add</button>
                        </div>)
                }

            </form>
        </div>
    );
};

export default AddOption; 