var express = require("express");
var router = express.Router();

const { isSignedIn,signout}= require("../controllers/auth")

// Signout Route
router.get("/signout",isSignedIn,signout);

module.exports = router;