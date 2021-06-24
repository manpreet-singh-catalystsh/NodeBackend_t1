const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const validationSchemas = require("../schemas/validationSchemas");
const Response = require("../middleware/response");
const Messages = require("../messages");

router.use(express.json());

router.get("/user/:userName", (req, res) => {
transactionController.showUserTransactions(req, res);
});

router.get("/admin/:userName", (req, res) => {
transactionController.showAdminTransactions(req, res);
});

router.post("/makeTransaction", (req, res) => {
 transactionController.superAdminTransaction(req, res);
});

router.post("/makeUserTransaction", (req, res) => {
transactionController.userTransaction(req, res);
});
/*
// testing purpose only
router.get("/addDummyTransaction", async(req, res) => {
    console.log("transactions request recieved!!!!"); 
    const transaction = new Transaction({ to: "+390123456789", from:"+391234567890", amount:20,activityName:"",purpose:"printingMoney" }); 
    const result = await transaction.save();
    res.send(result);   
});*/

router.get("/all", async (req, res) => {
  transactionController.showAll(req, res);
});

module.exports = router;
