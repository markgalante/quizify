import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { showOptionsEdit } from "../cache";
// import { UPDATE_OPTION } from "../graphql/mutations";
// import { SHOW_OPTIONS } from "../graphql/queries";

const UpdateOption = ({ options }) => {
    const [updatedOption, setOption] = useState("");
    const [updatedIsCorrect, setIsCorrect] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            { options.map(option => (
                <div key={option.id}>
                    <input
                        type="radio"
                        id={option.option}
                        onChange={e => setIsCorrect(!updatedIsCorrect)}
                        value={option.option}
                    />
                    <input type="text" value={option.option} onChange={e => setOption(e.target.value)} />
                </div>
            ))}
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateOption; 