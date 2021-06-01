const Favorite = require('../models/favorite');
exports.addToFavorites=(req,res)=>{
	const {userId,offerId} = req.query;
	var favorite = new Favorite({client:userId,offer:offerId});
	favorite.save((err,favorite)=>{
        if(err){
            return res.status(400).send(err);
        }
        res.json(favorite);
    })
}
exports.deleteFromFavorites=async (req,res)=>{
	//const {userId,offerId} = req.params;
	const favId=req.params.id;
	//Favorite.findOneAndRemove({client:userId,offer:offerId},function (err, remfavorite)
	try {
		const remfavorite =await Favorite.findByIdAndDelete(favId);
		res.json(remfavorite);	
	} catch (err){
        res.status(400).send(err);
	}
}
exports.getFavorites = async (req,res)=>{
	const idClient = req.params.id;
	try {
		const favorites =await Favorite.find({client:idClient});
		res.json(favorites);	
	} catch (err){
        res.status(400).send(err);
	}
}