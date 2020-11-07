import React, { useEffect, useState } from "react";
import AddOption from "./AddOption";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import { useQuery } from "@apollo/client";
import { SHOW_OPTIONS } from "../graphql/queries";

const Options = ({ questionId }) => {
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
            <form>
                {
                    pageLoading
                        ? <LoadingSpinner />
                        : showOptions
                            ? showOptions.options.map(option => (
                                <div key={option.id}>
                                    <input type="radio" id={option.option} name="answer" value={option.option} /> <label>{option.option}</label>
                                </div>
                            ))
                            : <Error message={fetchError.message} />
                }
            </form>
            {
                showOptions 
                ? (
                    <AddOption options={showOptions.options} questionId={questionId} />
                ) 
                : null
            }
            

        </div>
    );
};

export default Options; 