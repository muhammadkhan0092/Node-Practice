const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userOfflineRoutes = require("./routes/userRoutesOffline");
const userOnlineRoutes = require("./routes/userRoutesOnline");
const dbConfig = require("./config/db");



const reqLoggingMiddleware = require("./middlewares/loggingMiddleware");
const errorloggingMiddleware = require("./middlewares/errorMiddleware");


mongoose.connect('mongodb://localhost:27017/user-app')
.then(()=>console.log("Mongo Connected"))
.catch((err)=>console.log(`Mongo Connection Failed ${err}`));

//SCHEMA
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
User.create({
  user_id : 1,
  user_name:"Muhammad Khan",
});



//MIDDLEWARES
app.use(express.json());
app.use(reqLoggingMiddleware);
app.use(errorloggingMiddleware);

//Db Config
dbConfig
  .authenticate()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(`Database Connection Error -> ${err}`);
  });

//ROUTES
app.use("/users", userOfflineRoutes);

//SERVER SETUP
app.listen(3002, (err) => {
  if (err) {
    console.log("Error Starting Server");
  } else {
    console.log("Server Started");
  }
});
