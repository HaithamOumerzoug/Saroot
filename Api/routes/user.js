const express = require('express');
const router = express.Router();
const {
    getUser,
    updateUser,
    getAllUsers,
    block_unblock,
    deleteUser,
    confirmation_token,
    signup,
    signin
} = require('../controllers/UserController');

const {userSignUpValidator,userSignInValidator} = require('../middlewars/userValidator');
const {verifierToken}=require('../middlewars/verifierToken');
const {storage} = require('../helpers/storage');

//API Routes

//>>User
router.get('/all',getAllUsers);
router.get('/:id',verifierToken,getUser);
router.put('/:id',storage,verifierToken,updateUser);

router.post('/block/:id',verifierToken,block_unblock);
router.delete('/:id',verifierToken,deleteUser);
router.get('/confirmation/:confirmation_token',confirmation_token);

//>>Auth
router.post('/signup',storage,userSignUpValidator,signup);
router.post('/signin',userSignInValidator,signin);

module.exports=router; 