const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userOfflineRoutes = require("./routes/userRoutesOffline");
const userOnlineRoutes = require("./routes/userRoutesOnline");
const adminRoutes = require("./routes/adminRoutes");
const dbConfig = require("./config/db");
const {chatSockets} = require("./sockets/chatSocket");
const http = require("http");
const reqLoggingMiddleware = require("./middlewares/loggingMiddleware");
const errorloggingMiddleware = require("./middlewares/errorMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const authorizationMiddleware = require("./middlewares/authorizationMiddleware");

mongoose.connect('mongodb://localhost:27017/user-app')
.then(()=>console.log("Mongo Connected"))
.catch((err)=>console.log(`Mongo Connection Failed ${err}`));




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
app.use("/users",authMiddleware,authorizationMiddleware(["admin"]),userOnlineRoutes);
app.use("/admin",adminRoutes);
//app.use("/users", userOfflineRoutes);

//SERVER SETUP
const users = {}
const server = http.createServer(app);
chatSockets(server);

server.listen(3002,()=>{
  console.log("Server Started At Port 3002");
})
