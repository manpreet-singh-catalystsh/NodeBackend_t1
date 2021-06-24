const users = require("./users");
const activities = require("./activities");
const categories = require("./categories");
const transactions = require("./transactions");
const auth = require("../middleware/auth");





function route(app) {
  i = 0;
  app.get("/", (req, res) => {
    console.log("request recieved!!!!", ++i);
    res.send("Hwllo World!!");
  });

  try {
    app.use("/users", users);
    app.use("/activities",auth ,activities);
    app.use("/transactions", auth,transactions);
    app.use("/categories", categories);
  } catch (e) {
    console.log(e);
  }
}

module.exports = route;
