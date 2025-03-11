import express from "express"
import {signin} from "../models/userdata.js"
import http from "http"
import { Server } from "socket.io";

const router = express.Router()
const server = http.createServer(router);
const io = new Server(server, {
    cors: {
        origin: 'https://chat-app-blush-eight-56.vercel.app/',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    console.log('a user connected');
});

router.get('/', async(req, res)=>{
    let users = await signin.find({})
    res.send(users);
})

export const getuser = router
