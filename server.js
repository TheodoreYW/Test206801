const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const userNames = {};

// Serve static files
app.use(express.static(__dirname));

// Socket.io events
io.on("connection", (socket) => {
  console.log("a user connected");

  // Broadcast to all clients when a user joins
  socket.on("user joined", (username) => {
    userNames[socket.id] = username;
    socket.broadcast.emit("user joined", username);
  });

  socket.on("chat message", (msgData) => {
    io.emit("chat message", msgData);
  });

  socket.on("disconnect", () => {
    const username = userNames[socket.id] || "A user";
    console.log(`${username} disconnected`);
    io.emit("user left", username);
    delete userNames[socket.id];
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
