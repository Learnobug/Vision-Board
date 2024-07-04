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
  socket.on("draw-line", ({ prevPoint, currentPoint, color }) => {
    socket.broadcast.emit("draw-line", { prevPoint, currentPoint, color });
  });
  socket.on("draw-rectangle", ({ ctx, startPoint, endPoint, color }) => {
    socket.broadcast.emit("draw-rectangle", {
      ctx,
      startPoint,
      endPoint,
      color,
    });
  });
  socket.on("erase-line", ({ prevPoint, currentPoint, color }) => {
    socket.broadcast.emit("erase-line", { prevPoint, currentPoint, color });
  });
  socket.on("draw-circle", ({ ctx, startPoint, endPoint, color }) => {
    socket.broadcast.emit("draw-circle", { ctx, startPoint, endPoint, color });
  });
  socket.on("draw-starightline", ({ ctx, startPoint, endPoint, color }) => {
    socket.broadcast.emit("draw-starightline", {
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
  socket.on("clear", () => {
    io.emit("clear");
  });
});

httpServer.listen(3001, () => {
  console.log("✔️ Server listening on port 3001");
});
