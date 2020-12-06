import React, { useEffect, useState } from "react";
import AddOption from "./AddOption";
import LoadingSpinner from "./LoadingSpinner";
import UpdateOption from "./UpdateOption"
import Error from "./Error";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { SHOW_OPTIONS, CURRENT_USER } from "../graphql/queries";
import { DELETE_OPTION } from "../graphql/mutations";
import { showOptionsEdit } from "../cache";

const Options = ({ questionId, creator }) => {
    const editOptions = useReactiveVar(showOptionsEdit);
    const [deleteOption] = useMutation(DELETE_OPTION);
    const { data, loading, error } = useQuery(SHOW_OPTIONS, {
        variables: {
            questionId
        }
    });
    const { data: userData } = useQuery(CURRENT_USER);

    const [showOptions, setOptions] = useState(null);
    const [pageLoading, setLoading] = useState(true);
    const [fetchError, setError] = useState(null);
    const [isCreator, setIsCreator] = useState(null);

    function handleOptionDelete(id) {
        deleteOption({
            variables: { id, creator },
            refetchQueries: [{ query: SHOW_OPTIONS, variables: { questionId } }]
        })
    };

    useEffect(() => {
        if (!loading) setLoading(false);
        if (data) setOptions(data);
        if (error) setError(error.message);
        if (userData.currentUser) {
            if (userData.currentUser.id === creator) setIsCreator(true)
            else setIsCreator(false)
        }

        console.log({ isCreator });
    }, [loading, data, error, isCreator, userData, creator]);

    return (
        <div>
            <div>
                {
                    pageLoading
                        ? <LoadingSpinner />
                        : showOptions
                            ? showOptions.options.length
                                ? showOptions.options.map(option => (
                                    <div key={option.id} onDoubleClick={() => showOptionsEdit(!editOptions)}>
                                        {
                                            isCreator
                                                ? (
                                                    editOptions
                                                        ? <UpdateOption option={option} questionId={questionId} />
                                                        : (
                                                            <form>
                                                                <input type="radio" id={option.option} name="answer" value={option.option} />
                                                                <label>{option.option}</label> <span className="delete-button" onClick={() => handleOptionDelete(option.id)}>X</span>
                                                            </form>
                                                        )
                                                )
                                                : (<form>
                                                    <input type="radio" id={option.option} name="answer" value={option.option} />
                                                    <label>{option.option}</label>
                                                </form>)
                                        }
                                    </div>
                                ))
                                : <em>No options given</em>
                            : <Error message={fetchError.message} />
                }
            </div>
            {
                showOptions && !editOptions && isCreator
                    ? (
                        <AddOption options={showOptions.options} questionId={questionId} />
                    )
                    : null
            }


        </div>
    );
};

export default Options; 