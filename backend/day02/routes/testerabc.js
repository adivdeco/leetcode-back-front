
const express = require('express');
const Problem = require('../models/problemSchema')

const tester = express.Router();

tester.post('/sol1' ,async (req, res) => {

    try{
          const { data } = req.body;

          for(const {language, code} of data){
            if(!language || !code){
                return res.status(400).send("Language and code are required");
            }
            
        }
        const push = await Problem.create({data})
            console.log("Problem created successfully", push);
            res.status(201).send("Problem created successfully");
    }
    catch(err){
        throw new Error("Error in solving problem: " + err.message);
    }
});


module.exports = tester;