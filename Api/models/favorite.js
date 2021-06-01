const mongoose = require('mongoose');
const Offer = require('./offer');
const User  = require('./user');

const FavoriteSchema =new mongoose.Schema({
    
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    offer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Offer'
    }
},{timestamps:true});

FavoriteSchema.index({client: 1, offer: 1}, {unique: true,dropDups: true});
module.exports=mongoose.model('Favorite',FavoriteSchema);