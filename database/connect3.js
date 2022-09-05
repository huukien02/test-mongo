const mongoose = require('mongoose');
var url ="mongodb+srv://lehuukien2002:i6DMZ0UVGFziuxb4@cluster0.jztuunn.mongodb.net/database3?retryWrites=true&w=majority";

mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
  console.log("Ket noi thanh cong MongoDB");
})
.catch((err)=>{
    throw err;
});


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CartSchema = new Schema({
    accout : {type:String},
    fullname: {type:String},
    address: {type:String},
    phone: {type:String},
    listOrder: {type:String},
    tong: {type:String},
    note: {type:String}

},{collection:'Cart'});

module.exports = mongoose.model('Cart',CartSchema);