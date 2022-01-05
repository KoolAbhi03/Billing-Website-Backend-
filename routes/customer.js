var express = require('express');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
var router = express.Router()

const { getCustomerbyId, getBillsCustomer } = require('../controllers/customer')

// params

router.param("userId",getCustomerbyId);


router.get("/CustomerBill/:userId",isSignedIn,isAuthenticated,getBillsCustomer);

module.exports = router