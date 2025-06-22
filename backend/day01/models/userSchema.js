


const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLenghth:10,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minLength:4,
        // maxLength:10,
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user',
    },
    problemSolved:{
        type:[String],
        // default:0,
    },
    
},{
    timestamps:true,
    versionKey:false,
});

const User = mongoose.model('userdata', userSchema);
module.exports = User;