var express = require("express");
var router = express.Router();
const {check} = require("express-validator");
const {customerSignin,customerSignup} = require("../controllers/customerAuth");

//Signup Routes
router.post(
    "/customerSignup",
    [
        check("name","name should be at least 5 character").isLength({min:5}),
        check("email","email is required").isEmail(),
        check("password","password must be at least 9 character").isLength({min: 9}),
    ],
    customerSignup
)

// Signin Routes
router.post(
    "/customerSignin",
    [
      check("email", "email is required").isEmail(),
      check("password", "password field is required").isLength({ min: 9 })
    ],
    customerSignin
);

module.exports = router;