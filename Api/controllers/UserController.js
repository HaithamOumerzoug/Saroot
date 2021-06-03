const User = require('../models/user');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const Favorite = require('../models/favorite');
const Offer = require('../models/offer');
const Message = require('../models/message');
const Reservation = require('../models/Reservation');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');



const CLIENT_ID = '98563758135-7f35grih0qcf0bb8q0fhi5ernp5fumm2.apps.googleusercontent.com';
const CLEINT_SECRET = 'ZXuCAptcF1icfhiTmdmHuHj8';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//042k3ZX7HlKwKCgYIARAAGAQSNwF-L9IrnqL2xTAHWAJt9QHCleFOcfHP_cCkXoGQh6AtGcUmC6sIEMIS4xt0u_lqxLSGWjZ-ed4';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//Sign Up
exports.signup=async (req,res)=>{
     var imagePath='';
     if(req.file!==undefined) imagePath = `${process.env.URL}/${req.file.path}`;
    
    const {role,name,email,address,city,phone,password,gender} = req.body;
    console.log();
    //Tester le unicité d'email et phone 
    if(await(await User.find({email:email})).length!==0){return res.status(400).send({message:"Cet e-mail est déjà pris !!!"})}
    if(await(await User.find({phone:phone})).length!==0){return res.status(400).send({message:"Ce numéro de téléphone à déjà pris !!!"})}
    //Create user
    const user = new User({
        role,
        name,
        email,
        address,
        city,
        phone,
        password,
        imagePath,
        gender
    });

    try {
        await user.save();
        jwt.sign(
            {_id:user._id},
            process.env.EMAIL_SECRET,
            {expiresIn: '1d'},
            async (err,confirmation_token)=>{
                try {
                    const accessToken = await oAuth2Client.getAccessToken();
                
                    const transport = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        type: 'OAuth2',
                        user: process.env.USER,
                        clientId: CLIENT_ID,
                        clientSecret: CLEINT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken,

                      },
                    });
                
                    const mailOptions = {
                        from:`Saroot <${process.env.USER}>`,
                        to:user.email,
                        subject:'Email confirmation',
                        html:`Merci d\'avoir utiliser Saroot Location. Pour compléter votre inscription, veuillez confirmer votre adresse email en cliquant sur le lien suivant: <br> <a href="${process.env.URL_TOKEN}/${confirmation_token}">Confirmer mon compte</a>`
                    };
                
                    const result = await transport.sendMail(mailOptions);
                        return result;
                  } catch (error) {
                        console.log(error);
                  }
            })
        res.json(user);
    } catch (err){
        res.status(400).send(err);
    }
}

//Sign In
exports.signin=(req,res)=>{
    const {email,password}=req.body;

    User.findOne({email},(err,user)=>{
        //
        if(err || !user) return res.status(401).json({message:'E-mail n\'existe pas, veuillez vous inscrire !!!'});

        //Password is valide
        if(!user.auth(password)) return res.status(401).json({message:'Mot de passe invalide !!!'});

        //Test if user is blocked
        if(user.blocked) return res.status(401).json({message:'Votre compte est bloqué !!!, merci de contacter l\'admin'});

        //Test if user email is confirmed
        if(!user.confirmed) return res.status(401).json({message:'Email non confirmé !!!'});
        const {id,name,email,role,address,city,phone,gender,image,confirmed,blocked,imagePath}=user;
        const token =jwt.sign(
            {user:{id,name,email,role,address,city,phone,gender,image,confirmed,blocked,imagePath}},
            process.env.JWT_SECRET,
            {expiresIn: '1d'})
        res.header("auth_token", token).json({ token: token, id: user.id });
    })
}

//Get All Users
exports.getAllUsers=async (req,res)=>{
    //Get All Users except Admins
    try {
        const users=await User.find(
            { role: {$ne: 2}}
        ).limit(10);
        res.json(users);
    } catch (err) {
        res.status(400).send(err);
    }
} 

//Get One User
exports.getUser=async (req,res)=>{
    const id = req.params.id;
    try{
        const user = await User.findById(id);
        if(!user) res.status(404).send({message : `Not found user with id ${id}` });
        res.json(user);
    }catch(err){
        res.status(400).send({message : "ERROR"});
    }
 }

 //Block and Unblock One User By Admin
 exports.block_unblock=async (req,res)=>{
    if(req.user_jwt.user.role!=2){
		res.status(401).json({error:'Not an admin !'})
	}
    const id = req.params.id;
    //Get user
    const user =await User.findById(id);
    //Change bloked value 
    User.updateOne({_id:id},{$set:{
        blocked:!user.blocked
     }},(err,msg)=>{
        if (err) {
            res.status(400).send(err);
        }
        res.json(msg);
    });
 }

//Update User profile
exports.updateUser=async (req,res)=>{
    const id = req.params.id;
    //Recuperer ancien image d'utulisteur
    var imagePath=(await User.find({_id:id}).select({imagePath:1}))[0].imagePath;

    console.log("image ="+imagePath)
    if(req.file!==undefined) imagePath = `${process.env.URL}/${req.file.path}`;
    const {name,email,address,city,phone,gender} = req.body;
	
	User.findByIdAndUpdate(id,{name,email,address,city,phone,gender,imagePath},{new:true}, (err, user)=>{
        if (err) {
            return res.status(400).send(err);
            condole.log(err)
        }
        //régénérer un nouveau token de user
        const {id,name,email,role,address,city,phone,gender,image,confirmed,blocked,imagePath}=user;
        const token =jwt.sign(
            {user:{id,name,email,role,address,city,phone,gender,image,confirmed,blocked,imagePath}},
            process.env.JWT_SECRET,
            {expiresIn: '1d'});
        res.header("auth_token", token).json({ token: token, id: user.id });
    });
}
//Delete User By Admin
exports.deleteUser=async (req,res)=>{
	if(req.user_jwt.user.role!=2){
		res.status(401).json({error:'Not an admin !'})
	}
	const remId = req.params.id;
	try{
		Reservation.deleteMany({client: remId }, function (err, rest) {
			if (err){
				res.status(400).send(err);
			}
			//res.json(rese);
            console.log(`All reservations have been deleted ${rest}`);
		});
		Offer.deleteMany({landlord: remId }, function (err, offer) {
			if (err){
				    res.status(400).send(err);
			}
			//res.json(offer);
            console.log("All offers have been deleted");
		});
		Message.deleteMany({userSrc: remId,userDst: remId }, function (err, msg) {
			if (err){
				res.status(400).send(err);
			}
			//res.json(msg);
            console.log("All messages have been deleted");
		});
		Favorite.deleteMany({client: remId }, function (err, fav) {
			if (err){
				res.status(400).send(err);
			}
			//res.json(fav);
            console.log("All favorites have been deleted");
		});
		const userrem =await User.findByIdAndDelete(remId);
        //Send deleted User
		res.json(userrem);
        console.log("User has been deleted");
	}catch(err){
		res.status(400).send({message : "ERROR"});
	}
}

//Email confirmation
exports.confirmation_token=async (req,res)=>{
    try {
        const _id =jwt.verify(req.params.confirmation_token, process.env.EMAIL_SECRET);
        await User.findByIdAndUpdate(
            _id,
            {$set:{
                confirmed:true
            }},
            {useFindAndModify: false},
            (err,msg)=>{
                if (err) {
                    return res.status(400).send(err);
                }
                res.redirect('http://localhost:4200/signin');
            }
        );
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}
