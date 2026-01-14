// ===== ADMIN PANEL JAVASCRIPT WITH BACKEND INTEGRATION =====

// API Configuration
const API_BASE_URL = 'http://localhost:3001/api';
let authToken = localStorage.getItem('adminToken');

// Admin credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'yakudza2024'
};

// API Helper functions
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };
    
    // Add auth token if available
    if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'API xatoligi');
        }
        
        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    initializeAdminPanel();
    setupEventListeners();
    checkAuthStatus();
});

// Initialize admin panel
function initializeAdminPanel() {
    // Setup login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Setup password toggle
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', togglePasswordVisibility);
    }

    // Setup navigation
    setupNavigation();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup content tabs
    setupContentTabs();
}

// Setup event listeners
function setupEventListeners() {
    // Quick actions
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', handleQuickAction);
    });

    // Sidebar navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Content tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabSwitch);
    });

    // Form submissions
    setupFormHandlers();
}

// Check authentication status
function checkAuthStatus() {
    if (authToken) {
        // Verify token with backend
        verifyToken();
    } else {
        showLoginModal();
    }
}

// Verify token with backend
async function verifyToken() {
    try {
        const response = await apiRequest('/auth/verify');
        if (response.success) {
            showDashboard();
            loadDashboardData();
        } else {
            throw new Error('Token verification failed');
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('adminToken');
        authToken = null;
        showLoginModal();
    }
}

// Handle login with backend
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Show loading state
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tekshirilmoqda...';
    loginBtn.disabled = true;
    
    try {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        
        if (response.success) {
            // Store token
            authToken = response.token;
            localStorage.setItem('adminToken', authToken);
            
            if (rememberMe) {
                localStorage.setItem('rememberAdmin', 'true');
            }
            
            showNotification('Muvaffaqiyatli kirildi!', 'success');
            showDashboard();
            loadDashboardData();
        }
    } catch (error) {
        showNotification(error.message || 'Login xatoligi!', 'error');
        
        // Add shake animation
        const loginContainer = document.querySelector('.login-container');
        loginContainer.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            loginContainer.style.animation = '';
        }, 500);
    } finally {
        // Reset button
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
    }
}

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

// Show login modal
function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    const dashboard = document.getElementById('adminDashboard');
    
    loginModal.classList.add('active');
    dashboard.classList.remove('active');
}

// Show dashboard
function showDashboard() {
    const loginModal = document.getElementById('loginModal');
    const dashboard = document.getElementById('adminDashboard');
    
    loginModal.classList.remove('active');
    dashboard.classList.add('active');
    
    // Load dashboard data
    loadDashboardData();
}

// Logout function
function logout() {
    if (confirm('Haqiqatan ham chiqmoqchimisiz?')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('rememberAdmin');
        authToken = null;
        showNotification('Muvaffaqiyatli chiqildi!', 'info');
        showLoginModal();
    }
}

// Setup navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            link.parentElement.classList.add('active');
            
            // Show corresponding section
            const sectionId = link.dataset.section + '-section';
            showSection(sectionId);
            
            // Update page title
            const pageTitle = document.querySelector('.page-title');
            pageTitle.textContent = link.querySelector('span').textContent;
        });
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Load section-specific data
        loadSectionData(sectionId);
    }
}

// Setup content tabs
function setupContentTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
}

// Handle tab switch
function handleTabSwitch(e) {
    const tabId = e.target.dataset.tab;
    
    // Remove active from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Remove active from all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active to clicked tab
    e.target.classList.add('active');
    
    // Add active to corresponding content
    const tabContent = document.getElementById(tabId + '-tab');
    if (tabContent) {
        tabContent.classList.add('active');
    }
}

// Handle navigation
function handleNavigation(e) {
    e.preventDefault();
    
    const section = e.target.closest('.nav-link').dataset.section;
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    e.target.closest('.nav-item').classList.add('active');
    
    // Show section
    showSection(section + '-section');
    
    // Update page title
    const pageTitle = document.querySelector('.page-title');
    const sectionName = e.target.closest('.nav-link').querySelector('span').textContent;
    pageTitle.textContent = sectionName;
    
    // Close mobile menu
    if (window.innerWidth <= 1024) {
        document.querySelector('.sidebar').classList.remove('active');
    }
}

// Handle quick actions
function handleQuickAction(e) {
    const action = e.target.closest('.quick-action-btn').dataset.action;
    
    switch (action) {
        case 'add-post':
            showNotification('Yangi post qo\'shish oynasi ochilmoqda...', 'info');
            break;
        case 'update-stats':
            updateStats();
            break;
        case 'add-achievement':
            showNotification('Yangi yutuq qo\'shish oynasi ochilmoqda...', 'info');
            break;
        case 'upload-media':
            showNotification('Media yuklash oynasi ochilmoqda...', 'info');
            break;
    }
}

// Load dashboard data
function loadDashboardData() {
    // Simulate loading dashboard stats
    setTimeout(() => {
        animateCounters();
        loadRecentActivity();
    }, 500);
}

// Load section data
function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'achievements-section':
            loadAchievements();
            break;
        case 'gallery-section':
            loadGallery();
            break;
        case 'messages-section':
            loadMessages();
            break;
        case 'analytics-section':
            loadAnalytics();
            break;
    }
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-info h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                counter.textContent = formatNumber(Math.floor(current));
            }
        }, 20);
    });
}

// Format number
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Load recent activity
function loadRecentActivity() {
    const activities = [
        {
            icon: 'fas fa-trophy',
            text: 'Yangi yutuq qo\'shildi: "World Championship 2024"',
            time: '2 soat oldin'
        },
        {
            icon: 'fas fa-chart-bar',
            text: 'Statistika yangilandi: Kill count 2.5M+',
            time: '5 soat oldin'
        },
        {
            icon: 'fas fa-image',
            text: 'Galereyaga 3 ta yangi rasm qo\'shildi',
            time: '1 kun oldin'
        },
        {
            icon: 'fas fa-envelope',
            text: '15 ta yangi xabar keldi',
            time: '2 kun oldin'
        }
    ];
    
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
}

// Setup form handlers
function setupFormHandlers() {
    // Hero content form
    const heroForm = document.getElementById('heroForm');
    if (heroForm) {
        heroForm.addEventListener('submit', saveHeroContent);
    }
}

// Save hero content
function saveHeroContent() {
    const title = document.getElementById('heroTitle').value;
    const subtitle = document.getElementById('heroSubtitle').value;
    const description = document.getElementById('heroDescription').value;
    
    // Simulate saving
    showNotification('Hero content saqlandi!', 'success');
    
    // Update main site (if in same domain)
    try {
        if (window.opener) {
            window.opener.updateHeroContent(title, subtitle, description);
        }
    } catch (e) {
        console.log('Cannot update main site:', e);
    }
}

// Save about content
function saveAboutContent() {
    const name = document.getElementById('aboutName').value;
    const nickname = document.getElementById('aboutNickname').value;
    const bio = document.getElementById('aboutBio').value;
    
    showNotification('Haqimda bo\'limi saqlandi!', 'success');
}

// Save social links
function saveSocialLinks() {
    const socialInputs = document.querySelectorAll('.social-link-item input');
    const links = Array.from(socialInputs).map(input => input.value).filter(url => url);
    
    showNotification(`${links.length} ta ijtimoiy tarmoq havolasi saqlandi!`, 'success');
}

// Add social link
function addSocialLink() {
    const container = document.querySelector('.social-links-editor');
    const newLink = document.createElement('div');
    newLink.className = 'social-link-item';
    newLink.innerHTML = `
        <i class="fas fa-link"></i>
        <input type="url" placeholder="URL manzil" class="form-control">
        <button class="btn-remove" onclick="this.parentElement.remove()">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(newLink);
}

// Update stat
function updateStat(statType) {
    let value, message;
    
    switch (statType) {
        case 'kills':
            value = document.getElementById('totalKills').value;
            message = `Jami kills ${formatNumber(value)} ga yangilandi!`;
            break;
        case 'dinners':
            value = document.getElementById('chickenDinners').value;
            message = `Chicken Dinners ${formatNumber(value)} ga yangilandi!`;
            break;
        case 'winrate':
            value = document.getElementById('winRate').value;
            message = `Win Rate ${value}% ga yangilandi!`;
            break;
        case 'kd':
            value = document.getElementById('kdRatio').value;
            message = `K/D Ratio ${value} ga yangilandi!`;
            break;
    }
    
    showNotification(message, 'success');
    
    // Update main site stats
    updateMainSiteStats(statType, value);
}

// Save advanced stats
function saveAdvancedStats() {
    const stats = {
        totalGames: document.getElementById('totalGames').value,
        top10Rate: document.getElementById('top10Rate').value,
        longestKill: document.getElementById('longestKill').value,
        headshotRate: document.getElementById('headshotRate').value
    };
    
    showNotification('Batafsil statistika saqlandi!', 'success');
}

// Refresh stats
function refreshStats() {
    showNotification('Statistika yangilanmoqda...', 'info');
    
    // Simulate refresh
    setTimeout(() => {
        showNotification('Statistika muvaffaqiyatli yangilandi!', 'success');
        animateCounters();
    }, 2000);
}

// Update main site stats
function updateMainSiteStats(statType, value) {
    // This would update the main site if they're on the same domain
    try {
        const mainWindow = window.opener || window.parent;
        if (mainWindow && mainWindow.updateStats) {
            mainWindow.updateStats(statType, value);
        }
    } catch (e) {
        console.log('Cannot update main site stats:', e);
    }
}

// Load achievements
function loadAchievements() {
    const achievementsList = document.querySelector('.achievements-list');
    if (achievementsList) {
        achievementsList.innerHTML = '<div class="loading">Yutuqlar yuklanmoqda...</div>';
        
        setTimeout(() => {
            const achievements = [
                {
                    title: 'PUBG Mobile World Championship',
                    year: '2023',
                    description: 'Jahon chempionati 1-o\'rin',
                    icon: 'fas fa-trophy'
                },
                {
                    title: 'Asia Pacific Championship',
                    year: '2023',
                    description: 'Osiyo-Tinch okeani chempioni',
                    icon: 'fas fa-medal'
                }
            ];
            
            achievementsList.innerHTML = achievements.map(achievement => `
                <div class="achievement-item">
                    <div class="achievement-icon">
                        <i class="${achievement.icon}"></i>
                    </div>
                    <div class="achievement-details">
                        <h4>${achievement.title}</h4>
                        <p>${achievement.description}</p>
                        <span>${achievement.year}</span>
                    </div>
                    <div class="achievement-actions">
                        <button class="btn btn-sm btn-primary">Tahrirlash</button>
                        <button class="btn btn-sm btn-warning">O'chirish</button>
                    </div>
                </div>
            `).join('');
        }, 1000);
    }
}

// Load gallery
function loadGallery() {
    const galleryManager = document.querySelector('.gallery-manager');
    if (galleryManager) {
        galleryManager.innerHTML = '<div class="loading">Galereya yuklanmoqda...</div>';
        
        setTimeout(() => {
            galleryManager.innerHTML = `
                <div class="gallery-grid">
                    <div class="gallery-item">
                        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=150&fit=crop" alt="Image 1">
                        <div class="gallery-actions">
                            <button class="btn btn-sm btn-primary">Tahrirlash</button>
                            <button class="btn btn-sm btn-warning">O'chirish</button>
                        </div>
                    </div>
                    <!-- More gallery items -->
                </div>
            `;
        }, 1000);
    }
}

// Load messages
function loadMessages() {
    const messagesList = document.querySelector('.messages-list');
    if (messagesList) {
        messagesList.innerHTML = '<div class="loading">Xabarlar yuklanmoqda...</div>';
        
        setTimeout(() => {
            const messages = [
                {
                    name: 'Aziz Karimov',
                    email: 'aziz@example.com',
                    subject: 'Hamkorlik taklifi',
                    message: 'Salom, sizga hamkorlik taklif qilmoqchiman...',
                    time: '2 soat oldin',
                    unread: true
                },
                {
                    name: 'Bobur Toshev',
                    email: 'bobur@example.com',
                    subject: 'Turnir haqida',
                    message: 'Kelgusi turnir haqida ma\'lumot olsam...',
                    time: '5 soat oldin',
                    unread: false
                }
            ];
            
            messagesList.innerHTML = messages.map(msg => `
                <div class="message-item ${msg.unread ? 'unread' : ''}">
                    <div class="message-header">
                        <h4>${msg.name}</h4>
                        <span class="message-time">${msg.time}</span>
                    </div>
                    <p class="message-subject">${msg.subject}</p>
                    <p class="message-preview">${msg.message}</p>
                    <div class="message-actions">
                        <button class="btn btn-sm btn-primary">Javob berish</button>
                        <button class="btn btn-sm btn-warning">O'chirish</button>
                    </div>
                </div>
            `).join('');
        }, 1000);
    }
}

// Load analytics
function loadAnalytics() {
    const analyticsDashboard = document.querySelector('.analytics-dashboard');
    if (analyticsDashboard) {
        analyticsDashboard.innerHTML = '<div class="loading">Analytics yuklanmoqda...</div>';
        
        setTimeout(() => {
            analyticsDashboard.innerHTML = `
                <div class="analytics-grid">
                    <div class="analytics-card">
                        <h3>Kunlik Ko'rishlar</h3>
                        <div class="chart-placeholder">
                            <p>Chart will be here</p>
                        </div>
                    </div>
                    <div class="analytics-card">
                        <h3>Foydalanuvchi Faolligi</h3>
                        <div class="chart-placeholder">
                            <p>Chart will be here</p>
                        </div>
                    </div>
                </div>
            `;
        }, 1000);
    }
}

// Add new achievement
function addNewAchievement() {
    showNotification('Yangi yutuq qo\'shish oynasi ochilmoqda...', 'info');
}

// Upload media
function uploadMedia() {
    showNotification('Media yuklash oynasi ochilmoqda...', 'info');
}

// Mark all messages as read
function markAllRead() {
    showNotification('Barcha xabarlar o\'qilgan deb belgilandi!', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
}

// Get notification icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Hide notification
function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Add shake animation CSS
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    border: 1px solid rgba(255, 107, 53, 0.3);
    border-radius: 10px;
    padding: 15px 20px;
    max-width: 400px;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 15px;
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    border-color: #4CAF50;
}

.notification.error {
    border-color: #f44336;
}

.notification.warning {
    border-color: #ff9800;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
}

.notification.success .notification-content i {
    color: #4CAF50;
}

.notification.error .notification-content i {
    color: #f44336;
}

.notification.warning .notification-content i {
    color: #ff9800;
}

.notification.info .notification-content i {
    color: #ff6b35;
}

.notification-content span {
    color: #ffffff;
    font-size: 0.9rem;
}

.notification-close {
    background: none;
    border: none;
    color: #cccccc;
    cursor: pointer;
    font-size: 1rem;
    padding: 5px;
    transition: color 0.3s ease;
}

.notification-close:hover {
    color: #ff6b35;
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
`;

// Add CSS to head
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// ===== BACKEND INTEGRATION FUNCTIONS =====

// Load dashboard data from backend
async function loadDashboardData() {
    try {
        showLoadingState('dashboard');
        const response = await apiRequest('/dashboard');
        
        if (response.success) {
            const data = response.data;
            updateDashboardStats(data);
            loadRecentActivity();
            animateCounters();
        }
    } catch (error) {
        console.error('Dashboard data loading failed:', error);
        showNotification('Dashboard ma\'lumotlari yuklanmadi', 'error');
    } finally {
        hideLoadingState('dashboard');
    }
}

// Update dashboard stats
function updateDashboardStats(data) {
    const stats = data.analytics;
    const summary = data.summary;
    
    // Update stat cards
    const statElements = {
        dailyViews: document.querySelector('.stat-card:nth-child(1) h3'),
        activeUsers: document.querySelector('.stat-card:nth-child(2) h3'),
        newMessages: document.querySelector('.stat-card:nth-child(3) h3'),
        winRate: document.querySelector('.stat-card:nth-child(4) h3')
    };
    
    if (statElements.dailyViews) statElements.dailyViews.textContent = formatNumber(stats.dailyViews || 15847);
    if (statElements.activeUsers) statElements.activeUsers.textContent = formatNumber(stats.activeUsers || 2847);
    if (statElements.newMessages) statElements.newMessages.textContent = summary.unreadMessages || 127;
    if (statElements.winRate) statElements.winRate.textContent = (stats.winRate || 89) + '%';
    
    // Update message badge
    const messageBadge = document.querySelector('.nav-item a[data-section="messages"] .badge');
    if (messageBadge) {
        const unreadCount = summary.unreadMessages || 0;
        if (unreadCount > 0) {
            messageBadge.textContent = unreadCount;
            messageBadge.style.display = 'inline-block';
        } else {
            messageBadge.style.display = 'none';
        }
    }
}

// Save hero content to backend
async function saveHeroContent() {
    try {
        const heroData = {
            hero: {
                title: document.getElementById('heroTitle').value,
                subtitle: document.getElementById('heroSubtitle').value,
                description: document.getElementById('heroDescription').value
            }
        };
        
        showLoadingButton('.btn[onclick="saveHeroContent()"]', 'Saqlanmoqda...');
        
        const response = await apiRequest('/content', {
            method: 'PUT',
            body: JSON.stringify(heroData)
        });
        
        if (response.success) {
            showNotification('Hero content muvaffaqiyatli saqlandi!', 'success');
        }
    } catch (error) {
        showNotification('Hero content saqlanmadi: ' + error.message, 'error');
    } finally {
        hideLoadingButton('.btn[onclick="saveHeroContent()"]', '<i class="fas fa-save"></i> Saqlash');
    }
}

// Save about content to backend
async function saveAboutContent() {
    try {
        const aboutData = {
            about: {
                name: document.getElementById('aboutName').value,
                nickname: document.getElementById('aboutNickname').value,
                bio: document.getElementById('aboutBio').value
            }
        };
        
        showLoadingButton('.btn[onclick="saveAboutContent()"]', 'Saqlanmoqda...');
        
        const response = await apiRequest('/content', {
            method: 'PUT',
            body: JSON.stringify(aboutData)
        });
        
        if (response.success) {
            showNotification('Haqimda bo\'limi muvaffaqiyatli saqlandi!', 'success');
        }
    } catch (error) {
        showNotification('Haqimda bo\'limi saqlanmadi: ' + error.message, 'error');
    } finally {
        hideLoadingButton('.btn[onclick="saveAboutContent()"]', '<i class="fas fa-save"></i> Saqlash');
    }
}

// Update statistics to backend
async function updateStat(statType) {
    try {
        let value, field;
        
        switch (statType) {
            case 'kills':
                value = parseInt(document.getElementById('totalKills').value);
                field = 'totalKills';
                break;
            case 'dinners':
                value = parseInt(document.getElementById('chickenDinners').value);
                field = 'chickenDinners';
                break;
            case 'winrate':
                value = parseInt(document.getElementById('winRate').value);
                field = 'winRate';
                break;
            case 'kd':
                value = parseFloat(document.getElementById('kdRatio').value);
                field = 'kdRatio';
                break;
        }
        
        const updateData = { [field]: value };
        
        const response = await apiRequest('/stats', {
            method: 'PUT',
            body: JSON.stringify(updateData)
        });
        
        if (response.success) {
            showNotification(`${field} muvaffaqiyatli yangilandi!`, 'success');
            
            // Update main site if possible
            if (window.opener && window.opener.updateStats) {
                window.opener.updateStats(statType, value);
            }
        }
    } catch (error) {
        showNotification('Statistika yangilanmadi: ' + error.message, 'error');
    }
}

// Save advanced stats to backend
async function saveAdvancedStats() {
    try {
        const statsData = {
            totalGames: parseInt(document.getElementById('totalGames').value),
            top10Rate: parseInt(document.getElementById('top10Rate').value),
            longestKill: parseInt(document.getElementById('longestKill').value),
            headshotRate: parseInt(document.getElementById('headshotRate').value)
        };
        
        showLoadingButton('.btn[onclick="saveAdvancedStats()"]', 'Saqlanmoqda...');
        
        const response = await apiRequest('/stats', {
            method: 'PUT',
            body: JSON.stringify(statsData)
        });
        
        if (response.success) {
            showNotification('Batafsil statistika muvaffaqiyatli saqlandi!', 'success');
        }
    } catch (error) {
        showNotification('Batafsil statistika saqlanmadi: ' + error.message, 'error');
    } finally {
        hideLoadingButton('.btn[onclick="saveAdvancedStats()"]', '<i class="fas fa-save"></i> Barchasini Saqlash');
    }
}

// Load achievements from backend
async function loadAchievements() {
    try {
        showLoadingState('achievements');
        const response = await apiRequest('/achievements');
        
        if (response.success) {
            displayAchievements(response.data);
        }
    } catch (error) {
        showNotification('Yutuqlar yuklanmadi: ' + error.message, 'error');
    } finally {
        hideLoadingState('achievements');
    }
}

// Display achievements
function displayAchievements(achievements) {
    const achievementsList = document.querySelector('.achievements-list');
    if (!achievementsList) return;
    
    if (achievements.length === 0) {
        achievementsList.innerHTML = '<p class="text-center">Hozircha yutuqlar yo\'q</p>';
        return;
    }
    
    achievementsList.innerHTML = achievements.map(achievement => `
        <div class="achievement-item" data-id="${achievement.id}">
            <div class="achievement-icon">
                <i class="${achievement.icon}"></i>
            </div>
            <div class="achievement-details">
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
                <div class="achievement-meta">
                    <span class="achievement-year">${achievement.year}</span>
                    <span class="achievement-category">${achievement.category}</span>
                    ${achievement.prize ? `<span class="achievement-prize">${achievement.prize}</span>` : ''}
                </div>
            </div>
            <div class="achievement-actions">
                <button class="btn btn-sm btn-primary" onclick="editAchievement(${achievement.id})">
                    <i class="fas fa-edit"></i> Tahrirlash
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteAchievement(${achievement.id})">
                    <i class="fas fa-trash"></i> O'chirish
                </button>
            </div>
        </div>
    `).join('');
}

// Add new achievement
async function addNewAchievement() {
    const modal = createAchievementModal();
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

// Create achievement modal
function createAchievementModal(achievement = null) {
    const isEdit = achievement !== null;
    const modal = document.createElement('div');
    modal.className = 'achievement-modal';
    modal.innerHTML = `
        <div class="achievement-modal-overlay"></div>
        <div class="achievement-modal-content">
            <div class="achievement-modal-header">
                <h3>${isEdit ? 'Yutuqni Tahrirlash' : 'Yangi Yutuq Qo\'shish'}</h3>
                <button class="achievement-modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="achievement-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Sarlavha</label>
                        <input type="text" name="title" value="${achievement?.title || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Yil</label>
                        <input type="text" name="year" value="${achievement?.year || new Date().getFullYear()}" required>
                    </div>
                    <div class="form-group">
                        <label>Kategoriya</label>
                        <select name="category" required>
                            <option value="tournament" ${achievement?.category === 'tournament' ? 'selected' : ''}>Tournament</option>
                            <option value="national" ${achievement?.category === 'national' ? 'selected' : ''}>Milliy</option>
                            <option value="international" ${achievement?.category === 'international' ? 'selected' : ''}>Xalqaro</option>
                            <option value="personal" ${achievement?.category === 'personal' ? 'selected' : ''}>Shaxsiy</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Icon</label>
                        <select name="icon" required>
                            <option value="fas fa-trophy" ${achievement?.icon === 'fas fa-trophy' ? 'selected' : ''}>🏆 Trophy</option>
                            <option value="fas fa-medal" ${achievement?.icon === 'fas fa-medal' ? 'selected' : ''}>🥇 Medal</option>
                            <option value="fas fa-crown" ${achievement?.icon === 'fas fa-crown' ? 'selected' : ''}>👑 Crown</option>
                            <option value="fas fa-star" ${achievement?.icon === 'fas fa-star' ? 'selected' : ''}>⭐ Star</option>
                            <option value="fas fa-award" ${achievement?.icon === 'fas fa-award' ? 'selected' : ''}>🏅 Award</option>
                        </select>
                    </div>
                    <div class="form-group full-width">
                        <label>Tavsif</label>
                        <textarea name="description" rows="3" required>${achievement?.description || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Mukofot (ixtiyoriy)</label>
                        <input type="text" name="prize" value="${achievement?.prize || ''}" placeholder="$10,000">
                    </div>
                    <div class="form-group">
                        <label>Sana</label>
                        <input type="date" name="date" value="${achievement?.date || new Date().toISOString().split('T')[0]}" required>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i>
                        ${isEdit ? 'Yangilash' : 'Qo\'shish'}
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="closeAchievementModal()">
                        <i class="fas fa-times"></i>
                        Bekor qilish
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Setup form submission
    const form = modal.querySelector('.achievement-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const achievementData = Object.fromEntries(formData.entries());
        
        try {
            const endpoint = isEdit ? `/achievements/${achievement.id}` : '/achievements';
            const method = isEdit ? 'PUT' : 'POST';
            
            const response = await apiRequest(endpoint, {
                method: method,
                body: JSON.stringify(achievementData)
            });
            
            if (response.success) {
                showNotification(`Yutuq muvaffaqiyatli ${isEdit ? 'yangilandi' : 'qo\'shildi'}!`, 'success');
                closeAchievementModal();
                loadAchievements(); // Reload achievements
            }
        } catch (error) {
            showNotification(`Yutuq ${isEdit ? 'yangilanmadi' : 'qo\'shilmadi'}: ` + error.message, 'error');
        }
    });
    
    // Setup close functionality
    modal.querySelector('.achievement-modal-close').addEventListener('click', closeAchievementModal);
    modal.querySelector('.achievement-modal-overlay').addEventListener('click', closeAchievementModal);
    
    return modal;
}

// Close achievement modal
function closeAchievementModal() {
    const modal = document.querySelector('.achievement-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Edit achievement
async function editAchievement(id) {
    try {
        const response = await apiRequest('/achievements');
        if (response.success) {
            const achievement = response.data.find(a => a.id === id);
            if (achievement) {
                const modal = createAchievementModal(achievement);
                document.body.appendChild(modal);
                
                setTimeout(() => {
                    modal.classList.add('show');
                }, 100);
            }
        }
    } catch (error) {
        showNotification('Yutuq ma\'lumotlari yuklanmadi: ' + error.message, 'error');
    }
}

// Delete achievement
async function deleteAchievement(id) {
    if (!confirm('Haqiqatan ham bu yutuqni o\'chirmoqchimisiz?')) {
        return;
    }
    
    try {
        const response = await apiRequest(`/achievements/${id}`, {
            method: 'DELETE'
        });
        
        if (response.success) {
            showNotification('Yutuq muvaffaqiyatli o\'chirildi!', 'success');
            loadAchievements(); // Reload achievements
        }
    } catch (error) {
        showNotification('Yutuq o\'chirilmadi: ' + error.message, 'error');
    }
}

// Load messages from backend
async function loadMessages() {
    try {
        showLoadingState('messages');
        const response = await apiRequest('/messages');
        
        if (response.success) {
            displayMessages(response.data);
        }
    } catch (error) {
        showNotification('Xabarlar yuklanmadi: ' + error.message, 'error');
    } finally {
        hideLoadingState('messages');
    }
}

// Display messages
function displayMessages(messages) {
    const messagesList = document.querySelector('.messages-list');
    if (!messagesList) return;
    
    if (messages.length === 0) {
        messagesList.innerHTML = '<p class="text-center">Hozircha xabarlar yo\'q</p>';
        return;
    }
    
    messagesList.innerHTML = messages.map(msg => `
        <div class="message-item ${msg.unread ? 'unread' : ''}" data-id="${msg.id}">
            <div class="message-header">
                <div class="message-sender">
                    <h4>${msg.name}</h4>
                    <span class="message-email">${msg.email}</span>
                </div>
                <div class="message-meta">
                    <span class="message-time">${formatDate(msg.createdAt)}</span>
                    ${msg.unread ? '<span class="unread-badge">Yangi</span>' : ''}
                </div>
            </div>
            <div class="message-content">
                <h5 class="message-subject">${msg.subject}</h5>
                <p class="message-preview">${msg.message.substring(0, 150)}${msg.message.length > 150 ? '...' : ''}</p>
            </div>
            <div class="message-actions">
                <button class="btn btn-sm btn-primary" onclick="viewMessage(${msg.id})">
                    <i class="fas fa-eye"></i> Ko'rish
                </button>
                ${msg.unread ? `<button class="btn btn-sm btn-info" onclick="markAsRead(${msg.id})">
                    <i class="fas fa-check"></i> O'qilgan
                </button>` : ''}
                <button class="btn btn-sm btn-danger" onclick="deleteMessage(${msg.id})">
                    <i class="fas fa-trash"></i> O'chirish
                </button>
            </div>
        </div>
    `).join('');
}

// Mark message as read
async function markAsRead(id) {
    try {
        const response = await apiRequest(`/messages/${id}/read`, {
            method: 'PUT'
        });
        
        if (response.success) {
            showNotification('Xabar o\'qilgan deb belgilandi', 'success');
            loadMessages(); // Reload messages
            loadDashboardData(); // Update dashboard stats
        }
    } catch (error) {
        showNotification('Xabar belgilanmadi: ' + error.message, 'error');
    }
}

// Delete message
async function deleteMessage(id) {
    if (!confirm('Haqiqatan ham bu xabarni o\'chirmoqchimisiz?')) {
        return;
    }
    
    try {
        const response = await apiRequest(`/messages/${id}`, {
            method: 'DELETE'
        });
        
        if (response.success) {
            showNotification('Xabar muvaffaqiyatli o\'chirildi!', 'success');
            loadMessages(); // Reload messages
            loadDashboardData(); // Update dashboard stats
        }
    } catch (error) {
        showNotification('Xabar o\'chirilmadi: ' + error.message, 'error');
    }
}

// Mark all messages as read
async function markAllRead() {
    try {
        const response = await apiRequest('/messages');
        if (response.success) {
            const unreadMessages = response.data.filter(m => m.unread);
            
            for (const message of unreadMessages) {
                await apiRequest(`/messages/${message.id}/read`, {
                    method: 'PUT'
                });
            }
            
            showNotification('Barcha xabarlar o\'qilgan deb belgilandi!', 'success');
            loadMessages(); // Reload messages
            loadDashboardData(); // Update dashboard stats
        }
    } catch (error) {
        showNotification('Xabarlar belgilanmadi: ' + error.message, 'error');
    }
}

// Helper functions
function showLoadingState(section) {
    const loadingElement = document.querySelector(`#${section}-section .loading`);
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
}

function hideLoadingState(section) {
    const loadingElement = document.querySelector(`#${section}-section .loading`);
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

function showLoadingButton(selector, text) {
    const button = document.querySelector(selector);
    if (button) {
        button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
        button.disabled = true;
    }
}

function hideLoadingButton(selector, originalText) {
    const button = document.querySelector(selector);
    if (button) {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Bugun';
    } else if (diffDays === 2) {
        return 'Kecha';
    } else if (diffDays < 7) {
        return `${diffDays} kun oldin`;
    } else {
        return date.toLocaleDateString('uz-UZ');
    }
}

// View message in modal
function viewMessage(id) {
    // Implementation for viewing full message
    showNotification('Xabar ko\'rish funksiyasi ishlab chiqilmoqda...', 'info');
}

// Refresh stats
async function refreshStats() {
    try {
        showNotification('Statistika yangilanmoqda...', 'info');
        
        const response = await apiRequest('/stats');
        if (response.success) {
            const stats = response.data;
            
            // Update form fields
            document.getElementById('totalKills').value = stats.totalKills || 0;
            document.getElementById('chickenDinners').value = stats.chickenDinners || 0;
            document.getElementById('winRate').value = stats.winRate || 0;
            document.getElementById('kdRatio').value = stats.kdRatio || 0;
            document.getElementById('totalGames').value = stats.totalGames || 0;
            document.getElementById('top10Rate').value = stats.top10Rate || 0;
            document.getElementById('longestKill').value = stats.longestKill || 0;
            document.getElementById('headshotRate').value = stats.headshotRate || 0;
            
            showNotification('Statistika muvaffaqiyatli yangilandi!', 'success');
        }
    } catch (error) {
        showNotification('Statistika yangilanmadi: ' + error.message, 'error');
    }
}

// Load content data
async function loadContentData() {
    try {
        const response = await apiRequest('/content');
        if (response.success) {
            const content = response.data;
            
            // Update hero content
            if (content.hero) {
                document.getElementById('heroTitle').value = content.hero.title || '';
                document.getElementById('heroSubtitle').value = content.hero.subtitle || '';
                document.getElementById('heroDescription').value = content.hero.description || '';
            }
            
            // Update about content
            if (content.about) {
                document.getElementById('aboutName').value = content.about.name || '';
                document.getElementById('aboutNickname').value = content.about.nickname || '';
                document.getElementById('aboutBio').value = content.about.bio || '';
            }
        }
    } catch (error) {
        console.error('Content data loading failed:', error);
    }
}

// Load section data with backend integration
async function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'achievements-section':
            await loadAchievements();
            break;
        case 'messages-section':
            await loadMessages();
            break;
        case 'content-section':
            await loadContentData();
            break;
        case 'stats-section':
            await refreshStats();
            break;
        case 'gallery-section':
            await loadGallery();
            break;
        case 'analytics-section':
            await loadAnalytics();
            break;
    }
}

// Load gallery (placeholder)
async function loadGallery() {
    try {
        showLoadingState('gallery');
        const response = await apiRequest('/gallery');
        
        if (response.success) {
            // Display gallery items
            showNotification('Galereya yuklandi', 'success');
        }
    } catch (error) {
        showNotification('Galereya yuklanmadi: ' + error.message, 'error');
    } finally {
        hideLoadingState('gallery');
    }
}

// Load analytics (placeholder)
async function loadAnalytics() {
    try {
        showLoadingState('analytics');
        const response = await apiRequest('/analytics');
        
        if (response.success) {
            // Display analytics data
            showNotification('Analytics yuklandi', 'success');
        }
    } catch (error) {
        showNotification('Analytics yuklanmadi: ' + error.message, 'error');
    } finally {
        hideLoadingState('analytics');
    }
}