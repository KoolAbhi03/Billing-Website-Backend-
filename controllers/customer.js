const Customer = require("../models/customer");
const Bill = require("../models/bill");
const Shop = require("../models/shop");
const bill = require("../models/bill");
exports.getCustomerbyId = (req,res,next,id) => {
    Customer.findById( id, (err,Customer)=>{
        if(err || !Customer ){
            return res.status(400).json({
                error: "Customer not exist in DB"
            })
        }
        req.profile = Customer;
        next();
    })
}

exports.getCustomer = (req,res)=> {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

exports.updateCustomer = (req, res) => {
    Customer.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, Customer) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user"
          });
        }
        Customer.salt = undefined;
        Customer.encry_password = undefined;
        res.json(Customer);
      }
    );
};

exports.getBillsCustomer = (req,res) => {
  Customer.findById({_id:req.profile._id},(err,customer)=>{
    if(err){
      return res.status(400).json({
        error: "error"
      })
    }
    res.json({Bills:customer.Bills});
  })
}