export const initialState = {
    answer: [],
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ANSWER":
            if (action.payload) {
                state.answer[action.payload.index] = { option: action.payload.option }
            }
            return state;
        default:
            break;
    }
}

/**
 * 1) Mongo find quiz by ID.
 * 2) Find ass questions - are they linked to quiz? Hmm...
 * 3) Loop through questions on Mongo and from body. Can be done in one loop.
 * 4) For each question, loop through options
 * 4b) Conditional statement: if option[i] === option  -> isCorrect ? +1 : 0;
 * 5) Return score to frontend ====> RESEARCH: How to send scores to front-end.
 *
 * Send object with QuestionID and Body of answers for each questionID.
 * Sending isCorrect on front-end decreases validity of app.
 * Mongo find with questionID ass with quiz? This will be tricky.
 * Go through options and find option that matches body submitted.
 * If isCorrect is true, add +1 score; else, move on. So this will loop through array of options in array of questions
 * meaning it'll be O(n^2) which is not great so advice will be needed there.
 *
 * Send through this:
 * [ //arr of questions
 *    { //q1
 *      [
 *          arr of options. perhaps just string?
 *          opt0, opt1, opt2...
 *      ]
 *     }
 * ]
 */