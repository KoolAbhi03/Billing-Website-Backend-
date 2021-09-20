var mongoose=require("mongoose");
const {ObjectId} = mongoose.Schema;

const ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});
  

const billSchema = new mongoose.Schema(
    {
        shop:{
            type: ObjectId,
            ref: "Shop",
            required: true
        },
        customer:{
            type: ObjectId,
            ref:"Customer",
            required:true
        },
        items: [ItemSchema]
    }
)

module.exports = mongoose.model("Bill", billSchema);