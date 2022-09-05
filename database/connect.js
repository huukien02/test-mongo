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

const PetSchema = new Schema({
    name : {type:String},
    price: {type:String},
    image: {type:String},
    detail:{type:String}
},{collection:'ListPet'});

module.exports = mongoose.model('ListPet',PetSchema);