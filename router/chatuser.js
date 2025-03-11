import express from "express"
import { message } from "../models/message.js";
import { signin } from "../models/userdata.js";

const router = express.Router()

router.post('/', async (req,res)=>{
    console.log("get your chats");
    let user_id = await signin.findOne({username:req.body.username})
    let data = await message.find({sender:user_id._id})
    if(data){
        console.log(data);
    }
    
})

export const chatuser = router