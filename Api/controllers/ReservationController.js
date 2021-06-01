const Reservation = require('../models/reservation');

exports.applyForRes =(req,res)=>{
    const {userId,offerId,message} = req.query;
    const reservation = new Reservation({client:userId,offer:offerId,message});
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
        const Reservations =await Reservation.find({offer:idOffer});
        res.json(Reservations);
    } catch (err){
        res.status(400).send(err);
    }
}
exports.showReservationByClient= async (req,res)=>{
    const idClient = req.params.id;
    try {
        const Reservations =await Reservation.find({client:idClient});
        res.json(Reservations);
    } catch (err){
        res.status(400).send(err);
    }
}