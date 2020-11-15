import React, { useEffect, useState } from "react";
import AddOption from "./AddOption";
import LoadingSpinner from "./LoadingSpinner";
import UpdateOption from "./UpdateOption"
import Error from "./Error";
import { useQuery, useReactiveVar } from "@apollo/client";
import { SHOW_OPTIONS } from "../graphql/queries";
import { showOptionsEdit } from "../cache";

const Options = ({ questionId }) => {
    const editOptions = useReactiveVar(showOptionsEdit);
    const { data, loading, error } = useQuery(SHOW_OPTIONS, {
        variables: {
            questionId
        }
    });

    const [showOptions, setOptions] = useState(null);
    const [pageLoading, setLoading] = useState(true);
    const [fetchError, setError] = useState(null);

    useEffect(() => {
        if (!loading) setLoading(false);
        if (data) setOptions(data);
        if (error) setError(error.message);
    }, [loading, data, error]);

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
                                            editOptions
                                                ? <UpdateOption option={option} questionId={questionId} />
                                                : (
                                                    <form><input type="radio" id={option.option} name="answer" value={option.option} /> <label>{option.option}</label> <span className="delete-button">X</span></form>
                                                )
                                        }

                                    </div>
                                ))
                                : <em>No options given</em>
                            : <Error message={fetchError.message} />
                }
            </div>
            {
                showOptions && !editOptions
                    ? (
                        <AddOption options={showOptions.options} questionId={questionId} />
                    )
                    : null
            }


        </div>
    );
};

export default Options; 