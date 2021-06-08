const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user');
const favorite = require('./routes/favorite');
const offer=require('./routes/offer');
const reservation=require('./routes/reservation');
const cors=require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
const expressVlidator = require('express-validator');
const cookieParser=require('cookie-parser');

mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true})
    .then(()=>{console.log("Connecting to database ...")})
    .catch(err=>{
        console.log("Can not connect to database!! ",err)
    })
    
app.use(express.json({limit:'50mb'}));
// app.use(express.urlencoded());
app.use('/images', express.static('images'));
app.use(cors());
app.use(expressVlidator());
app.use(cookieParser());
app.use(cors());

app.use('/api/users',user);
app.use('/api/favorite',favorite);
app.use('/api/offers',offer);
app.use('/api/reservation',reservation);



const port=process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Application listen to port ${port}`)})