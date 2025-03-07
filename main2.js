import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"

const app = express();
app.use(cors());
const port = 3001;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
})

io.on('connection', (socket) => {
    console.log("a new user is connected");
})

server.listen(port, ()=>{
    console.log("websocket is listen on port 3001");
})