const Reservation = require('../models/reservation');

exports.applyForRes =(req,res)=>{
    const {userId,offerId,typeOffer,message} = req.query;
    //console.log(typeOffer)
    const reservation = new Reservation({client:userId,offer:offerId,typeRes:typeOffer,message});
    reservation.save((err,reservation)=>{
        if(err){
            return res.status(400).send(err);
        }
        res.json(reservation);
    })
}
exports.deleteReservation = async (req,res)=>{
    const resvId=req.params.id;

    try {
        const remReservation =await Reservation.findByIdAndDelete(resvId);
        res.json(remReservation);
    } catch (err){
        res.status(400).send(err);
    }
}

exports.showReservation= async (req,res)=>{
    const idOffer = req.params.id;
    try {
        const Reservations =await Reservation.find({offer:idOffer}).sort({updatedAt:-1});
        res.json(Reservations);
    } catch (err){
        res.status(400).send(err);
    }
}
exports.showReservationByClient= async (req,res)=>{
    const idClient = req.params.id;
    try {
        const Reservations =await Reservation.find({client:idClient}).sort({updatedAt:-1});
        res.json(Reservations);
    } catch (err){
        res.status(400).send(err);
    }
}
exports.getAllReservation = async (req,res)=>{
    try {
        const Reservations =await Reservation.find({});
        res.json(Reservations);
    } catch (err){
        res.status(400).send(err);
    }
}
