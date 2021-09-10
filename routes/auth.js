var express = require("express");
var router = express.Router();

const { signout}= require("../controllers/auth")

// Signout Route
router.get("/signout",signout);

module.exports = router;