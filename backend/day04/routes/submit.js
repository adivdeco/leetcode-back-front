
const express = require('express');
const userMiddleware = require("../middleware/userMiddleware");
const { userSubmit } = require('../controllers/userSubmit');

const submitRouter = express.Router();


submitRouter.post('/submit/:id' , userMiddleware,userSubmit)