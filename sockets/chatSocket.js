const {Server} = require("socket.io");
exports.chatSockets=(server)=>{
    const io = new Server(server);
io.on("connection",(socket)=>{
  console.log("USER CONNECTED ",socket.id);

  socket.on("register_chat",(userId)=>{
    console.log("USER WITH USER ID -> ",userId," AND SOCKET ID ",socket.id," REGISTER FOR CHAT");
    users[userId] = socket.id;
  })

  socket.on("join_socket",(groupId)=>{
    socket.join(groupId);
  });

  socket.on("group_message",(data)=>{
    const {groupId,senderId,message} = data;
    socket.to(groupId).emit("receive_group_message",{groupId,senderId,message});
  });

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
}