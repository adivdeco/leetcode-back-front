const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const validateuser = require('../utils/validators');
const jwt = require('jsonwebtoken');
const redisClint = require('../config/redis'); 



const register = async (req, res) => {
     try {
            console.log(req.body);
            validateuser(req.body);

            const { name, email, password } = req.body;
            req.body.password = await bcrypt.hash(password,10);
            
            req.body.role = 'user'; 
            const user = await User.create(req.body);   // add data to database

            const token = jwt.sign({email:email,_id:user._id,role:'user' },"secretkey",{expiresIn:60*60}); // 1 hour expiration
            
            res.cookie('token',token, {maxAge: 60 * 60 * 1000, httpOnly: true}); // Set cookie with token
            res.send("User Created Successfully");
        }
        catch (err){
            res.send("Error: " + err.message)
        }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        const user = await User.findOne({email});   // Find user by email

        const match = await bcrypt.compare(password,user.password);

        if (!user || !match) {
            return res.status(401).send("Invalid email or password");
        }
 
        const token = jwt.sign({email:email,_id:user._id, role:user.role},"secreatkey",{expiresIn:60*60}); // 1 hour expiration
            res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true }); // Set cookie with token
            res.send("Login Successful");
         

    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }

}

const logout = async(req, res) => {

    try{
        //validate tocken
        const { token } = req.cookies;
        const payload = jwt.decode(token);
        console.log("Payload:", payload);

        await redisClint.set(`blocked:${token}` ,'blocked');
        await redisClint.expireAt(`blocked:${token}`, payload.exp); // Set expiration same as token expiration
        // res.clearCookie('token'); // Clear the cookie

        res.cookie('token',null,{expires: new Date(Date.now())}); // Clear the cookie {maxAge:0, httpOnly:true}   
        res.send("Logout Successful");

    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
}

const adminregister = async (req, res) => {
    try{
       
        validateuser(req.body);

        const { email, password } = req.body;
        req.body.password = await bcrypt.hash(password,10);

        const user = await User.create(req.body);   
        const token = jwt.sign({email:email,_id:user._id, role:user.role },"secretkey",{expiresIn:60*60}); // 1 hour expiration
        res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true }); // Set cookie with token
        res.send("Admin User Created Successfully");
    }
    catch (err) {
        res.status(500).send("Error: " + err.message);
    }
}


// const profile = (req, res) => {

// }


module.exports = {
    register,
    login,
    logout,
    adminregister
}





//  jwt.verify(user._id, "secretkey", (err, decoded) => {
//             if (err) {
//                 return res.status(500).send("Error verifying token: " + err.message);
//             }
//             const token = jwt.sign({email:email,_id:user._id});
//             res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true }); // Set cookie with token
//             res.send("Login Successful");
//         });