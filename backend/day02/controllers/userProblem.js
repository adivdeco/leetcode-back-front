// const { getlanguageById,submitBatch,submitToken } = require('../utils/ProblemsValidtor');
const Problem = require('../models/problemSchema');
const userMiddleware = require('../middleware/userMiddleware');
const {getlanguageById,submitBatch,submitToken} = require('../utils/ProblemsValidtor');

const createProblem = async (req, res) => {

    const {title,description,tags,visibleTestCases,
        hiddenTestCases,startCode,referenceSolution,problemCreator} = req.body;
       
       

        try{
           
            for(const {language,completeCode} of referenceSolution){   
                const languageId =  getlanguageById(language);
               console.log("Language ID:", languageId);
               

            const submissions = visibleTestCases.map((testCase)=>({  // input, output =part of examle
            source_code:completeCode,  // question code
            language_id: languageId,
            stdin: testCase.input,
            expected_output: testCase.output
        }));
        // const submissions  creates an array of objects like this in last line

        const submitResult = await submitBatch(submissions);  // this give data of all submissions  as tocken arr=> as [ { tocken:ndjbdjkh289u90u3},{ tocken:ndjbdjkh289u90u3}]
        // console.log("Submit Result:", submitResult);

        const resultToken = submitResult.map((value)=> value.token); // hear we make array of all tokens like [ndjbdjkh289u90u3, ndjbdjkh289u90u3]
        console.log("Result Tokens:", resultToken);

        const testResult = await submitToken(resultToken); // this will give all test cases result as array of objects like [{status:{id:3},time:0.1,memory:1024},{status:{id:3},time:0.1,memory:1024}]
        // console.log("Test Result:", testResult);
        

    //     for(const test of testResult){
    //     if(!test.status || test.status.id !== 3){
    //      return res.status(400).send("Error Occured");
    //     }
    //    }

     }
console.log("helo");

//export to db
    const problem = await Problem.create({
        ...req.body,
        problemCreator: req.finduser._id
    }); 
    res.status(201).send( "Problem created successfully");
    console.log("Problem created");

}
        catch(err){
            console.error("Error creating problem:", err);
            res.status(500).send({message: "Error creating problem", error: err.message});
        }
        

} 














module.exports = createProblem;





// const submissions = [
//     {
//       "language_id": 46,
//       "source_code": "echo hello from Bash",
//       stdin:23,
//       expected_output:43,
//     },
//     {
//       "language_id": 46,
//       "source_code": "echo hello from Bash",
//       stdin:23,
//       expected_output:43,
//     },
//  ]