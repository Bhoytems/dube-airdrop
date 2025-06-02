// Global variables
let currentUser = null;
let userData = {
    balance: 0,
    referralCount: 0,
    referralEarnings: 0,
    completedTasks: {},
    lastDailyClaim: null
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    initApp();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check if user is logged in
    checkAuthState();
});

function initApp() {
    // Initialize any necessary components
    updateUI();
}

function setupEventListeners() {
    // Connect wallet button
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        authBtn.addEventListener('click', handleAuth);
    }
    
    // Daily bonus claim
    const claimDailyBtn = document.getElementById('claim-daily');
    if (claimDailyBtn) {
        claimDailyBtn.addEventListener('click', claimDailyBonus);
    }
    
    // Task completion buttons
    const taskButtons = document.querySelectorAll('.task-btn');
    taskButtons.forEach(button => {
        button.addEventListener('click', function() {
            const task = this.getAttribute('data-task');
            completeTask(task);
        });
    });

    function handleTaskClick(taskType, buttonElement) {
    if (!currentUser) {
        alert('Please connect your wallet first');
        return;
    }

    // Get URL from data attribute
    const taskUrl = buttonElement.getAttribute('data-url');
    
    // Open the task URL in a new tab
    window.open(taskUrl, '_blank');
    
    // Show verification prompt
    verifyTaskCompletion(taskType);
}

function verifyTaskCompletion(taskType) {
    // For demo purposes - in production you would use API verification
    const didComplete = confirm(`Did you complete the ${taskType} task?`);
    
    if (didComplete) {
        completeTask(taskType);
    } else {
        alert(`Please complete the ${taskType} task first`);
    }
}

// Existing completeTask function remains the same
function completeTask(task) {
    if (userData.completedTasks[task]) {
        alert('You already completed this task');
        return;
    }

    let reward = 0;
    switch (task) {
        case 'telegram': reward = 30; break;
        case 'twitter': reward = 50; break;
        case 'retweet': reward = 30; break;
    }

    userData.completedTasks[task] = true;
    userData.balance += reward;
    saveUserData();
    updateUI();
    
    alert(`Verified! ${reward} DUBE added to your balance.`);
}
    // Copy referral link
    const copyLinkBtn = document.getElementById('copy-link');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', copyReferralLink);
    }
}

function checkAuthState() {
    // Check if user is logged in (simulated)
    const isLoggedIn = localStorage.getItem('dubeUserLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // Simulate fetching user data
        simulateFetchUserData();
        updateAuthUI(true);
    } else {
        updateAuthUI(false);
    }
}

function simulateFetchUserData() {
    // Simulate fetching user data from backend
    const storedData = localStorage.getItem('dubeUserData');
    
    if (storedData) {
        userData = JSON.parse(storedData);
    } else {
        // Default data for new user
        userData = {
            balance: 0,
            referralCount: 0,
            referralEarnings: 0,
            completedTasks: {},
            lastDailyClaim: null
        };
        saveUserData();
    }
    
    // Update UI with user data
    updateUI();
    
    // Start daily timer if needed
    startDailyTimer();
}

function saveUserData() {
    localStorage.setItem('dubeUserData', JSON.stringify(userData));
}

function updateUI() {
    // Update balance display
    const balanceElement = document.getElementById('user-balance');
    if (balanceElement) {
        balanceElement.textContent = userData.balance;
    }
    
    // Update referral bonus display
    const referralBonusElement = document.getElementById('referral-bonus');
    if (referralBonusElement) {
        referralBonusElement.textContent = userData.referralEarnings;
    }
    
    // Update task statuses
    updateTaskStatuses();
    
    // Update referral page elements if on that page
    if (window.location.pathname.includes('refer.html')) {
        updateReferralPage();
    }
    
    // Update leaderboard if on that page
    if (window.location.pathname.includes('leaderboard.html')) {
        updateLeaderboard();
    }
}

function updateTaskStatuses() {
    const tasks = ['telegram', 'twitter', 'retweet', 'invite3', 'invite5'];
    
    tasks.forEach(task => {
        const statusElement = document.getElementById(`${task}-status`);
        if (statusElement) {
            if (userData.completedTasks[task]) {
                statusElement.textContent = 'Completed';
                statusElement.classList.add('completed');
                
                // Disable the button if task is completed
                const button = document.querySelector(`.task-btn[data-task="${task}"]`);
                if (button) {
                    button.disabled = true;
                    button.classList.add('disabled');
                }
            } else {
                statusElement.textContent = 'Not completed';
                statusElement.classList.remove('completed');
            }
        }
    });
}

function updateReferralPage() {
    // Update referral link
    const referralLinkElement = document.getElementById('referral-link');
    if (referralLinkElement && currentUser) {
        referralLinkElement.value = `${window.location.origin}/index.html?ref=${currentUser}`;
    }

 function checkForReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    
    if (ref && ref !== currentUser) {
        // In a real app, this would be sent to the backend to process the referral
        console.log(`User was referred by: ${ref}`);
        
        // For simulation, we'll just increment the referral count
        const referringUserData = JSON.parse(localStorage.getItem(`dubeUser_${ref}`) || 'null');
        
        if (referringUserData) {
            referringUserData.referralCount += 1;
            referringUserData.balance += 100; // Add 100 DUBE per referral
            referringUserData.referralEarnings += 100; // Track referral earnings
            localStorage.setItem(`dubeUser_${ref}`, JSON.stringify(referringUserData));
        }
    }
            }
    // Update referral stats
    const totalReferralsElement = document.getElementById('total-referrals');
    if (totalReferralsElement) {
        totalReferralsElement.textContent = userData.referralCount;
    }
    
    const referralEarningsElement = document.getElementById('referral-earnings');
    if (referralEarningsElement) {
        referralEarningsElement.textContent = `${userData.referralEarnings} DUBE`;
    }
    
    // Update referrals list
    updateReferralsList();
}

function updateReferralsList() {
    const referralsListElement = document.getElementById('referrals-list');
    if (!referralsListElement) return;
    
    // Clear existing list
    referralsListElement.innerHTML = '';
    
    // Simulate fetching referrals (in a real app, this would come from backend)
    const referrals = [];
    for (let i = 0; i < userData.referralCount; i++) {
        referrals.push({
            wallet: `0x${Math.random().toString(16).substr(2, 10)}...${Math.random().toString(16).substr(2, 4)}`,
            date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
            status: 'Active'
        });
    }
    
    // Add referral items to the list
    referrals.forEach((referral, index) => {
        const referralItem = document.createElement('div');
        referralItem.className = 'referral-item';
        
        referralItem.innerHTML = `
            <div>${index + 1}</div>
            <div>${referral.wallet}</div>
            <div>${referral.date}</div>
            <div>${referral.status}</div>
        `;
        
        referralsListElement.appendChild(referralItem);
    });
    
    // Show message if no referrals
    if (referrals.length === 0) {
        const noReferrals = document.createElement('div');
        noReferrals.className = 'no-referrals';
        noReferrals.textContent = 'You have no referrals yet. Share your link to earn bonuses!';
        referralsListElement.appendChild(noReferrals);
    }
}

function updateLeaderboard() {
    const leaderboardListElement = document.getElementById('leaderboard-list');
    if (!leaderboardListElement) return;
    
    // Clear existing list
    leaderboardListElement.innerHTML = '';
    
    // Simulate fetching leaderboard data (in a real app, this would come from backend)
    const leaderboardData = generateLeaderboardData();
    
    // Add leaderboard items
    leaderboardData.forEach((user, index) => {
        const leaderboardItem = document.createElement('div');
        leaderboardItem.className = 'leaderboard-item';
        
        leaderboardItem.innerHTML = `
            <div class="rank">${index + 1}</div>
            <div class="wallet">${user.wallet}</div>
            <div class="balance">${user.balance} DUBE</div>
            <div class="referrals">${user.referrals}</div>
        `;
        
        // Highlight current user if they're on the leaderboard
        if (currentUser && user.wallet === currentUser) {
            leaderboardItem.style.backgroundColor = 'rgba(74, 0, 224, 0.1)';
            leaderboardItem.style.borderLeft = '4px solid var(--primary)';
        }
        
        leaderboardListElement.appendChild(leaderboardItem);
    });
}

function generateLeaderboardData() {
    // Generate simulated leaderboard data
    const data = [];
    
    // Add current user if logged in
    if (currentUser) {
        data.push({
            wallet: currentUser,
            balance: userData.balance,
            referrals: userData.referralCount
        });
    }
    
    // Add other users
    for (let i = 0; i < 19; i++) {
        data.push({
            wallet: `0x${Math.random().toString(16).substr(2, 10)}...${Math.random().toString(16).substr(2, 4)}`,
            balance: Math.floor(Math.random() * 10000),
            referrals: Math.floor(Math.random() * 20)
        });
    }
    
    // Sort by balance (descending)
    return data.sort((a, b) => b.balance - a.balance);
}

function updateAuthUI(isLoggedIn) {
    const authBtn = document.getElementById('auth-btn');
    if (!authBtn) return;
    
    if (isLoggedIn) {
        authBtn.innerHTML = `<a href="#" class="btn">${currentUser ? shortenAddress(currentUser) : 'Connected'}</a>`;
    } else {
        authBtn.innerHTML = '<a href="#" class="btn">Connect Wallet</a>';
    }
}

function shortenAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

function handleAuth() {
    if (currentUser) {
        // Already logged in, do nothing or could add logout functionality
        return;
    }
    
    // Simulate wallet connection
    simulateWalletConnect();
}

function simulateWalletConnect() {
    // Generate a random wallet address for simulation
    currentUser = `0x${Math.random().toString(16).substr(2, 40)}`;
    
    // Set user as logged in
    localStorage.setItem('dubeUserLoggedIn', 'true');
    
    // Check for referral parameter in URL
    checkForReferral();
    
    // Fetch user data
    simulateFetchUserData();
    
    // Update UI
    updateAuthUI(true);
}

function checkForReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    
    if (ref && ref !== currentUser) {
        // In a real app, this would be sent to the backend to process the referral
        console.log(`User was referred by: ${ref}`);
        
        // For simulation, we'll just increment the referral count
        // In a real app, this would be handled by the backend
        const referringUserData = JSON.parse(localStorage.getItem(`dubeUser_${ref}`) || 'null');
        
        if (referringUserData) {
            referringUserData.referralCount += 1;
            
            
            localStorage.setItem(`dubeUser_${ref}`, JSON.stringify(referringUserData));
        }
    }
}

function claimDailyBonus() {
    if (!currentUser) {
        alert('Please connect your wallet first.');
        return;
    }
    
    const now = new Date();
    const lastClaim = userData.lastDailyClaim ? new Date(userData.lastDailyClaim) : null;
    
    // Check if 24 hours have passed since last claim
    if (lastClaim && (now - lastClaim) < 24 * 60 * 60 * 1000) {
        alert('You can only claim your daily bonus once every 24 hours.');
        return;
    }
    
    // Add bonus to balance
    userData.balance += 100;
    userData.lastDailyClaim = now.toISOString();
    saveUserData();
    
    // Update UI
    updateUI();
    
    // Restart the timer
    startDailyTimer();
    
    alert('Daily bonus claimed! 100 DUBE added to your balance.');
}

function startDailyTimer() {
    const timerElement = document.getElementById('daily-timer');
    if (!timerElement || !userData.lastDailyClaim) return;
    
    const lastClaim = new Date(userData.lastDailyClaim);
    const nextClaim = new Date(lastClaim.getTime() + 24 * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date();
        const diff = nextClaim - now;
        
        if (diff <= 0) {
            timerElement.textContent = 'Bonus available to claim!';
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        timerElement.textContent = `Next claim in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    
    // Store interval ID so we can clear it later if needed
    timerElement.dataset.intervalId = timerInterval;
}

function completeTask(task) {
    if (!currentUser) {
        alert('Please connect your wallet first.');
        return;
    }
    
    if (userData.completedTasks[task]) {
        alert('You have already completed this task.');
        return;
    }
    
    // Determine reward based on task
    let reward = 0;
    switch (task) {
        case 'telegram':
            reward = 30;
            break;
        case 'twitter':
            reward = 50;
            break;
        case 'retweet':
            reward = 30;
            break;
    
    // Mark task as completed and add reward
    userData.completedTasks[task] = true;
    userData.balance += reward;
    

function copyReferralLink() {
    if (!currentUser) {
        alert('Please connect your wallet first.');
        return;
    }
    
    const referralLinkElement = document.getElementById('referral-link');
    if (!referralLinkElement) return;
    
    referralLinkElement.select();
    referralLinkElement.setSelectionRange(0, 99999);
    
    try {
        document.execCommand('copy');
        alert('Referral link copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy referral link. Please try again.');
    }
