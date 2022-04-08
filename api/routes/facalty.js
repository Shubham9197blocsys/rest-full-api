const express =require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'this is facalty get req'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'this is facalty post req'
    })
})



module.exports = router;