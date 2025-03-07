import mongoose from "mongoose"

const Signin = new mongoose.Schema({
    username:{type:String, unique:true},
    email:String,
    password:String,
    scoketID:String,
    userstatus:{type:Boolean, default:false}
})

export const signin = mongoose.model('Userdata', Signin)