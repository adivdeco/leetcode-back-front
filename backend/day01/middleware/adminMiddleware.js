const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const redisClint = require('../config/redis');

const adminMiddleware = async(req, res, next) => {

    try{
         const {token} = req.cookies;
        if (!token) {
            return res.status(401).send("Tocken is not provided")}

    const payload = jwt.verify(token, "secreatkey")

    const {_id, role} = payload;
    if (!_id || role !== 'admin') {
        return res.status(403).send("Forbidden: You do not have admin access")}

        const finduser = await User.findById(_id);
        if (!finduser) {
            return res.status(404).send("User not found");
        }
  // Redis ke blockList mein persent toh nahi hai

        const IsBlocked = await redisClint.exists(`token:${token}`);

        if(IsBlocked)
            throw new Error("Invalid Token");

        res.finduser = finduser; 
        next(); 
         
    }
    catch(err){
        throw new Error("Error in adminMiddleware: " + err.message);
    }
}


module.exports = adminMiddleware;