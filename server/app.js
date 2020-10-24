const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");

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
    graphiql: true
}));

app.listen(4000, () => console.log("server listening on port 3000"));