/*jshint esversion: 6 */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./routes/routes");
app.use(express.json());

mongoose
  .connect("mongodb://localhost/triboo")
  .then(() => console.log("Connected to triboo in MongoDb ..."))
  .catch((e) => console.log("Could not connect to Mongo Db", e));

try {
  route(app);
} catch (e) {
  console.log(e);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
