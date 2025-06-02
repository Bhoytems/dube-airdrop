const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dube_airdrop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Models
const User = require('./models/User');
const Task = require('./models/Task');
const Referral = require('./models/Referral');

// Routes
app.get('/', (req, res) => {
    res.send('DUBE Airdrop API');
});

// User endpoints
app.post('/api/users', async (req, res) => {
    try {
        const { walletAddress } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ walletAddress });
        if (existingUser) {
            return res.status(200).json(existingUser);
        }
        
        // Create new user
        const newUser = new User({
            walletAddress,
            balance: 0,
            referralCount: 0,
            referralEarnings: 0,
            lastDailyClaim: null
        });
        
        await newUser.save();
        
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/users/:walletAddress', async (req, res) => {
    try {
        const user = await User.findOne({ walletAddress: req.params.walletAddress });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Task endpoints
app.post('/api/tasks/complete', async (req, res) => {
    try {
        const { walletAddress, taskType } = req.body;
        
        // Find user
        const user = await User.findOne({ walletAddress });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Check if task already completed
        if (user.completedTasks[taskType]) {
            return res.status(400).json({ error: 'Task already completed' });
        }
        
        // Determine reward
        let reward = 0;
        switch (taskType) {
            case 'telegram':
                reward = 30;
                break;
            case 'twitter':
                reward = 50;
                break;
            case 'retweet':
                reward = 30;
                break;
            case 'invite3':
                if (user.referralCount < 3) {
                    return res.status(400).json({ error: 'Need at least 3 referrals' });
                }
                reward = 400;
                break;
            case 'invite5':
                if (user.referralCount < 5) {
                    return res.status(400).json({ error: 'Need at least 5 referrals' });
                }
                reward = 700;
                break;
            default:
                return res.status(400).json({ error: 'Invalid task type' });
        }
        
        // Update user
        user.completedTasks[taskType] = true;
        user.balance += reward;
        
        if (taskType === 'invite3' || taskType === 'invite5') {
            user.referralEarnings += reward;
        }
        
        await user.save();
        
        res.json({ 
            success: true,
            reward,
            newBalance: user.balance
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Daily bonus endpoints
app.post('/api/daily', async (req, res) => {
    try {
        const { walletAddress } = req.body;
        
        // Find user
        const user = await User.findOne({ walletAddress });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const now = new Date();
        const lastClaim = user.lastDailyClaim ? new Date(user.lastDailyClaim) : null;
        
        // Check if 24 hours have passed
        if (lastClaim && (now - lastClaim) < 24 * 60 * 60 * 1000) {
            return res.status(400).json({ error: 'Can only claim once every 24 hours' });
        }
        
        // Update user
        user.balance += 10;
        user.lastDailyClaim = now;
        await user.save();
        
        res.json({
            success: true,
            reward: 10,
            newBalance: user.balance,
            nextClaimAvailable: new Date(now.getTime() + 24 * 60 * 60 * 1000)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Referral endpoints
app.post('/api/referrals', async (req, res) => {
    try {
        const { referrerAddress, refereeAddress } = req.body;
        
        // Check if referral already exists
        const existingReferral = await Referral.findOne({ referrerAddress, refereeAddress });
        if (existingReferral) {
            return res.status(400).json({ error: 'Referral already exists' });
        }
        
        // Create new referral
        const newReferral = new Referral({
            referrerAddress,
            refereeAddress,
            date: new Date()
        });
        
        await newReferral.save();
        
        // Update referrer's count
        const referrer = await User.findOne({ walletAddress: referrerAddress });
        if (referrer) {
            referrer.referralCount += 1;
            
            // Check for tier bonuses
            if (referrer.referralCount === 3) {
                referrer.balance += 400;
                referrer.referralEarnings += 400;
                referrer.completedTasks.invite3 = true;
            } else if (referrer.referralCount === 5) {
                referrer.balance += 700;
                referrer.referralEarnings += 700;
                referrer.completedTasks.invite5 = true;
            }
            
            await referrer.save();
        }
        
        res.status(201).json(newReferral);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/referrals/:walletAddress', async (req, res) => {
    try {
        const referrals = await Referral.find({ referrerAddress: req.params.walletAddress })
            .sort({ date: -1 });
            
        res.json(referrals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leaderboard endpoint
app.get('/api/leaderboard', async (req, res) => {
    try {
        const users = await User.find({})
            .sort({ balance: -1 })
            .limit(100);
            
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
