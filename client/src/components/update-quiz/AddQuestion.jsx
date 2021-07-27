import React from "react";
import SubmitQuestion from "../SubmitQuestion";

class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            option: "",
            options: [],
            setOptionEdit: false,
        }
    };

    setQuestion(e) {
        this.setState({
            question: e.target.value
        })
    };

    setOption(e) {
        e.preventDefault();
        this.setState({
            option: e.target.value,
        });
    };



    setOptions(e) {
        e.preventDefault();
        this.setState({
            options: [...this.state.options, { option: this.state.option, isCorrect: false }],
            option: ""
        })
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
        for (let i = 0; i < options.length; i++) {
            if (i === index) {
                options[i].isCorrect = true;
            } else {
                options[i].isCorrect = false;
            }
        }
        this.setState({ options });
    }

    deleteOption(index) {
        const { options } = this.state;
        const updatedOptions = options.filter(opt => options[index].option !== opt.option);
        this.setState({
            options: updatedOptions
        });
    }

    submitQuestion(e) {
        e.preventDefault();
        this.setState({
            question: "",
            option: "",
            options: [],
            setOptionEdit: false,
        });
    }

    render() {
        const { question, option, options, setOptionEdit } = this.state;
        return (
            <div>
                <form onSubmit={(e) => this.submitQuestion(e)}>
                    <div>
                        <label htmlFor="question">Question</label>
                        <input id="question" onChange={(e) => this.setQuestion(e)} value={question} required />
                    </div>
                    <div>
                        <label htmlFor="options">Option</label>
                        <input id="options" type="text" onChange={e => this.setOption(e)} value={"" || option} />
                        <button onClick={e => this.setOptions(e)}>Add Option</button>
                        {options.map((opt, index) => (
                            <div key={index} onDoubleClick={() => this.setState({ setOptionEdit: !setOptionEdit })}>
                                <input type="radio" name="answer" onChange={() => this.setIsCorrect(index)} />
                                {setOptionEdit
                                    ? <input type="text" defaultValue={opt.option || ""} onChange={(e) => this.editOption(e, index)} />
                                    : <label>{opt.option} </label>
                                }
                                {setOptionEdit
                                    ? null
                                    : (<span
                                        className="curser-pointer"
                                        title={`Delete option: ${opt.option}`}
                                        onClick={() => this.deleteOption(index)}
                                    > &#9747;</span>
                                    )
                                }
                            </div>
                        ))}
                    </div>

                    <SubmitQuestion
                        question={question}
                        options={options}
                        creator={this.props.creator}
                        quizId={this.props.quizId}
                        task="AddQuestion"
                    />
                </form>
            </div>
        )
    }
};

export default AddQuestion;