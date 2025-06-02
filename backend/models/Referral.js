const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    referrerAddress: { type: String, required: true },
    refereeAddress: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Referral', referralSchema);
