const mongoose = require('mongoose');
const User  = require('./user');

const MessageSchema =new mongoose.Schema({
   
    userSrc:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    userDst:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    content:{
        type:String,
        required:true,
    }
},{timestamps:true})


module.exports=mongoose.model('Message',MessageSchema);