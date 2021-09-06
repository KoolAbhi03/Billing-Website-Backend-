const Customer = require("../models/customer");
const Shop = require("../models/shop");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

// Signup

exports.customerSignup = (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  
    const customer = new Customer(req.body);
    customer.save((err, customer) => {
      if (err) {
        return res.status(400).json({
          err: "NOT able to save Customer in DB"
        });
      }
      res.json({
        name: customer.name,
        email: customer.email,
        id: customer._id
      });
    });
};

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

exports.customerSignin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  Customer.findOne({ email }, (err, Customer) => {
    if (err || !Customer) {
      return res.status(400).json({
        error: "Customer email does not exists"
      });
    }

    if (!Customer.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: Customer._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = Customer;
    return res.json({ token, Customer: { _id, name, email, role } });
  });
};

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

// signout

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  UserProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 2) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};
