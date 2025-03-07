import mongoose from "mongoose"

const Message = mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    message: {type:String, required: true},
    remainingmsg: {type:String, default:""},
    timestamp: {type: Date, default: Date.now},
},
{
    Collection:"messages",
})

export const message = mongoose.model('Messages', Message)