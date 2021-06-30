const mongoose = require('mongoose');
const User  = require('./user');

const ReportSchema =new mongoose.Schema({
   
    reporter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reported:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    message:{
        type:String,
    }
},{timestamps:true})


module.exports=mongoose.models.Report || mongoose.model('Report',ReportSchema);