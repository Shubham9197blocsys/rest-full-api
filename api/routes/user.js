const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const { status } = require('express/lib/response');
const User = require('../model/user');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { execMap } = require('nodemon/lib/config/defaults');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const { countDocuments, db } = require('../model/user');
const { set } = require('../../app');
const timespan = require('jsonwebtoken/lib/timespan');
const text = require('body-parser/lib/types/text');
const user = require('../model/user');
let ObjectId = require('mongodb').ObjectID;
const nodemailer =require('nodemailer');





router.get('/',checkAuth,(req,res,next)=>{
    User.find()
    .exec()
    .then(result=>{
        res.status(200).json({
            User:result
    })
        })     
    })



    
router.get('/date',(req,res,next)=>{
        User.find({
            _id: {
                $gte: ObjectId.createFromTime(Date.now() / 1000 - 24 * 60 * 60)
            },
            var: transporter = nodemailer.createTransport({
   
                service:"gmail",
                auth:{
                    user:'shubham@blocsys.com',
                    pass:'8055339863'
                }
            })
        }, (err, result) => {
            res.status(200).json({
                User: mailOptions={
                    from:'shubham@blocsys.com',
                    to:'pranay@blocsys.com',
                    subject:'simpal project',
                    text:"number of users are" +" "+  {User:result}.User,
                }
                
        })
         
        transporter.sendMail(mailOptions,function(error, info){
            if(error){
                console.log(error);
            }
            else{
               console.log('email has been send',info.response)
            }
        })
        }).countDocuments();
        
        
    })

    
   

    

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{
            const user =new User({
                _id:new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                phone:req.body.phone,
                email:req.body.email,
                usertype:req.body.usertype
            })

            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
})

router.post("/login",(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length <1)
        {
            return res.status(401).json({
                msg:'user is exist'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
              return res.status(401).json({
                  msg:'password match fail'
              })
            }
            if(result)
            {
                const token = jwt.sign({
                    username:user[0].username,
                    password:user[0].password,
                    usertype:user[0].usertype,
                    email:user[0].email,
                    phone:user[0].phone
                }, 
                'this is dummy text',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    username:user[0].username,
                    password:user[0].password,
                    usertype:user[0].usertype,
                    email:user[0].email,
                    phone:user[0].phone,
                    token:token
                })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})





module.exports = router;