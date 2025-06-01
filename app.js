:root {
    --primary: #6c5ce7;
    --primary-dark: #5649c0;
    --secondary: #00cec9;
    --text: #2d3436;
    --text-light: #636e72;
    --bg: #f5f6fa;
    --card-bg: #ffffff;
    --success: #00b894;
    --warning: #fdcb6e;
    --error: #d63031;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --radius: 12px;
    --radius-sm: 8px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: var(--bg);
    color: var(--text);
    line-height: 1.6;
}

.app-container {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--bg);
}

.app-header {
    background-color: var(--primary);
    color: white;
    padding: 1rem;
    box-shadow: var(--shadow);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.logo i {
    font-size: 1.8rem;
}

.logo h1 {
    font-size: 1.5rem;
    font-weight: 700;
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid white;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-info {
    display: flex;
    flex-direction: column;
}

.user-info span {
    font-size: 0.9rem;
    font-weight: 500;
}

.balance {
    font-size: 0.8rem;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.2rem 0.5rem;
    border-radius: 1rem;
    margin-top: 0.2rem;
}

.app-main {
    flex: 1;
    padding: 1.5rem 1rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.section-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
}

.balance-summary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--primary);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    font-size: 0.9rem;
}

.balance-summary strong {
    font-weight: 700;
}

.tasks-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

.task-card {
    background-color: var(--card-bg);
    border-radius: var(--radius);
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: var(--shadow);
    transition: transform 0.2s;
}

.task-card:hover {
    transform: translateY(-2px);
}

.task-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
}

.task-icon.daily {
    background-color: var(--success);
}
.task-icon.telegram {
    background-color: #0088cc;
}
.task-icon.twitter {
    background-color: #1da1f2;
}
.task-icon.retweet {
    background-color: var(--warning);
    color: var(--text);
}

.task-info {
    flex: 1;
}

.task-info h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.task-info p {
    font-size: 0.85rem;
    color: var(--text-light);
    margin-bottom: 0.5rem;
}

.task-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.85rem;
}

.reward {
    color: var(--success);
    font-weight: 600;
}

.timer {
    color: var(--text-light);
    font-size: 0.8rem;
}

.task-button {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 80px;
}

.task-button:hover {
    background-color: var(--primary-dark);
}

.task-button:disabled {
    background-color: #dfe6e9;
    color: var(--text-light);
    cursor: not-allowed;
}

.task-button.claimed {
    background-color: #dfe6e9;
    color: var(--text-light);
}

.app-footer {
    background-color: white;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
    padding: 0.75rem 0;
}

.footer-nav {
    display: flex;
    justify-content: space-around;
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: var(--text-light);
    font-size: 0.8rem;
    gap: 0.25rem;
}

.nav-item i {
    font-size: 1.25rem;
}

.nav-item.active {
    color: var(--primary);
}

.notification {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--primary);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    z-index: 1000;
    transition: all 0.3s ease;
}

.notification.hidden {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%) translateY(20px);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

@media (max-width: 400px) {
    .task-card {
        flex-direction: column;
        text-align: center;
    }
    
    .task-info {
        width: 100%;
    }
    
    .task-meta {
        justify-content: center;
    }
    
    .task-button {
        width: 100%;
    }
