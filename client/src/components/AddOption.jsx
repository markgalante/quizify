import React from "react";

const AddOption = ({ length, questionId }) => {

    return (
        <div>
            <form>
                {length > 5
                    ? (<input type="text" disabled />)
                    : (<input type="text" />)}
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddOption; 