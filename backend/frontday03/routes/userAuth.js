const express = require('express');

const { register, login, logout ,adminregister,deletedprofil } = require ('../controllers/userAuthent.js');
const userMiddleware = require('../middleware/userMiddleware.js');
const adminMiddleware = require('../middleware/adminMiddleware.js');

const authRoutre = express.Router()

authRoutre.post('/register', register)
authRoutre.post('/login', login );
authRoutre.post('/logout', userMiddleware, logout);
authRoutre.post('/admin/register', adminMiddleware, adminregister);
authRoutre.get("/check" , userMiddleware ,(req,res)=>{

    const reply ={
        name:req.finduser.name,
        email:req.finduser.email,
        _id:req.finduser._id
    }
    res.status(200).json({
        message:"valid user",
        user:reply
    })
})



module.exports = authRoutre;