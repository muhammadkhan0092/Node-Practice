const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id:{
    type : String,
    unique:true,
    required:true
  },
  user_name:{
    type : String,
    required : true
  }
},{timestamps:true});

const User = mongoose.model("user",userSchema);
module.exports = User;