import React from "react";
import { showQuestionEdit } from "../../cache";
import SubmitQuestion from "../SubmitQuestion";

class UpdateQuestion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            question: props.question,
            option: "",
            options: [],
            setOptionEdit: false,
        };
    };

    componentDidMount() {
        const options = [...this.state.options];
        for (let i = 0; i < this.props.options.length; i++) {
            const option = {};
            option.option = this.props.options[i].option;
            option.isCorrect = this.props.options[i].isCorrect;
            options.push(option);
        }
        this.setState({ options });
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
        this.setState({ options });
    }

    setIsCorrect(index) {
        const options = [...this.state.options];
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

    submitQuestion(e) {
        e.preventDefault();
        showQuestionEdit(false);
        this.setState({
            question: "",
            option: "",
            options: [],
            setOptionEdit: false,
        });
    }

    render() {
        return (
            <form onSubmit={(e) => this.submitQuestion(e)} className="update-question-form">
                <div>
                    <label className="bold">{this.props.index}. </label>
                    <input
                        value={this.state.question}
                        onChange={e => { this.setQuestion(e) }}
                        className="update-question-input bold"
                    />
                </div>

                {this.state.options.map((opt, index) => (
                    <div key={index} className="update-options-div">
                        <input
                            type="radio"
                            name="answer"
                            onChange={() => this.setIsCorrect(index)}
                            defaultChecked={opt.isCorrect}
                        />
                        <input
                            type="text"
                            className="update-option-input"
                            defaultValue={opt.option}
                            onChange={(e) => this.editOption(e, index)}
                            required
                        />
                    </div>
                ))}
                <SubmitQuestion
                    question={this.state.question}
                    options={this.state.options}
                    creator={this.props.creator}
                    questionId={this.props.questionId}
                    quizId={this.props.quizId}
                    task="EditQuestion"
                    setEditQuestion={this.props.setEditQuestion}
                />
                <button onClick={() => this.props.setEditQuestion(false)}>
                    Cancel
                </button>
            </form>
        );
    };
};

export default UpdateQuestion;