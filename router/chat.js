import express from "express"
import http from "http"
import { Server } from "socket.io";

const router = express.Router();
const server = http.createServer(router);
const io = new Server(server)

//Scoket.Io
io.on('connection', (socket) => {
    console.log('a user connected');
});

router.get('/', (req, res)=>{
    res.send("chatting")
})

export const chat = router