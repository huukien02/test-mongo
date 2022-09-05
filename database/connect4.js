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

const CmtSchema = new Schema({
    idProduct : {type:String},
    cmt: {type:String},
    name: {type:String},
    day: {type:String},
    month: {type:String},
    year: {type:String},
    hour: {type:String},
    minute: {type:String},

},{collection:'Comment'});

module.exports = mongoose.model('Comment',CmtSchema);