const { findByIdAndUpdate } = require('../models/offer');
const Offer = require('../models/offer');
const Favorite = require('../models/favorite');
//Add Offer
exports.addOffer=async (req,res)=>{
    const offer = new Offer(req.body);
    try {
      await offer.save();
      res.json(offer);

    } catch (err) {
      res.status(400).send(err);
    }
};
//Delete Offer
exports.deleteOffer=async(req, res) => {
  const offerId = req.params.id;
  console.log("bonjour");
	try{
		Favorite.deleteMany({offer: offerId }, function (err, rest) {
			if (err){
				res.status(400).send(err);
			}
      console.log('All Favorites deleted');
		});
		const offerrem =await Offer.findByIdAndDelete(offerId);
		res.json(offerrem);
        console.log("Offer has been deleted");
	}catch(err){
    console.log(err);
		res.status(400).send({message : "ERROR"});
	}
}
//Update One Offer
exports.updateOffer=(req, res) => {
    const id = req.params.id;
    Offer.findOneAndUpdate(id,req.body,{new:true},(err,offer)=>{
      if(!offer){
        res.status(404).send({ message : "offer was not found !!"});
      } 
      if(err){
        res.status(500).send({
          message : `Error Updating Offer with id = ${id}`
        });
      };
      res.send({
        Offer:offer,
        message : "Offer was updated successfuly."
      });
     
  });
}
//Get One Offer
  exports.getOffer=(req,res)=>{
    const id = req.params.id;
    Offer.findById(id).then(offer=>{
      if(!offer) res.status(404).send({message : `Not found offer with id ${id}`});
      res.json(offer);
    })
    .catch(err=>{
      res.status(500).send(err);
    });
  };
  //Get All published Offers
  exports.getAllOffers=async (req,res)=>{
    try {
      const offers=await Offer.find({}).limit(10);
      res.json(offers);
    } catch (err) {
      res.status(400).send(err);
    }
  }
  exports.getByPrice = (req,res) =>{
    const {minPrice,maxPrice} = req.body;
    Offer.find({price: { $gt: minPrice, $lt: maxPrice }}, function (err, offers) {
      if (err){
        res.status(400).send(err);
      } else{
        res.json(offers);
      }
    });
};
exports.getByLandlord = (req,res) =>{
  const idLand = req.params.id;
  console.log(idLand);
  Offer.find({landlord:idLand}, function (err, offers) {
    if (err){
      res.status(400).send(err);
    } else{
      res.json(offers);
    }
  });
};

exports.getByCity = (req,res) =>{
  const cityP = req.params.city;
  Offer.find({city : cityP}, function (err, offers) {
    if (err){
      res.status(400).send(err);
    } else{
      res.json(offers);
    }
  });
};
exports.getByNbrRooms = (req,res) =>{
  const nbrRms = req.params.numb_room;
  Offer.find({numb_room : nbrRms}, function (err, offers) {
    if (err){
      res.status(400).send(err);
    } else{
      res.json(offers);
    }
  });
};
exports.getByKeyWord = (req,res) =>{
  const {keyWord} = req.body;
  Offer.find({$or:[{title: { $regex: keyWord }}, {description : {$regex: keyWord}}]}, function (err, offers) {
    if (err){
      res.status(400).send(err);
    } else{
      res.json(offers);
    }
  });
};
exports.getByIsFurnished = (req,res) => {
  const {isFur} = req.body;
  Offer.find({isFurnished : isFur}, function (err, offers) {
    if (err){
      res.status(400).send(err);
    } else{
      res.json(offers);
    }
  });
}
//Méthode de multi recherche
exports.getByCriterias = async (req,res) => {
  try{
    //Get max price
    const offer = await Offer.find().sort({price:-1}).limit(1);
    const priceMax = offer[0].price;
    //Get query
    var {keyWord,cityP,minPrice,maxPrice,isFur} = req.query;

    if(keyWord == undefined) keyWord = "";
    if(minPrice == undefined) minPrice = 0;
    if(cityP == undefined) cityP = "";
    if(maxPrice == undefined) maxPrice = priceMax;
    if(isFur == undefined) isFur = false;
    if(minPrice>maxPrice){
      return res.status(400).send({
        message : "Non trouvé"
      });
    }
    Offer.find({$and : [{title:new RegExp(keyWord,'i')}, {description:new RegExp(keyWord,'i')},{city:new RegExp(cityP,'i')},{price: {$gte: minPrice}},{price : {$lte: maxPrice}},{isFurnished : isFur}]},function(err,offers){
      if(err){
        res.status(400).send(err);
      }else{
        if(offers.length== 0){
          return res.status(400).send({
            message : "Non trouvé"
          });
        }
        res.json(offers);
      }
    });
  }catch(err){
    console.log(err);
  }
}