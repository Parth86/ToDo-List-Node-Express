const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    action: {
        type: String,
        required: [true, 'action must be provoded']
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Complete']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        default: '63cc23501294deba7483dccd',
        required: [true, 'user must be provoded']
    }
}, 
    {timestamps: true})

module.exports = mongoose.model('todos', TodoSchema)