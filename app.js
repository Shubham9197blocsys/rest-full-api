const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app =express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const User =require('./api/model/user')



mongoose.connect('mongodb+srv://shubham:shubham9197@api123.yrkvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

mongoose.connection.on('error',err=>{
    console.log('connection faild');
});

mongoose.connection.on('connected',connected=>{
    console.log('connected succesfuly');
});

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



const studentRoute =require('./api/routes/student');
const facaltyRout =require('./api/routes/facalty');
const userRoute =require('./api/routes/user');
const { countDocuments } = require('./api/model/student');

app.use('/student',studentRoute);
app.use('/facalty',facaltyRout);
app.use('/user',userRoute);


app.use((req,res,next)=>{
    res.status(404).json({
        error:'url not found'
    })
})



module.exports=app;