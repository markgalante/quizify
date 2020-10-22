const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

const Quiz = require('./models/quiz'); 
const Question = require('./models/question');
const Option = require('./models/option'); 

Quiz.create({
    title: "Football Quiz",
}).then(()=> console.log("success")).catch(err => console.error(err.message));

mongoose.connect("mongodb://localhost/kinetic", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.once("open", () => console.log("connected to database"));

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => console.log("server listening on port 3000"));