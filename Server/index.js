import express from "express";
import colors from "colors";
import { Server as SocketServer } from "socket.io";
import http from "http";

// Initializations
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  // cors: {
  //   origin: "http://localhost:3000",
  // },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("message", (body) => {
    console.log(body);

    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(6),
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running in ${PORT} 🐹 `.bgBlue.yellow);
});
