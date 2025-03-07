import express from "express"
import mongoose, { isObjectIdOrHexString } from "mongoose"
import "dotenv/config"
import cors from "cors"
import {signin} from "./models/userdata.js"
import {getuser} from "./router/getuser.js"
import http from "http"
import { Server } from "socket.io";
import { message } from "./models/message.js"

let currentuser
const app = express()
const port = 3000
app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', async(socket) => {

    socket.on('update-id', async (user)=>{
        await signin.findOneAndUpdate({ username: user}, {scoketID:socket.id, userstatus:true})
        await signin.findOne({username: user})
        // console.log(user + " need to send msg");
    })

    socket.on('chat-history', async (history) => {
        // console.log(history.currentuser + " need msges by " + history.sendto);
        
        let user = await signin.findOne({username: history.currentuser})
        let sendto = await signin.findOne({username: history.sendto})
        let sended_msgs = await message.find({sender:user._id, receiver:sendto._id}).sort({timestamp: 1});
        let received_msgs = await message.find({sender:sendto._id, receiver:user._id}).sort({timestamp: 1});

        const all_msgs = [
            ...sended_msgs.map(msg => ({...msg.toObject(), type: true})),
            ...received_msgs.map(msg => ({...msg.toObject(), type: false}))
        ];

        all_msgs.sort((a,b)=> new Date(a.timestamp) - new Date(b.timestamp));

        all_msgs.forEach((msg)=>{
            io.to(socket.id).emit('all-msg', {
                message: msg.message,
                type: msg.type,
                timestamp: msg.timestamp
            });
        });
    })

    socket.on('send-msg', async (msg) => {
        let sendto = await signin.findOne({username:msg.receiver})
        let user = await signin.findOne({username: msg.sender})
        
        console.log(msg.sender + " sned msg to " + msg.receiver);
        
        io.to(sendto.scoketID).emit('receive-msg', {message:msg.msg, sendto:user.username})
        let newmsg = new message({
            sender: user._id,
            receiver: sendto._id,
            message: msg.msg,
        })
        newmsg.save();
    })

    socket.on('disconnect', async(user)=>{
        console.log(user + " disconnected");
        await signin.findOneAndUpdate({ username: currentuser }, {scoketID:socket.id, userstatus:false})
    })
});

try {
    await mongoose.connect('mongodb://localhost:27017/Company')
        .then(e => { console.log("connected to DB!") })
        .catch(e => { console.log("failed to connect: " + e) })
} catch (error) {
    console.log("cannot connect to DB:" + error);
}

app.use(cors());
app.use(express.json())
app.use('/getuser', getuser)

app.get(`/`, (req, res) => {
    res.send('Hello i am backend');
})

app.post('/signup', async (req, res) => {
    let newuser = new signin(req.body);
    await newuser.save()
    .then(e=>{res.json({"done":201})})
    .catch(e=>{res.json({"status":200})})
    console.log(req.body);
})

app.post('/signin', async (req, res) => {
    console.log(req.body);
    let user = await signin.findOne({ username: req.body.username })
    
    if (!user) {
        res.json({ message: "username is not registered", status: 200 })
    }
    else if (user.password != req.body.password) {
        res.json({ message: "Password is not valid", status: 203 })
    }
    else {
        currentuser = req.body.username
        res.json({ message: "All done", status: 204 })
    }
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);

})