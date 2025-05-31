// Sample leaderboard data (updated with referral earnings)
const leaderboardData = [
    { rank: 1, name: "Alice", points: 2500, photo: "images/user1.png" },
    { rank: 2, name: "Bob", points: 1800, photo: "images/user2.png" },
    { rank: 3, name: "Charlie", points: 1500, photo: "images/user3.png" },
    { rank: 4, name: "Diana", points: 1200, photo: "images/user4.png" },
    { rank: 5, name: "Eve", points: 1000, photo: "images/user5.png" },
    { rank: 6, name: "Frank", points: 900, photo: "images/user6.png" },
    { rank: 7, name: "Grace", points: 800, photo: "images/user7.png" },
    { rank: 8, name: "You", points: 750, photo: "images/default-user.png" },
    { rank: 9, name: "Ivy", points: 600, photo: "images/user8.png" },
    { rank: 10, name: "Jack", points: 500, photo: "images/user9.png" }
];

// DOM Elements
const leaderboardList = document.getElementById('leaderboard');

// Populate leaderboard (now shows total points including referrals)
function populateLeaderboard() {
    leaderboardList.innerHTML = '';
    
    leaderboardData.forEach(user => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        
        item.innerHTML = `
            <span>${user.rank}</span>
            <span style="display: flex; align-items: center;">
                <img src="${user.photo}" alt="${user.name}" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
                ${user.name}
            </span>
            <span>${user.points} DUBE</span>
        `;
        
        if (user.name === "You") {
            item.style.backgroundColor = "#f0f5ff";
            item.style.fontWeight = "bold";
            
            // Update "You" with actual user data
            const savedData = localStorage.getItem('dubeUserData');
            if (savedData) {
                const userData = JSON.parse(savedData);
                const totalPoints = userData.balance + userData.referralEarnings;
                item.querySelector('span:last-child').textContent = `${totalPoints} DUBE`;
            }
        }
        
        leaderboardList.appendChild(item);
    });
}

// Initialize the leaderboard
document.addEventListener('DOMContentLoaded', populateLeaderboard);