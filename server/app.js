const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const User = require("./models/user");

const port = 4000;

passport.use(new LocalStrategy(
    {
        passwordField: "email"
    },
    (email, password, done) => {
        User.findOne({ email: email })
            .then(user => {
                if (!user) return done(null, false, { message: "Incorrect email or email doesn't exist" });
                if (!user.validPassword(password)) {
                    return done(null, false, { message: "Password incorrect" });
                };
            }).catch(err => done(err));
    }
));

const app = express();
app.use(cors());
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
})

app.post("/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/signin"
    })
);

app.get("/test", (req, res)=>{
    res.send("Hello")
})

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

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
    subscriptionsEndpoint,
    context: ({ req, res }) => buildContext({ req, res, User }),
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