const express = require('express');

const { register, login, logout ,adminregister,deletedprofil } = require ('../controllers/userAuthent.js');
const userMiddleware = require('../middleware/userMiddleware.js');
const adminMiddleware = require('../middleware/adminMiddleware.js');

const authRoutre = express.Router()

authRoutre.post('/register', register)
authRoutre.post('/login', login );
authRoutre.post('/logout', userMiddleware, logout);
authRoutre.post('/admin/register', adminMiddleware, adminregister);
authRoutre.delete("/delprofile",userMiddleware, deletedprofil);



module.exports = authRoutre;