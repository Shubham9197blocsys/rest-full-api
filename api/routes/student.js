const express =require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const Student = require('../model/student');
const mongoose = require('mongoose');
const student = require('../model/student');
const checkAuth = require('../middleware/check-auth');

//get data

router.get('/',(req,res,next)=>{
    Student.find()
    .then(result=>{
        res.status(200).json({
            studentData:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:error
        })
    })
})

//post data

router.post('/',(req,res,next)=>{
   const student =new Student({
   _id:new mongoose.Types.ObjectId,
   name:req.body.name,
   age:req.body.age,
   post:req.body.post
})

student.save()
.then(result=>{
    console.log(result)
    res.status(200).json({
        newStudent:result 
    })
})

.catch(err=>{
    console.log(err);
    res.status(500).json({
        error:error
    })
})

   })
   router.get('/:id',(req,res,next)=>{
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            studentData:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:error
        })
    })
})

//delete dada

router.delete('/:id',(req,res,next)=>{
    Student.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:"record deleted",
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:error
        })
    })
})

//put dada
router.put('/:id',(req,res,next)=>{
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            age:req.body.age,
            post:req.body.post
        }
    })
    .then(result=>{
        res.status(200).json({
            update:"update sucessfuly"
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:error
        })
    })
})


module.exports = router;