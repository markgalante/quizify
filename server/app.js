const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const cors = require("cors");
const session = require("express-session");
const auth = require("./auth/auth");
const passport = require("./auth/set-up");
const bodyParser = require("body-parser");

const port = 4000;

const app = express();
app.use(cors());

//Body parser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Express Set up. 
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true } // Removed for HTTP connection
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Subscriptions 
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");

const subscriptionsEndpoint = `ws://localhost:${port}/subscriptions`;

mongoose.connect("mongodb://localhost/quizify", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.once("open", () => console.log("connected to database"));

app.use("/auth", auth);

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
    });
});