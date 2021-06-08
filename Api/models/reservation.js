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
    },
    typeRes:{
        type:String,
        enum:["Colloc", "Complet"],
        require:true
    }
},{timestamps:true})


module.exports=mongoose.models.Reservation || mongoose.model('Reservation',ReservationSchema);