const express = require('express');
const router = express.Router();
const reservation = require('../controllers/ReservationController');


router.post('/apply',reservation.applyForRes);
router.delete('/:id',reservation.deleteReservation);
router.get('/getReservation/:id',reservation.showReservation);
router.get('/ReservationByClient/:id',reservation.showReservationByClient);
router.get('/getall',reservation.getAllReservation);
module.exports = router;