import express from "express";
import { createServer } from "http";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

const httpServer = createServer(app);

import { Server } from "socket.io";
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  socket.on("join-room", (roomId) => {
    console.log("User joined room: " + roomId);
    socket.join(roomId);
  });

  socket.on("leave-room", (roomId) => {
    console.log("User left room: " + roomId);
    socket.leave(roomId);
  });

  socket.on("draw-line", ({ prevPoint, currentPoint, color },roomId) => {
    console.log("Drawing line",roomId);
    socket.broadcast.to(roomId).emit("draw-line", { prevPoint, currentPoint, color });
  });
  socket.on("draw-rectangle", ({ ctx, startPoint, endPoint, color },roomId) => {
    socket.broadcast.to(roomId).emit("draw-rectangle", {
      ctx,
      startPoint,
      endPoint,
      color,
    });
  });
  socket.on("erase-line", ({ prevPoint, currentPoint, color },roomId) => {
    socket.broadcast.to(roomId).emit("erase-line", { prevPoint, currentPoint, color });
  });
  socket.on("draw-circle", ({ ctx, startPoint, endPoint, color },roomId) => {
    socket.broadcast.to(roomId).emit("draw-circle", { ctx, startPoint, endPoint, color });
  });
  socket.on("draw-starightline", ({ ctx, startPoint, endPoint, color },roomId) => {
    socket.broadcast.to(roomId).emit("draw-starightline", {
      ctx,
      startPoint,
      endPoint,
      color,
    });
  });
  socket.emit("textbefore", (data1) => {
    socket.broadcast.emit("textbefore", data1);
  });
  socket.on("text", (data) => {
    socket.broadcast.emit("text", data);
  });
  socket.on("clear", (roomId) => {
    io.to(roomId).emit("clear");
  });
});

httpServer.listen(3001, () => {
  console.log("✔️ Server listening on port 3001");
});
