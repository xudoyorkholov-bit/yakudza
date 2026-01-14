const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'yakudza_secret_key_2024';

// Security middleware
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:", "http:"],
            connectSrc: ["'self'", "http://localhost:3001"]
        }
    }
}));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// CORS middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:5500', 'http://localhost:5500'],
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Faqat rasm va video fayllar ruxsat etilgan!'));
        }
    }
});

// Data files
const DATA_DIR = './data';
const STATS_FILE = path.join(DATA_DIR, 'stats.json');
const ACHIEVEMENTS_FILE = path.join(DATA_DIR, 'achievements.json');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

// Initialize data directory and files
async function initializeData() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.mkdir('uploads', { recursive: true });
        
        // Initialize default data files
        const defaultStats = {
            totalKills: 2547892,
            chickenDinners: 1547,
            winRate: 87,
            kdRatio: 4.2,
            totalGames: 15847,
            top10Rate: 65,
            longestKill: 847,
            headshotRate: 42,
            lastUpdated: new Date().toISOString()
        };
        
        const defaultAchievements = [
            {
                id: 1,
                title: "PUBG Mobile World Championship",
                year: "2023",
                description: "Jahon chempionati 1-o'rin",
                icon: "fas fa-trophy",
                category: "tournament",
                date: "2023-12-15",
                prize: "$100,000"
            },
            {
                id: 2,
                title: "Asia Pacific Championship",
                year: "2023",
                description: "Osiyo-Tinch okeani chempioni",
                icon: "fas fa-medal",
                category: "tournament",
                date: "2023-08-20",
                prize: "$50,000"
            },
            {
                id: 3,
                title: "O'zbekiston Milliy Chempionati",
                year: "2022-2023",
                description: "3 marta ketma-ket chempion",
                icon: "fas fa-crown",
                category: "national",
                date: "2023-06-10",
                prize: "$25,000"
            }
        ];
        
        const defaultContent = {
            hero: {
                title: "SHOXRUZ YAKUDZA",
                subtitle: "Professional PUBG Player & Content Creator",
                description: "Professional PUBG oyinchisi va kontent yaratuvchi"
            },
            about: {
                name: "Shoxruz Karimov",
                nickname: "Yakudza",
                bio: "Men 5 yildan ortiq vaqtdan beri professional PUBG o'ynayman. O'zbekistondagi eng yaxshi o'yinchilardan biri sifatida tanilganman va ko'plab xalqaro turnirlardan g'olib chiqqanman."
            },
            socialLinks: [
                { platform: "youtube", url: "https://youtube.com/@shoxruzyakudza", icon: "fab fa-youtube" },
                { platform: "twitch", url: "https://twitch.tv/shoxruzyakudza", icon: "fab fa-twitch" },
                { platform: "instagram", url: "https://instagram.com/shoxruzyakudza", icon: "fab fa-instagram" },
                { platform: "telegram", url: "https://t.me/shoxruzyakudza", icon: "fab fa-telegram" }
            ]
        };
        
        const defaultMessages = [];
        const defaultGallery = [];
        const defaultAnalytics = {
            dailyViews: 15847,
            activeUsers: 2847,
            newMessages: 127,
            winRate: 89,
            lastUpdated: new Date().toISOString()
        };
        
        // Create files if they don't exist
        const files = [
            { path: STATS_FILE, data: defaultStats },
            { path: ACHIEVEMENTS_FILE, data: defaultAchievements },
            { path: CONTENT_FILE, data: defaultContent },
            { path: MESSAGES_FILE, data: defaultMessages },
            { path: GALLERY_FILE, data: defaultGallery },
            { path: ANALYTICS_FILE, data: defaultAnalytics }
        ];
        
        for (const file of files) {
            try {
                await fs.access(file.path);
            } catch {
                await fs.writeFile(file.path, JSON.stringify(file.data, null, 2));
            }
        }
        
        console.log('✅ Ma\'lumotlar bazasi muvaffaqiyatli ishga tushirildi');
    } catch (error) {
        console.error('❌ Ma\'lumotlar bazasini ishga tushirishda xatolik:', error);
    }
}

// Helper functions
async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Fayl o'qishda xatolik ${filePath}:`, error);
        return null;
    }
}

async function writeJsonFile(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Fayl yozishda xatolik ${filePath}:`, error);
        return false;
    }
}

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token talab qilinadi' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Noto\'g\'ri token' });
        }
        req.user = user;
        next();
    });
}

// ===== AUTHENTICATION ROUTES =====

// Admin login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Simple authentication (in production, use database)
        if (username === 'admin' && password === 'yakudza2024') {
            const token = jwt.sign(
                { username: username, role: 'admin' },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.json({
                success: true,
                token: token,
                user: {
                    username: username,
                    role: 'admin'
                }
            });
        } else {
            res.status(401).json({
                success: false,
                error: 'Noto\'g\'ri foydalanuvchi nomi yoki parol'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server xatoligi'
        });
    }
});

// Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

// ===== STATS ROUTES =====

// Get stats
app.get('/api/stats', async (req, res) => {
    try {
        const stats = await readJsonFile(STATS_FILE);
        if (stats) {
            res.json({ success: true, data: stats });
        } else {
            res.status(500).json({ success: false, error: 'Statistika yuklanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// Update stats
app.put('/api/stats', authenticateToken, async (req, res) => {
    try {
        const currentStats = await readJsonFile(STATS_FILE);
        const updatedStats = {
            ...currentStats,
            ...req.body,
            lastUpdated: new Date().toISOString()
        };
        
        const success = await writeJsonFile(STATS_FILE, updatedStats);
        
        if (success) {
            res.json({ success: true, data: updatedStats });
        } else {
            res.status(500).json({ success: false, error: 'Statistika saqlanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// ===== ACHIEVEMENTS ROUTES =====

// Get achievements
app.get('/api/achievements', async (req, res) => {
    try {
        const achievements = await readJsonFile(ACHIEVEMENTS_FILE);
        if (achievements) {
            res.json({ success: true, data: achievements });
        } else {
            res.status(500).json({ success: false, error: 'Yutuqlar yuklanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// Add achievement
app.post('/api/achievements', authenticateToken, async (req, res) => {
    try {
        const achievements = await readJsonFile(ACHIEVEMENTS_FILE);
        const newAchievement = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        
        achievements.push(newAchievement);
        const success = await writeJsonFile(ACHIEVEMENTS_FILE, achievements);
        
        if (success) {
            res.json({ success: true, data: newAchievement });
        } else {
            res.status(500).json({ success: false, error: 'Yutuq saqlanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// Update achievement
app.put('/api/achievements/:id', authenticateToken, async (req, res) => {
    try {
        const achievements = await readJsonFile(ACHIEVEMENTS_FILE);
        const achievementId = parseInt(req.params.id);
        const index = achievements.findIndex(a => a.id === achievementId);
        
        if (index !== -1) {
            achievements[index] = {
                ...achievements[index],
                ...req.body,
                updatedAt: new Date().toISOString()
            };
            
            const success = await writeJsonFile(ACHIEVEMENTS_FILE, achievements);
            
            if (success) {
                res.json({ success: true, data: achievements[index] });
            } else {
                res.status(500).json({ success: false, error: 'Yutuq yangilanmadi' });
            }
        } else {
            res.status(404).json({ success: false, error: 'Yutuq topilmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// Delete achievement
app.delete('/api/achievements/:id', authenticateToken, async (req, res) => {
    try {
        const achievements = await readJsonFile(ACHIEVEMENTS_FILE);
        const achievementId = parseInt(req.params.id);
        const filteredAchievements = achievements.filter(a => a.id !== achievementId);
        
        if (filteredAchievements.length < achievements.length) {
            const success = await writeJsonFile(ACHIEVEMENTS_FILE, filteredAchievements);
            
            if (success) {
                res.json({ success: true, message: 'Yutuq o\'chirildi' });
            } else {
                res.status(500).json({ success: false, error: 'Yutuq o\'chirilmadi' });
            }
        } else {
            res.status(404).json({ success: false, error: 'Yutuq topilmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// ===== CONTENT ROUTES =====

// Get content
app.get('/api/content', async (req, res) => {
    try {
        const content = await readJsonFile(CONTENT_FILE);
        if (content) {
            res.json({ success: true, data: content });
        } else {
            res.status(500).json({ success: false, error: 'Kontent yuklanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// Update content
app.put('/api/content', authenticateToken, async (req, res) => {
    try {
        const currentContent = await readJsonFile(CONTENT_FILE);
        const updatedContent = {
            ...currentContent,
            ...req.body,
            lastUpdated: new Date().toISOString()
        };
        
        const success = await writeJsonFile(CONTENT_FILE, updatedContent);
        
        if (success) {
            res.json({ success: true, data: updatedContent });
        } else {
            res.status(500).json({ success: false, error: 'Kontent saqlanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// ===== MESSAGES ROUTES =====

// Get messages
app.get('/api/messages', authenticateToken, async (req, res) => {
    try {
        const messages = await readJsonFile(MESSAGES_FILE);
        if (messages) {
            res.json({ success: true, data: messages });
        } else {
            res.status(500).json({ success: false, error: 'Xabarlar yuklanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// Add message (public endpoint for contact form)
app.post('/api/messages', async (req, res) => {
    try {
        const messages = await readJsonFile(MESSAGES_FILE);
        const newMessage = {
            id: Date.now(),
            ...req.body,
            unread: true,
            createdAt: new Date().toISOString()
        };
        
        messages.unshift(newMessage); // Add to beginning
        const success = await writeJsonFile(MESSAGES_FILE, messages);
        
        if (success) {
            res.json({ success: true, message: 'Xabar yuborildi' });
        } else {
            res.status(500).json({ success: false, error: 'Xabar saqlanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// Mark message as read
app.put('/api/messages/:id/read', authenticateToken, async (req, res) => {
    try {
        const messages = await readJsonFile(MESSAGES_FILE);
        const messageId = parseInt(req.params.id);
        const index = messages.findIndex(m => m.id === messageId);
        
        if (index !== -1) {
            messages[index].unread = false;
            messages[index].readAt = new Date().toISOString();
            
            const success = await writeJsonFile(MESSAGES_FILE, messages);
            
            if (success) {
                res.json({ success: true, message: 'Xabar o\'qilgan deb belgilandi' });
            } else {
                res.status(500).json({ success: false, error: 'Xabar yangilanmadi' });
            }
        } else {
            res.status(404).json({ success: false, error: 'Xabar topilmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// Delete message
app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
    try {
        const messages = await readJsonFile(MESSAGES_FILE);
        const messageId = parseInt(req.params.id);
        const filteredMessages = messages.filter(m => m.id !== messageId);
        
        if (filteredMessages.length < messages.length) {
            const success = await writeJsonFile(MESSAGES_FILE, filteredMessages);
            
            if (success) {
                res.json({ success: true, message: 'Xabar o\'chirildi' });
            } else {
                res.status(500).json({ success: false, error: 'Xabar o\'chirilmadi' });
            }
        } else {
            res.status(404).json({ success: false, error: 'Xabar topilmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// ===== GALLERY ROUTES =====

// Get gallery
app.get('/api/gallery', async (req, res) => {
    try {
        const gallery = await readJsonFile(GALLERY_FILE);
        if (gallery) {
            res.json({ success: true, data: gallery });
        } else {
            res.status(500).json({ success: false, error: 'Galereya yuklanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// Upload media
app.post('/api/gallery/upload', authenticateToken, upload.single('media'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Fayl tanlanmadi' });
        }
        
        const gallery = await readJsonFile(GALLERY_FILE);
        const newMedia = {
            id: Date.now(),
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: `/uploads/${req.file.filename}`,
            type: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
            size: req.file.size,
            title: req.body.title || req.file.originalname,
            description: req.body.description || '',
            category: req.body.category || 'general',
            uploadedAt: new Date().toISOString()
        };
        
        gallery.unshift(newMedia); // Add to beginning
        const success = await writeJsonFile(GALLERY_FILE, gallery);
        
        if (success) {
            res.json({ success: true, data: newMedia });
        } else {
            res.status(500).json({ success: false, error: 'Media saqlanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// Delete media
app.delete('/api/gallery/:id', authenticateToken, async (req, res) => {
    try {
        const gallery = await readJsonFile(GALLERY_FILE);
        const mediaId = parseInt(req.params.id);
        const mediaIndex = gallery.findIndex(m => m.id === mediaId);
        
        if (mediaIndex !== -1) {
            const media = gallery[mediaIndex];
            
            // Delete file from filesystem
            try {
                await fs.unlink(path.join('uploads', media.filename));
            } catch (error) {
                console.log('Fayl o\'chirishda xatolik:', error);
            }
            
            // Remove from gallery
            gallery.splice(mediaIndex, 1);
            const success = await writeJsonFile(GALLERY_FILE, gallery);
            
            if (success) {
                res.json({ success: true, message: 'Media o\'chirildi' });
            } else {
                res.status(500).json({ success: false, error: 'Media o\'chirilmadi' });
            }
        } else {
            res.status(404).json({ success: false, error: 'Media topilmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// ===== ANALYTICS ROUTES =====

// Get analytics
app.get('/api/analytics', authenticateToken, async (req, res) => {
    try {
        const analytics = await readJsonFile(ANALYTICS_FILE);
        if (analytics) {
            res.json({ success: true, data: analytics });
        } else {
            res.status(500).json({ success: false, error: 'Analytics yuklanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// Update analytics
app.put('/api/analytics', authenticateToken, async (req, res) => {
    try {
        const currentAnalytics = await readJsonFile(ANALYTICS_FILE);
        const updatedAnalytics = {
            ...currentAnalytics,
            ...req.body,
            lastUpdated: new Date().toISOString()
        };
        
        const success = await writeJsonFile(ANALYTICS_FILE, updatedAnalytics);
        
        if (success) {
            res.json({ success: true, data: updatedAnalytics });
        } else {
            res.status(500).json({ success: false, error: 'Analytics saqlanmadi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server xatoligi' });
    }
});

// ===== DASHBOARD ROUTES =====

// Get dashboard summary
app.get('/api/dashboard', authenticateToken, async (req, res) => {
    try {
        const [stats, achievements, messages, analytics] = await Promise.all([
            readJsonFile(STATS_FILE),
            readJsonFile(ACHIEVEMENTS_FILE),
            readJsonFile(MESSAGES_FILE),
            readJsonFile(ANALYTICS_FILE)
        ]);
        
        const unreadMessages = messages ? messages.filter(m => m.unread).length : 0;
        const totalAchievements = achievements ? achievements.length : 0;
        
        const dashboardData = {
            stats: stats || {},
            analytics: analytics || {},
            summary: {
                totalAchievements,
                unreadMessages,
                lastStatsUpdate: stats?.lastUpdated || null,
                lastAnalyticsUpdate: analytics?.lastUpdated || null
            }
        };
        
        res.json({ success: true, data: dashboardData });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Dashboard ma\'lumotlari yuklanmadi' });
    }
});

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server ishlayapti',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Serve static files (for production)
app.use(express.static('.', {
    index: 'index.html',
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        } else if (path.endsWith('.css') || path.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
    }
}));

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'Fayl hajmi juda katta (maksimal 10MB)'
            });
        }
    }
    
    res.status(500).json({
        success: false,
        error: error.message || 'Server xatoligi'
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'API endpoint topilmadi'
    });
});

// Catch all handler - serve index.html for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
async function startServer() {
    try {
        await initializeData();
        
        const server = app.listen(PORT, () => {
            console.log('\n🎮 ===== SHOXRUZ YAKUDZA WEBSITE =====');
            console.log(`🚀 Server muvaffaqiyatli ishga tushdi!`);
            console.log(`🌐 Port: ${PORT}`);
            console.log(`📊 Admin API: http://localhost:${PORT}/api`);
            console.log(`🏠 Website: http://localhost:${PORT}`);
            console.log(`🔐 Admin Panel: Logo ustiga 2 marta bosing`);
            console.log(`🔑 Admin Parol: yakudza2024`);
            console.log('\n📋 API Endpoints:');
            console.log(`   GET  /api/health - Server holati`);
            console.log(`   POST /api/auth/login - Admin login`);
            console.log(`   GET  /api/stats - Statistika`);
            console.log(`   GET  /api/achievements - Yutuqlar`);
            console.log(`   GET  /api/messages - Xabarlar`);
            console.log(`   POST /api/messages - Yangi xabar`);
            console.log(`   GET  /api/gallery - Galereya`);
            console.log(`   GET  /api/dashboard - Dashboard`);
            console.log('\n⚠️  Server to\'xtatish uchun Ctrl+C bosing');
            console.log('=====================================\n');
        });
        
        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('\n🛑 SIGTERM signal qabul qilindi. Server yopilmoqda...');
            server.close(() => {
                console.log('✅ Server muvaffaqiyatli yopildi.');
                process.exit(0);
            });
        });
        
        process.on('SIGINT', () => {
            console.log('\n🛑 SIGINT signal qabul qilindi. Server yopilmoqda...');
            server.close(() => {
                console.log('✅ Server muvaffaqiyatli yopildi.');
                process.exit(0);
            });
        });
        
    } catch (error) {
        console.error('❌ Server ishga tushirishda xatolik:', error);
        process.exit(1);
    }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

startServer();