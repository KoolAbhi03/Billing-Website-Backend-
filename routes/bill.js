const express = require('express')
const router = express.Router();

const {isAdmin,isShop,isAuthenticated,isSignedIn} = require('../controllers/auth')

const {getBillById,createBill,getBill} = require('../controllers/bill')
const {getCustomerbyId,pushBill} = require('../controllers/bill')
const {getShopbyId} = require('../controllers/shop')

// params
router.param("shopId",getShopbyId);
router.param("billId",getBillById);

//create
router.post(
    "/bill/create/:shopId",
    isSignedIn,
    isAuthenticated,
    isShop,
    pushBill,
    createBill
)

// read 

router.get(
    "/bill/:billId",
    getBill
)

module.exports = router;