const mongoose = require('mongoose');
const { timeout } = require('nodemon/lib/config');

const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId, 
    username:String,
    password:String,
    phone:Number,
    email:String,
    usertype:String,
    Date:{
        type:Date,
        default:Date.now
    }
})


module.exports =mongoose.model('User',userSchema);