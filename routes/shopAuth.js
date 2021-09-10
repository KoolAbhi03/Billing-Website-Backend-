var express = require("express");
var router = express.Router();
const {check} = require("express-validator");
const {shopSignin,shopSignup} = require("../controllers/shopAuth");


//Signup Routes
router.post(
    "/shopSignup",
    [
        check("name","name should be at least 5 character").isLength({min:5}),
        check("email","email is required").isEmail(),
        check("password","password must be at least 9 character").isLength({min: 9}),
    ],
    shopSignup
)

// Signin Routes
router.post(
    "/shopSignin",
    [
      check("email", "email is required").isEmail(),
      check("password", "password field is required").isLength({ min: 9 })
    ],
    shopSignin
);

module.exports = router;