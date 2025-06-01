// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// DOM Elements
const userPhoto = document.getElementById('user-photo');
const userName = document.getElementById('user-name');
const userBalance = document.getElementById('user-balance');
const mainBalance = document.getElementById('main-balance');
const taskButtons = document.querySelectorAll('.task-button');
const dailyBonusBtn = document.getElementById('daily-bonus-btn');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');

// User data
let userData = {
    balance: 0,
    lastDailyClaim: null,
    completedTasks: {
        telegram: false,
        twitter: false,
        retweet: false
    }
};

// Initialize the app
function initApp() {
    // Load user data from localStorage
    const savedData = localStorage.getItem('dubeUserData');
    if (savedData) {
        userData = JSON.parse(savedData);
    }

    // Set Telegram user info if available
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const tgUser = tg.initDataUnsafe.user;
        userName.textContent = `${tgUser.first_name || ''} ${tgUser.last_name || ''}`.trim() || tgUser.username || 'Telegram User';
        
        if (tgUser.photo_url) {
            userPhoto.src = tgUser.photo_url;
        }
    } else {
        userName.textContent = 'Guest User';
    }

    // Update balance display
    updateBalance();

    // Check task statuses
    checkTaskStatuses();
}

// Update balance display
function updateBalance() {
    userBalance.textContent = userData.balance;
    mainBalance.textContent = `${userData.balance} DUBE`;
    saveUserData();
}

// Check all task statuses
function checkTaskStatuses() {
    const now = new Date();
    
    // Check daily bonus
    const lastDailyClaim = userData.lastDailyClaim ? new Date(userData.lastDailyClaim) : null;
    
    if (lastDailyClaim) {
        const nextClaimTime = new Date(lastDailyClaim.getTime() + 24 * 60 * 60 * 1000);
        
        if (now < nextClaimTime) {
            dailyBonusBtn.disabled = true;
            dailyBonusBtn.textContent = 'Claimed';
            dailyBonusBtn.classList.add('claimed');
        }
    }
    
    // Check other tasks
    taskButtons.forEach(button => {
        const taskType = button.getAttribute('data-task');
        
        if (taskType !== 'daily' && userData.completedTasks[taskType]) {
            button.disabled = true;
            button.textContent = 'Claimed';
            button.classList.add('claimed');
        }
    });
}

// Complete task
function completeTask(taskType, points) {
    // Check if task can be completed
    if (taskType === 'daily') {
        const lastDailyClaim = userData.lastDailyClaim ? new Date(userData.lastDailyClaim) : null;
        if (lastDailyClaim) {
            const nextClaimTime = new Date(lastDailyClaim.getTime() + 24 * 60 * 60 * 1000);
            if (new Date() < nextClaimTime) {
                showNotification("You've already claimed your daily bonus");
                return;
            }
        }
        userData.lastDailyClaim = new Date().toISOString();
    } else {
        if (userData.completedTasks[taskType]) {
            showNotification("You've already completed this task");
            return;
        }
        userData.completedTasks[taskType] = true;
    }
    
    // Update balance
    userData.balance += points;
    updateBalance();
    
    // Update button state
    const button = document.querySelector(`[data-task="${taskType}"]`);
    if (button) {
        button.disabled = true;
        button.textContent = 'Claimed';
        button.classList.add('claimed');
    }
    
    // Show success notification
    showNotification(`+${points} DUBE rewarded!`);
    
    // For external tasks, open the link
    if (taskType === 'telegram') {
        window.open('https://t.me/dubesolana', '_blank');
    } else if (taskType === 'twitter') {
        window.open('https://x.com/dubesola?s=09', '_blank');
    } else if (taskType === 'retweet') {
        window.open('https://x.com/dubesola/status/1928779820483190833?s=19', '_blank');
    }
}

// Show notification
function showNotification(message) {
    notificationMessage.textContent = message;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('dubeUserData', JSON.stringify(userData));
}

// Event listeners
taskButtons.forEach(button => {
    button.addEventListener('click', () => {
        const taskType = button.getAttribute('data-task');
        const points = parseInt(button.getAttribute('data-points'));
        completeTask(taskType, points);
    });
});

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
