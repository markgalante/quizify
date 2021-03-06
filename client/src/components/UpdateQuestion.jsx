import React from "react";
import { showQuestionEdit } from "../cache";
import SubmitQuestion from "./SubmitQuestion";

class UpdateQuestion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            question: props.question.question,
            option: "",
            options: [],
            setOptionEdit: false,
        }
    }

    componentDidMount(){
        const options = [...this.state.options]; 
        for(let i = 0; i < this.props.question.options.length; i++){
            const option = {};
            option.option = this.props.question.options[i].option; 
            option.isCorrect = this.props.question.options[i].isCorrect;
            options.push(option); 
        }
        this.setState({options}); 
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
            <form onSubmit={(e) => this.submitQuestion(e)}>
                <label>Question: </label>
                <input value={this.state.question} onChange={e => { this.setQuestion(e) }} />
                {
                    this.state.options.map((opt, index) => (
                        <div key={index}>
                            <input type="radio" name="answer" onChange={() => this.setIsCorrect(index)} defaultChecked={opt.isCorrect} />
                            <input type="text" defaultValue={opt.option} onChange={(e) => this.editOption(e, index)} required />
                        </div>
                    ))
                }
                <SubmitQuestion question={this.state.question} options={this.state.options} creator={this.props.creator} questionId={this.props.question.id} quizId={this.props.quizId} task="EditQuestion" />
            </form>
        )
    }
}

export default UpdateQuestion; 