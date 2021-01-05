import React from "react";
import { useReactiveVar } from "@apollo/client";
import { showQuestionEdit } from "../cache"
// import { UPDATE_QUESTION } from "../graphql/mutations";
// import { QUIZ } from "../graphql/queries";
// import { useParams } from "react-router-dom";
// import { showQuestionEdit } from "../cache";

class UpdateQuestion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            question: props.question.question,
            option: "",
            options: props.question.options,
            setOptionEdit: false,
        }
    }

    setQuestion(e) {
        this.setState({
            question: e.target.value
        });
    }

    editOption(e, index) {
        e.preventDefault();
        const options = [...this.state.options];
        const option = { ...options[index] };
        option.option = e.target.value;
        options[index] = option;
        this.setState({ options })
    }

    setIsCorrect(index) {
        const options = [...this.state.options];
        console.log(options);
        for (let i = 0; i < options.length; i++) {
            const option = { ...options[i] }
            if (i === index) {
                option.isCorrect = true;
                options[i] = option;
            } else if (options[i].isCorrect) {
                option.isCorrect = false;
                options[i] = option;
            }
        }
        this.setState({ options });
    }

    render() {
        console.log(this.props);
        return (
            <form onSubmit={e => {
                e.preventDefault();
                showQuestionEdit(false)
            }}>
                <label>Question: </label>
                <input value={this.state.question} onChange={e => { this.setQuestion(e) }} />
                {
                    this.state.options.map((opt, index) => (
                        <div key={index}>
                            <input type="radio" name="answer" onChange={() => this.setIsCorrect(index)} defaultChecked={opt.isCorrect} />
                            <input type="text" defaultValue={opt.option} onChange={(e) => this.editOption(e, index)} />
                        </div>
                    ))
                }
            </form>
        )
    }
}

export default UpdateQuestion; 