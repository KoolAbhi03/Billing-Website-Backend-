const Customer = require("../models/customer");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");

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


