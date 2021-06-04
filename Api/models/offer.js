const mongoose = require('mongoose');

const OfferSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:30
    },
    description:{
        type:String,
        maxlength:200,
        required:true 
    },
    price:{
        type:Number,
        required:true
    },
    numb_room:{
        type:Number,
        required:true
    },
    imagePaths:[{
        type:String
    }],
    localisation:{
        type:String,
        minlength:4,
    },
    city:{
        type:String,
        required:true
    },
    isFurnished:{
        type:Boolean,
        default:false
    },
    landlord:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
},{timestamps:true})

module.exports=mongoose.model('Offer',OfferSchema);