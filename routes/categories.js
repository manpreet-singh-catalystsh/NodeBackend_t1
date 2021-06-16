
const express = require("express");
const router = express.Router();
const showAll = require("../controllers/categoryController");

router.use(express.json());

router.get("/all",(req, res) => 
{
   showAll(req,res);
});

module.exports = router;