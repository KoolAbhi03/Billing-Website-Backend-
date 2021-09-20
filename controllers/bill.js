const Bill = require('../models/bill')

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