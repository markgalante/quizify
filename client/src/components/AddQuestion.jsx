import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION } from "../graphql/mutations";
import { QUIZ } from "../graphql/queries"

const AddQuestion = ({ id, creator }) => {
    const [question, setQuestion] = useState('');
    const [option, setOption] = useState("");
    const [options, setOptions] = useState([]);
    const [addQuestion] = useMutation(ADD_QUESTION);
    function handleSubmit(e) {
        e.preventDefault();
        // addQuestion({
        //     variables: {
        //         question,
        //         quizId: id,
        //         creator
        //     },
        //     refetchQueries: [{
        //         query: QUIZ,
        //         variables: { id: id },
        //     }]
        // });
        setQuestion('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="question">Question</label>
                    <input id="question" onChange={e => setQuestion(e.target.value)} value={question} required />
                </div>
                <div>
                    <label htmlFor="options">Option</label>
                    <input id="options" type="text" onChange={e => setOption(e.target.value)} value={"" || option} />
                    <button onClick={e => {
                        e.preventDefault();
                        setOptions([...options, option]);
                        setOption("");
                    }}>Add Option</button>
                    {options.map((opt, index) => (
                        <div key={index}>
                            <input type="radio" name="answer" />
                            <input type="text" defaultValue={opt || ""} onChange={e => {
                                options[index] = e.target.value
                                setOptions(options)
                            }} />
                            <span
                                className="curser-pointer"
                                onClick={() => {
                                    const updatedOptions = options.filter(opt => opt !== options[index])
                                    setOptions(updatedOptions);
                                }}
                            >Delete</span>
                        </div>
                    ))}
                </div>

                <button type="submit">Add Question</button>
            </form>
        </div>
    )
};

export default AddQuestion; 

//TO DO: 
/**
 * 1 - Create object to send to mongoose.
 * 2 - Redefine Schema in Mongo 
 * 3 - Redefine Schema in graphql-express 
 * 4 - Redefine mutations in server
 * 5 - Redefine mutations in client 
 * 6 - Redefine queries in server 
 * 7 - Redefine queries in client 
 * 8 - Re-do front-end 
 */