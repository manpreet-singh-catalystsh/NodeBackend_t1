/*jshint esversion: 6 */

const auth = require("./middleware/auth")
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users");
const activities = require("./routes/activities");
const categories = require("./routes/categories");
const transactions = require("./routes/transactions");

app.use(express.json());



mongoose.connect("mongodb://localhost/triboo")
    .then(() => console.log("Connected to triboo in MongoDb ..."))
    .catch(e => console.log("Could not connect to Mongo Db", e));

    i = 0;
app.get("/", (req, res) => {
    console.log("request recieved!!!!", ++i);
    res.send("Hwllo World!!");    
});

try{
    app.use("/users",users)
    app.use("/activities",activities);
    app.use("/transactions",auth,transactions);
    app.use("/categories",categories);
}
catch(e)
{
    console.log(e);
}


const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`listening on ${port}`); });