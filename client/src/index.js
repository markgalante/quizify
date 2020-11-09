import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, InMemoryCache, ApolloProvider, split, createHttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws"
import { BrowserRouter } from "react-router-dom"
import { getMainDefinition } from '@apollo/client/utilities';
// import quiz from '../../server/models/quiz';

//for queries or mutations: 
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
})

//initialise a web socket link for subscriptions
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/subscriptions",
  options: {
    reconnect: true, 
    // connectionParams: {
    //   authToken: user.authToken
    // }
  },
});

//different transports for different operations: 
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  // uri: splitLink, 
  link: splitLink,
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
