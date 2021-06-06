import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, Route, useHistory, Redirect } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CURRENT_USER } from "./graphql/queries";
import { UPDATE_USER } from "./graphql/mutations";
import axios from "axios";

//Imports of components 
import QuizList from "./components/QuizList";
import CreateQuiz from "./components/CreateQuiz";
import SignInSignUp from "./components/SignInSignUp";
import UserProfile from "./components/UserProfile";
import SubmittedQuiz from './components/SubmittedQuiz';

function App() {
  const { data, error } = useQuery(CURRENT_USER, { fetchPolicy: "cache-and-network" });
  const [updateUser] = useMutation(UPDATE_USER);
  const [isLoggedIn, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (data) setUser(data.currentUser);
    if (error) console.log({ error });
  }, [data, error]);

  function logOut() {
    axios.get("/auth/logout", {})
      .then(res => {
        console.log("Successful client logout", { res })
        history.push("/");
        updateUser({
          refetchQueries: [{ query: CURRENT_USER }]
        });
      })
      .catch(err => console.log({ err }))

  }

  return (
    <div className="App">
      <Router>
        <nav className="main-nav-bar">
          {!isLoggedIn
            ? (
              <ul className="nav-list">
                <li className="nav-link"><Link to="/signin">Sign In</Link></li>
              </ul>)
            : (
              <ul className="nav-list">
                <li className="nav-link"><Link to="/">Home</Link> </li>
                <li className="nav-link"><Link to="/create">Create Quiz</Link></li>
                <li className="nav-link"><Link to={`/profile/${isLoggedIn.id}`} >My Profile</Link></li>
                <li className="nav-link" onClick={logOut}>Sign Out</li>
              </ul>)}
        </nav>

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
              : <Redirect to="/" />
            }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
