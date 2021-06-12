import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "./graphql/queries";

//Imports of components 
import QuizList from "./components/QuizList";
import CreateQuiz from "./components/CreateQuiz";
import SignInSignUp from "./components/SignInSignUp";
import UserProfile from "./components/UserProfile";
import SubmittedQuiz from './components/SubmittedQuiz';
import NavBar from "./components/NavBar";

function App() {
  const { data, error } = useQuery(CURRENT_USER, { fetchPolicy: "cache-and-network" });
  const [isLoggedIn, setUser] = useState(null);

  useEffect(() => {
    if (data) setUser(data.currentUser);
    if (error) console.log({ error });
  }, [data, error]);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <QuizList />
          </Route>
          <Route path="/create">
            {isLoggedIn
              ? <CreateQuiz />
              : <Redirect to="/" />}
          </Route>
          <Route path="/signin">
            {isLoggedIn
              ? <Redirect to="/" />
              : <SignInSignUp />}
          </Route>
          <Route path="/profile/:profile">
            {isLoggedIn
              ? <UserProfile />
              : <Redirect to="/" />}
          </Route>
          <Route path="/quiz/:id" exact={false}>
            {isLoggedIn
              ? <SubmittedQuiz />
              : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}; 
export default App;
