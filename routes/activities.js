
const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");
router.use(express.json());


router.get("/all", (req, res) => 
{
    activityController.showAll(req,res);
});

router.get("/category/:category", (req, res) => 
{
    activityController.showByCategory(req,res);
});

router.get("/Url/:activityName",(req, res) => 
{
    activityController.getUrl(req,res);
});

module.exports = router;