const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    referralCount: { type: Number, default: 0 },
    referralEarnings: { type: Number, default: 0 },
    completedTasks: {
        telegram: { type: Boolean, default: false },
        twitter: { type: Boolean, default: false },
        retweet: { type: Boolean, default: false },
        invite3: { type: Boolean, default: false },
        invite5: { type: Boolean, default: false }
    },
    lastDailyClaim: { type: Date }
}, { timestamps: true });

// Task Schema
const taskSchema = new mongoose.Schema({
    taskType: { type: String, required: true },
    reward: { type: Number, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

// Referral Schema
const referralSchema = new mongoose.Schema({
    referrerAddress: { type: String, required: true },
    refereeAddress: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

// Models
const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);
const Referral = mongoose.model('Referral', referralSchema);

module.exports = {
    User,
    Task,
    Referral
};
