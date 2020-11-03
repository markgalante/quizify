import React from "react";

const AddOption = ({ options, questionId }) => {

    let allowCorrectAnser = true;
    for (let i = 0; i < options.length; i++) {
        if (options[i].isCorrect) return true;
    };

    return (
        <div>
            <form>

                {options.length > 5
                    ? (<input type="text" disabled />)
                    : (
                        <div>
                            {
                                allowCorrectAnser
                                    ? <input type="radio" />
                                    : <input type="radio" disabled />
                            }
                            <input type="text" />
                            <button type="submit">Add</button>
                        </div>)
                }

            </form>
        </div>
    );
};

export default AddOption; 