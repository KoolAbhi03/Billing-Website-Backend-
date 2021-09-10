const Shop = require("../models/shop");
const Bill = require("../models/bill");

exports.getShopbyId = (req,res,next,id) => {
    Shop.findById( id, (err,Shop)=>{
        if(err || !Shop ){
            return res.status(400).json({
                error: "Shop not exist in DB"
            })
        }
        req.profile = Shop;
        next();
    })
}

exports.getShop = (req,res)=> {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

exports.updateShop = (req, res) => {
    Shop.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, shop) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user"
          });
        }
        shop.salt = undefined;
        shop.encry_password = undefined;
        res.json(shop);
      }
    );
};