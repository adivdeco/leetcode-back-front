const Problem = require('../models/problemSchema');
const Solution = require('../models/solutionSchema');
const User = require('../models/userSchema');
const { getlanguageById,submitBatch,submitToken } = require('../utils/ProblemsValidtor');



const createProblem = async (req, res) => {

    const {title,description,tags,visibleTestCases,
        hiddenTestCases,startCode,referenceSolution,problemCreator} = req.body;
       
       

        try{
           
            for(const {language,completeCode} of referenceSolution){  

                const languageId =  getlanguageById(language);
               console.log("Language ID:", languageId);
               

            const submissions = visibleTestCases.map((testCase)=>({  
            source_code:completeCode,  // question code
            language_id: languageId,
            stdin: testCase.input,
            expected_output: testCase.output
        }));
        // const submissions  creates an array of objects like this in last line

        const submitResult = await submitBatch(submissions);  // this give data of all submissions  as tocken arr=> as [ { tocken:ndjbdjkh289u90u3},{ tocken:ndjbdjkh289u90u3}]

        const resultToken = submitResult.map((value)=> value.token); // hear we make array of all tokens like [ndjbdjkh289u90u3, ndjbdjkh289u90u3]

        const testResult = await submitToken(resultToken); // this will give all test cases result as array of objects like [{status:{id:3},time:0.1,memory:1024},{status:{id:3},time:0.1,memory:1024}]

     }

//export to db
    const problem = await Problem.create({
        ...req.body,
        problemCreator: req.finduser._id, 
    }); 
    res.status(201).send({message: "Problem created successfully",problem});

}
        catch(err){
            console.error("Error creating problem:", err);
            res.status(500).send({message: "Error creating problem", error: err.message});
        }
        

} 

const updateProblem = async()=>{
    
    const {id} = req.params; 
   
    const {title,description,tags,visibleTestCases,
        hiddenTestCases,startCode,referenceSolution,problemCreator} = req.body;
       
    
    try{
           for(const {language,completeCode} of referenceSolution){   
                const languageId =  getlanguageById(language);
               console.log("Language ID:", languageId);
               

            const submissions = visibleTestCases.map((testCase)=>({  
            source_code:completeCode,  
            language_id: languageId,
            stdin: testCase.input,
            expected_output: testCase.output
        }));

        const submitResult = await submitBatch(submissions);

        const resultToken = submitResult.map((value)=> value.token); 

        const testResult = await submitToken(resultToken); 

     }
      const newProblem = await Problem.findByIdAndUpdate(id ,{...req.body},{runValidators:true,new:true}); 
        if(!newProblem){
            return res.status(404).send("Problem not found");
        }

      res.status(200).send("Problem updated successfully");
     }  

     catch(err){
        res.status(500).send("Error: "+err)
     }  
}


const deleteProblem = async()=>{
    const {id} = req.params;

    try{
        const delproblem = await Problem.findByIdAndDelete(id);
        if(!delproblem){
            return res.status(404).send("Problem not found");
        }
        res.status(200).send("Problem deleted successfully");
    }
    catch(err){
        res.status(500).send("Error: "+err)
    }
}


const problemFetch = async (req, res) => {

    const {id} = req.prams

try{
     const findproblem = await Problem.findById(id);
        if(!findproblem){
            return res.status(404).send("Problem not found");
        }
        res.status(200).send("Problem find successfully"); 
}
catch(err){
    res.status(500),send("error: "+err)
}
}

const getAllProblem = async (req, res) => {
    
    try{
          const allproblem = await Problem.find({})                        //await Problem.find({skip:10,limit:10}); // 
          if(allproblem.length === 0){                                     //await Problem.find({difficulty: "easy",tags:"array"}); 
            return res.status(404).send("No problems found");
          }
          res.status(200).send("All problems fetched successfully");
    }
    catch(err){
        res.status(500).send("Eroor: "+err)
    }
}

const solvedProblem = async (req,res)=>{    
    try{
        // const count = req.finduser.problemSolved.length;
        // if(count === 0){
        //     return res.status(404).send("No problems solved yet");
        // }
        // res.status(200).send(count + " problems solved by user"); 

        //****** another approach to get all solved problems

        const userId = req.finduser._id; 
        const user = await User.findById(userId)
        .populate({
            path:'problemSolved',
            select:'title description tags'
        }); // populate the problemSolved field with problem data

        res.status(200).send( user);
    }
    catch(err){
        res.status(500).send("Error: "+err)
    }
} // gives all unique problems  solved by user not all submissions


const allsubmission = async (req, res) => {
    const userId = req.finduser._id;
    const problemId = req.params.id

    try{
        const allsubmissions = await Solution.find({userId, problemId})

    if(allsubmissions.length === 0){
        return res.status(404).send("No submissions found for this problem");
    }
            res.status(200).send(allsubmissions);

            
}
catch(err){
    res.status(500).send("Error: "+err)
}
}

 



module.exports = {createProblem, updateProblem , deleteProblem,problemFetch ,getAllProblem ,solvedProblem,allsubmission};





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