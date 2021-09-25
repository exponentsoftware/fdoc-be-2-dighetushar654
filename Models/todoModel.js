const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim:true,
    },
    todotitle: {
        type: String,
        require: true,
        trim:true
    },
    status: {
        type: String,
        trim:true
    },
    category:{
        type: String,
        enum : ['work','hobby','task'],
        default: 'task'
    }
},
   {timestamps: true});

module.exports = mongoose.model('Todo', todoSchema);