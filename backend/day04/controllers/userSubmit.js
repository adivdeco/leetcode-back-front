const Solution = require("../models/solutionSchema");
const Problem = require("../models/problemSchema"); 
const { getlanguageById,submitBatch,submitToken } = require('../utils/ProblemsValidtor');



const userSubmit = async (req, res) => {

    try{
          const userId = req.finduser._id
          const problemId = req.params.id;

          const { code, language } = req.body;
          if (!code || !language || !problemId || !userId) {
              return res.status(400).send("Code and language are required");
          }

// fetch the problem to check if it exists
          const problems = await Problem.findById(problemId);
          if (!problems) {
              return res.status(404).send("Problem not found");
          }
          // add all the data of soln to db.. then to judge0 . 
         
          const submitedResult = await Solution.create({
            userId,
            problemId,
            code,
            language,
            status: "pending",
            testCasesTotal:problems.hiddenTestCases.length,
            //  testCasesPassed :0,
            //  errorMessage : null,
            //  status : "pending",  // we can do it like tis too
            //  runtime : 0,
            //  memory : 0

          })
 
          // send the data to judge0 api

         const languageId =  getlanguageById(language);

          const submissions =  problems.hiddenTestCases.map((testCase)=>({  
            source_code:code,  // question code
            language_id: languageId,
            stdin: testCase.input,
            expected_output: testCase.output
        }));

        const submitResult = await submitBatch(submissions);
        const resultToken = submitResult.map((value)=> value.token);
        const testResult = await submitToken(resultToken);

        //update the solutionResult status based on the test results which is part of solutionSchema
        
        let testCasesPassed = 0;
        let errorMessage = null;
        let status = "accepted";
        let runtime = 0;
        let memory = 0;

        for (const result of testResult) {
            if (result.status_id==3) { 
                testCasesPassed++;
                runtime = runtime+parseFloat(result.time);
                memory = Math.max(memory,result.memory)

            } else if (result.status.id === 4) { // 6 means compilation error
                status = "error";
                errorMessage = result.stedrr;
            } else {
                status = "wrong_answer";
                errorMessage = result.stderr;
            }
            // runtime += result.time; // accumulate runtime
            // memory += result.memory; // accumulate memory
        }

        // store the result in database in submittedResult
       
        submitedResult.status = status;
        submitedResult.runtime = runtime;
        submitedResult.memory = memory;
        submitedResult.testCasesPassed = testCasesPassed;
        submitedResult.errormessage = errorMessage;

      await submitedResult.save();

      res.status(201).send({
         submitedResult
      });
    }
    catch(err) {
        res.status(500).send("Error: " + err.message);
    }
}


module.exports = { userSubmit}