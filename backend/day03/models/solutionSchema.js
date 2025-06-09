
const mongoose = require('mongoose');
const { Schema } = mongoose;

const solutionSchema = new Schema({

    problemId:{
        type:Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true,
        enum: ['c++', 'java', 'javascript']
    },
    status:{
        trype: String,
        enum:['pending', 'accepted', 'wrong_amnswer', 'error'],
        default:'pending'
    },
    runtime:{
        type: Number,
        default: 0
    },
    memory:{
        type: Number,
        default: 0
    },
    errormessage:{
        type: String,
        default: ''
    },
    testCasesPassed:{
        type: Number,
        default: 0
    },
    testCasesTotal:{
        type: Number,
        default: 0
    },
    timestamp:true
})

const Solution = mongoose.model('Solution' , solutionSchema);
module.exports = Solution;