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

function App() {
  const { data, loading, error } = useQuery(CURRENT_USER, { fetchPolicy: "cache-and-network" });
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
        <div>
          <button onClick={() => console.log({ loading, data, error })}>
            Test
          </button>
          <nav>
            {
              !isLoggedIn
                ? (
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                  </ul>
                )
                : (<ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/create">Create Quiz</Link></li>
                  <li><button onClick={logOut}>Sign Out</button></li>
                </ul>
                )
            }
          </nav>
        </div>
        <Switch>
          <Route exact path="/"><QuizList /></Route>
          <Route path="/create">
            {
              isLoggedIn
                ? <CreateQuiz />
                : <Redirect to="/" />
            }
          </Route>
          <Route path="/signin"><SignInSignUp /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
