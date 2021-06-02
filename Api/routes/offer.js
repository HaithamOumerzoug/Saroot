const express = require('express');
const router=express.Router();
const offer=require('../controllers/OfferController');
const { offerValidator } = require('../middlewars/offerValidator');
const {multistorage} = require('../helpers/storage');

//Offer routes
router.get('/getByLandlord/:id',offer.getByLandlord);
router.post('/add',multistorage,offerValidator,offer.addOffer);
router.put('/:id',offerValidator,offer.updateOffer);
router.get('/all',offer.getAllOffers);
router.get('/getByCriterias',offer.getByCriterias);
router.get('/getByPrice',offer.getByPrice);
router.get('/:id',offer.getOffer);
router.delete('/:id',offer.deleteOffer);
module.exports=router;