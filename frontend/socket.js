import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
    if(!socket){
        socket = io("https://vision-board.onrender.com");
    }
    return socket;
    }