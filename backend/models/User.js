const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);
