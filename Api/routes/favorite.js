const express = require('express');
const router=express.Router();
const fav=require('../controllers/FavoriteController');
const {verifierToken}=require('../middlewars/verifierToken');

router.post('/add',fav.addToFavorites);
router.delete('/:id',fav.deleteFromFavorites);
router.get('/getFav/:id',fav.getFavorites);

module.exports=router;