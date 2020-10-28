const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");

const port = 4000;

//Subscriptions 
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");

const subscriptionsEndpoint = `ws://localhost:${port}/subscriptions`;

const app = express();
app.use(cors());

mongoose.connect("mongodb://localhost/quizify", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.once("open", () => console.log("connected to database"));

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
    subscriptionsEndpoint,
}));

const webServer = createServer(app);

webServer.listen(port, () => {
    console.log(`GraphQL is now running on http://localhost:${port}`);

    //Set up the WebSocket for handling GraphQL subscriptions. 
    new SubscriptionServer({
        execute,
        subscribe,
        schema
    }, {
        server: webServer,
        path: '/subscriptions',
    })
});