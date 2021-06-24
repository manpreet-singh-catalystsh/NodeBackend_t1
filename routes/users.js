
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.use(express.json());

router.get("/userType/:userName", (req, res) => {
    
    userController.getType(req,res); 
});

router.get("/admin/collection/:userName",(req, res) => {
    userController.getAdminCollection(req,res);
});

router.get("/admin/activityName/:userName",(req, res) => {
userController.getAssociatedActivity(req,res);
});

router.get("/balance/:userName",(req, res) => {
   userController.getBalance(req,res);
});

router.post("/signup", (req, res) => {
    userController.signup(req,res);
});

module.exports = router;