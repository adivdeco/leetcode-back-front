const express = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const createProblem = require('../controllers/userProblem');
const {getlanguageById,submitBatch,submitToken} = require('../utils/ProblemsValidtor');

const problemRouter = express.Router();

//admin
problemRouter.post('/create', adminMiddleware,createProblem);
// problemRouter.patch('/:id', updateProblem);
// problemRouter.delete('/:id', deleteProblem);


// //user
// problemRouter.get("/:id",problemFetch);
// problemRouter.get("/", getAllProblem);
// problemRouter.get("/user", solvedProblem);


module.exports = problemRouter;