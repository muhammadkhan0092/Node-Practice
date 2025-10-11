const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userOfflineRoutes = require("./routes/userRoutesOffline");
const userOnlineRoutes = require("./routes/userRoutesOnline");
const adminRoutes = require("./routes/adminRoutes");
const dbConfig = require("./config/db");
const http = require("http");
const {Server} = require("socket.io");


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
const io = new Server(server);
io.on("connection",(socket)=>{
  console.log("USER CONNECTED ",socket.id);

  socket.on("register_chat",(userId)=>{
    console.log("USER WITH USER ID -> ",userId," AND SOCKET ID ",socket.id," REGISTER FOR CHAT");
    users[userId] = socket.id;
  })





socket.on("private_message", (payload) => {
  console.log("RAW DATA RECEIVED:", payload);

  // If payload is a string, parse it to JSON
  let data;
  try {
    data = typeof payload === "string" ? JSON.parse(payload) : payload;
  } catch (e) {
    console.error("Invalid JSON payload:", e);
    return;
  }

  const { senderId, receiverId, message } = data;
  console.log("MESSAGE RECEIVED:", message);
  console.log("USERS ARE ",users);
  const receiversSocketId = users[receiverId];
  if (receiversSocketId) {
    console.log("Sending message to:", receiversSocketId);
    socket.to(receiversSocketId).emit("receive_private", { senderId, message });
  }
});











  socket.on("disconnect",()=>{
    console.log("USER DISCONNECTED : ",socket.id);
  });
});

server.listen(3002,()=>{
  console.log("Server Started At Port 3002");
})
