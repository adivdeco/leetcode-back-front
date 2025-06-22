
const mongoose = require('mongoose');
const { Schema } = mongoose;


const problemSchema = new Schema({
     
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    tags:{
        type: [String],
        enum: ['array', 'string', 'linkedlist', 'tree', 'graph', 'dynamic programming', 'greedy', 'backtracking'],
        required: true,
    },
     visibleTestCases:[
        {
            input:{
                type:String,
                required:true,
            },
            output:{
                type:String,
                required:true,
            },
            explanation:{
                type:String,
                required:true
            }
        }
    ],
      hiddenTestCases:[
        {
            input:{
                type:String,
                required:true,
            },
            output:{
                type:String,
                required:true,
            }
        }
    ],

     startCode: [
        {
            language:{
                type:String,
                required:true,
            },
            initialCode:{
                type:String,
                required:true
            }
        }
    ],
     referenceSolution:[
        {
            language:{
                type:String,
                required:true,
            },
            completeCode:{
                type:String,
                required:true
            }
        }
    ],

    problemCreator:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
//    data:[{
//      code: {
//         type: String,
//         required: true,
//     },
//     language: {
//         type: String,
//         required: true,
//     }
// }]

})

const Problem = mongoose.model('problemdata', problemSchema);
module.exports = Problem;