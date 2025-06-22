const express = require('express');
const main = require('./config/database');
require('dotenv').config();
const authRoutre = require('./routes/userAuth');
const cookieParser = require('cookie-parser');
const redisClint = require('./config/redis');
const problemRouter = require('./routes/problemCreator');
// const tester = require('./routes/testerabc'); 
const app = express();





app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies


app.use('/auth' , authRoutre) // user  login,registration,logout and progile view code
app.use('/problem', problemRouter)
// app.use('/solve', tester)



const surver = async ()=>{
    
    try{
         await Promise.all([main(),redisClint.connect()]);

        console.log('Connected to MongoDB and Redis');

         app.listen(5500, () => {
        console.log('Server is running on port 5500');
    });
    }
    catch(err){
        console.error('Error connecting to MongoDB:', err);
    }
}
surver();


// main()
// .then(async () => {
//     console.log('Connected to MongoDB');

//     app.listen(5500, () => {
//         console.log('Server is running on port 5500');
//     });
    
// })

