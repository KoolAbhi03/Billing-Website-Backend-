var mongoose=require("mongoose");
const {ObjectId} = mongoose.Schema;

const ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});
  
const Items = mongoose.model("Items", ItemSchemaSchema);

const billSchema = new mongoose.Schema(
    {
        Shop:{
            type: ObjectId,
            ref: "Shop",
            required: true
        },
        customer:{
            type: ObjectId,
            ref: "Customer",
            required: true
        },
        items: [ItemSchema]
    }
)

const Bill = mongoose.model("Bill", billSchema);

module.exports = {Items, Bill};