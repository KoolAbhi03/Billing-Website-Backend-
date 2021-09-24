const Bill = require('../models/bill')
const Customer = require('../models/customer')
const Shop = require('../models/shop')

exports.getBillById = (req,res,next,id)=> {
    Bill.findById(id).exec((err, bill)=>{
        if(err || !bill){
            return res.status(400).json({
                error: "Bill was not found"
            })
        }
        req.bill = bill;
        next();
    })
}

exports.createBill = (req, res) => {
    req.body.shop = req.profile._id;
    const bill = new Bill(req.body);
    bill.save((err,bill)=> {
        if(err){
            return res.status(400).json({
                error:"NOT able to save Bill in DB"
            })
        }
        res.json({bill})
    });
    
}

exports.getBill = (req,res)=>{
    return res.json(req.bill);
}
exports.pushBill = (req,res,next) => {
    let bills = []
    bills.push({"shop":req.profile._id});
    req.body.items.forEach(item => {
        bills.push({
            name:item.name,
            quantity:item.quantity,
            price:item.price
        })
    })
    console.log(bills);
    Customer.findOneAndUpdate(
      {_id:req.body.customer},
      {$push:{Bills:{bills}}},
      {new : true,useFindAndModify:false},
      (err,customer)=>{
        if(err){
          return res.status(400).json({
            error:"nof"
          })
        }
      }
    )
    bills[0]={"customer":req.body.customer};
    console.log(bills);
    Shop.findOneAndUpdate(
      {_id:req.profile._id},
      {$push : {bills:{bills}}},
      {new:true,useFindAndModify:false},
      (err,shop)=>{
        if(err){
          return res.status(400).json({
            error:"nof2"
          })
        }
        console.log(shop);
      }
    )
    next();
  }