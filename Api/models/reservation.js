const mongoose = require('mongoose');
const User  = require('./user');
const Offer = require('./offer');

const ReservationSchema =new mongoose.Schema({
   
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    offer:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'Offer'
    },
    message:{
        type:String,
    }
},{timestamps:true})


module.exports=mongoose.models.Reservation || mongoose.model('Reservation',ReservationSchema);