import express from "express";
import { createServer } from 'http';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

const httpServer = createServer(app);

import { Server } from 'socket.io';
const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('connection');
   

    socket.on('draw-line', ({ prevPoint, currentPoint, color }) => {
      socket.broadcast.emit('draw-line', { prevPoint, currentPoint, color });
    });

});

httpServer.listen(3001, () => {
    console.log('✔️ Server listening on port 3001');
});
