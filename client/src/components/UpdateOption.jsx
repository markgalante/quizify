import React from "react";
import { useMutation } from "@apollo/client";
import { showOptionsEdit } from "../cache";
import { UPDATE_OPTION } from "../graphql/mutations";
import { SHOW_OPTIONS } from "../graphql/queries";

const UpdateOption = ({ options }) => {
    return (
        <form>
            { options.map(option => (
                <div key={option.id}>
                    <input type="radio" id={option.option} name="answer" value={option.option} checked={option.isCorrect} />
                    <input type="text" value={option.option} /> 
                </div>

            ))}

        </form>
    );
};

export default UpdateOption; 