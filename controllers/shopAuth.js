const Shop = require("../models/shop");
const {  validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");

// Signup

exports.shopSignup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
        error: errors.array()[0].msg
        });
    }

    const shop = new Shop(req.body);
    shop.save((err, customer) => {
        if (err) {
        return res.status(400).json({
            err: "NOT able to save Customer in DB"
        });
        }
        res.json({
        shopName: shop.shopName,
        email: shop.email,
        id: shop._id
        });
    });
};

// Signin

exports.shopSignin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  
    Shop.findOne({ email }, (err, Shop) => {
      if (err || !Shop) {
        return res.status(400).json({
          error: "Shop email does not exists"
        });
      }
  
      if (!Shop.autheticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
  
      //create token
      const token = jwt.sign({ _id: Shop._id }, process.env.SECRET);
      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
  
      //send response to front end
      const { _id, shopName, email, role } = Shop;
      return res.json({ token, Shop: { _id, shopName, email, role } });
    });
};
