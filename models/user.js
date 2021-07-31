const mongoose = require('mongoose');
const Offer = require('./offer');
const { v1: uuid } = require('uuid')
const crypto = require('crypto')

const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50
    },
    email:{
        type:String,
        maxlength:80,
        unique:true,
        required:true 
    },
    phone:{
        type:String,
        minlength:10,
        maxlength:14,
        unique:true,
        required:true 
    },
    imagePath:{
        type:String
    },
    address:{
        type:String,
        minlength:4,
        maxlength:100
    },
    city:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0//Client=0,locateur=1,Admin=2 
    },
    gender:{
        type:String,
        enum:["M", "F"],
        // required:true
    },
    hashed_password:{
        type:String,
    },
    salt:{
        type:String,
    },
    //Email Confirmation
    confirmed:{
        type:Boolean,
        default:true
    },
    blocked:{
        type:Boolean,
        default:false    
    }
},{timestamps:true})

//Mot de pass vertuelle
UserSchema.virtual('password')
.set(function(password){
    this._password=password;
    this.salt=uuid();
    this.hashed_password=this.crypter(password);
})
.get(function(){
    return this._password;
})

//Méthodes vertuelle
UserSchema.methods={
    auth:function(EnterPassword){
        return this.crypter(EnterPassword)===this.hashed_password
    },
    crypter:function(password){
        if(!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                        .update(password)
                        .digest('hex')
        } catch (error) {
            return '';
        }
    }
}

module.exports=mongoose.model('User',UserSchema);