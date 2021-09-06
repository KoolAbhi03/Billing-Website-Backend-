var express = require("express");
var router = express.Router();
const {check,validationResult} = require("express-validator");
const {customerSignin,customerSignup,shopSignin,shopSignup,signout,isSignedIn} = require("../controllers/auth");

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
router.post(
    "/shopSignup",
    [
        check("shopName","Shop Name should be at least 4 character").isLength({min:4}),
        check("email","email is required").isEmail(),
        check("password","password must be at least 9 character").isLength({min: 9}),
    ],
    shopSignup
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
router.post(
    "/shopSignin",
    [
      check("email", "email is required").isEmail(),
      check("password", "password field is required").isLength({ min: 9 })
    ],
    shopSignin
);

// Signout Route
router.get("/signout",isSignedIn,signout);

module.exports = router;