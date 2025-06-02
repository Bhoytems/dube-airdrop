const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskType: { type: String, required: true },
    reward: { type: Number, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
