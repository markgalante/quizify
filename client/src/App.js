import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

//Imports of components 
import QuizList from "./components/QuizList";
import CreateQuiz from "./components/CreateQuiz";
import SignInSignUp from "./components/SignInSignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create">Create Quiz</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route exact path="/"><QuizList /></Route>
          <Route path="/create"><CreateQuiz /> </Route>
          <Route path="/signin"><SignInSignUp /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
