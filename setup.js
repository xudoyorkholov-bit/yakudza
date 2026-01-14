#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

console.log('🚀 Shoxruz Yakudza Website Setup boshlandi...\n');

async function createDirectories() {
    const directories = [
        'data',
        'uploads',
        'uploads/images',
        'uploads/videos',
        'logs'
    ];
    
    console.log('📁 Papkalar yaratilmoqda...');
    
    for (const dir of directories) {
        try {
            await fs.mkdir(dir, { recursive: true });
            console.log(`   ✅ ${dir} papkasi yaratildi`);
        } catch (error) {
            console.log(`   ⚠️  ${dir} papkasi allaqachon mavjud`);
        }
    }
}

async function createConfigFiles() {
    console.log('\n⚙️  Konfiguratsiya fayllari yaratilmoqda...');
    
    // .env file
    const envContent = `# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=yakudza_secret_key_2024_super_secure

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=yakudza2024

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Database Configuration (for future use)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=yakudza_website
DB_USER=admin
DB_PASSWORD=yakudza2024

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=yakudza_session_secret_2024

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:8080,http://127.0.0.1:5500
`;

    try {
        await fs.writeFile('.env', envContent);
        console.log('   ✅ .env fayli yaratildi');
    } catch (error) {
        console.log('   ❌ .env fayli yaratilmadi:', error.message);
    }

    // .gitignore file
    const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Uploads
uploads/
!uploads/.gitkeep

# Data files
data/
!data/.gitkeep

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Build files
dist/
build/
`;

    try {
        await fs.writeFile('.gitignore', gitignoreContent);
        console.log('   ✅ .gitignore fayli yaratildi');
    } catch (error) {
        console.log('   ❌ .gitignore fayli yaratilmadi:', error.message);
    }
}

async function createKeepFiles() {
    console.log('\n📄 .gitkeep fayllari yaratilmoqda...');
    
    const keepFiles = [
        'data/.gitkeep',
        'uploads/.gitkeep',
        'uploads/images/.gitkeep',
        'uploads/videos/.gitkeep',
        'logs/.gitkeep'
    ];
    
    for (const file of keepFiles) {
        try {
            await fs.writeFile(file, '# Bu fayl papkani Git da saqlash uchun kerak\n');
            console.log(`   ✅ ${file} yaratildi`);
        } catch (error) {
            console.log(`   ❌ ${file} yaratilmadi:`, error.message);
        }
    }
}

async function createStartScript() {
    console.log('\n🔧 Start script yaratilmoqda...');
    
    const startScriptContent = `@echo off
echo 🚀 Shoxruz Yakudza Website ishga tushirilmoqda...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Dependencies o'rnatilmoqda...
    npm install
    echo.
)

REM Start the server
echo 🌐 Server ishga tushirilmoqda...
echo 📊 Admin Panel: http://localhost:3001/api
echo 🏠 Website: Fayllarni brauzerda oching
echo.
echo ⚠️  Server to'xtatish uchun Ctrl+C bosing
echo.

npm start
`;

    try {
        await fs.writeFile('start.bat', startScriptContent);
        console.log('   ✅ start.bat fayli yaratildi (Windows uchun)');
    } catch (error) {
        console.log('   ❌ start.bat fayli yaratilmadi:', error.message);
    }

    // Unix/Linux/Mac script
    const startShContent = `#!/bin/bash
echo "🚀 Shoxruz Yakudza Website ishga tushirilmoqda..."
echo

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies o'rnatilmoqda..."
    npm install
    echo
fi

# Start the server
echo "🌐 Server ishga tushirilmoqda..."
echo "📊 Admin Panel: http://localhost:3001/api"
echo "🏠 Website: Fayllarni brauzerda oching"
echo
echo "⚠️  Server to'xtatish uchun Ctrl+C bosing"
echo

npm start
`;

    try {
        await fs.writeFile('start.sh', startShContent);
        await fs.chmod('start.sh', '755');
        console.log('   ✅ start.sh fayli yaratildi (Unix/Linux/Mac uchun)');
    } catch (error) {
        console.log('   ❌ start.sh fayli yaratilmadi:', error.message);
    }
}

async function createReadme() {
    console.log('\n📖 README.md yaratilmoqda...');
    
    const readmeContent = `# 🎮 Shoxruz Yakudza - Professional PUBG Player Website

Professional PUBG o'yinchisi Shoxruz Yakudza uchun zamonaviy website va admin panel.

## ✨ Xususiyatlar

### 🌐 Frontend
- **Zamonaviy dizayn** - Gradient ranglar va animatsiyalar
- **To'liq responsive** - Barcha qurilmalarda mukammal ishlaydi
- **Tez yuklash** - Optimallashtirilgan kod va rasmlar
- **SEO friendly** - Qidiruv tizimlariga mos
- **Animatsiyalar** - Smooth transitions va effects

### 🔐 Admin Panel
- **Xavfsiz kirish** - JWT token autentifikatsiya
- **Dashboard** - Real-time statistika va analytics
- **Kontent boshqaruvi** - Matn va rasmlarni tahrirlash
- **Statistika** - O'yin ko'rsatkichlarini yangilash
- **Yutuqlar** - Achievement larni qo'shish/tahrirlash
- **Xabarlar** - Contact form xabarlarini ko'rish
- **Media galereya** - Rasm va videolarni yuklash
- **Responsive** - Mobil qurilmalarda ham ishlaydi

### 🚀 Backend API
- **RESTful API** - Zamonaviy API arxitektura
- **Ma'lumotlar bazasi** - JSON fayl asosida
- **Fayl yuklash** - Multer bilan media upload
- **Xavfsizlik** - CORS, Helmet, rate limiting
- **Logging** - Morgan bilan so'rovlarni kuzatish

## 🛠️ O'rnatish

### 1. Tezkor o'rnatish
\`\`\`bash
# Dependencies o'rnatish
npm run setup

# Serverni ishga tushirish
npm start
\`\`\`

### 2. Manual o'rnatish
\`\`\`bash
# 1. Dependencies o'rnatish
npm install

# 2. Serverni ishga tushirish
npm start
\`\`\`

### 3. Windows uchun
\`\`\`cmd
start.bat
\`\`\`

### 4. Linux/Mac uchun
\`\`\`bash
./start.sh
\`\`\`

## 🌐 Foydalanish

### Website
1. **index.html** faylini brauzerda oching
2. Yoki Live Server extension ishlatib VS Code da oching
3. Yoki Python server: \`python -m http.server 8000\`

### Admin Panel
1. **Logo ustiga 2 marta bosing** (har qanday sahifada)
2. **Parol:** \`yakudza2024\`
3. Admin panel yangi oynada ochiladi

### API Endpoints
- **GET** \`/api/stats\` - Statistika olish
- **PUT** \`/api/stats\` - Statistika yangilash
- **GET** \`/api/achievements\` - Yutuqlar ro'yxati
- **POST** \`/api/achievements\` - Yangi yutuq qo'shish
- **GET** \`/api/messages\` - Xabarlar ro'yxati
- **POST** \`/api/messages\` - Yangi xabar yuborish

## 📁 Fayl Strukturasi

\`\`\`
shoxruz-yakudza-website/
├── 📄 index.html              # Bosh sahifa
├── 📄 about.html              # Haqida sahifa
├── 📄 stats.html              # Statistika sahifa
├── 📄 achievements.html       # Yutuqlar sahifa
├── 📄 gallery.html            # Galereya sahifa
├── 📄 contact.html            # Aloqa sahifa
├── 📄 admin.html              # Admin panel
├── 🎨 style.css               # Asosiy CSS
├── 🎨 responsive.css          # Responsive CSS
├── 🎨 admin-style.css         # Admin panel CSS
├── ⚡ script.js               # Frontend JavaScript
├── ⚡ admin-script.js         # Admin panel JavaScript
├── 🚀 server.js               # Backend server
├── 📦 package.json            # Dependencies
├── ⚙️ setup.js                # O'rnatish scripti
├── 📁 data/                   # Ma'lumotlar fayllari
├── 📁 uploads/                # Yuklangan fayllar
└── 📁 logs/                   # Log fayllar
\`\`\`

## 🔧 Konfiguratsiya

### Environment Variables (.env)
\`\`\`env
PORT=3001
JWT_SECRET=yakudza_secret_key_2024
ADMIN_USERNAME=admin
ADMIN_PASSWORD=yakudza2024
\`\`\`

### Admin Credentials
- **Username:** \`admin\`
- **Password:** \`yakudza2024\`

## 🎯 Admin Panel Funksiyalari

### Dashboard
- Real-time statistika
- Faoliyat tarixi
- Tezkor harakatlar
- System monitoring

### Kontent Boshqaruvi
- Hero section tahrirlash
- About section yangilash
- Ijtimoiy tarmoq havolalari
- Meta ma'lumotlar

### Statistika Boshqaruvi
- Kill count yangilash
- Win rate o'zgartirish
- K/D ratio tahrirlash
- Batafsil statistika

### Yutuqlar Boshqaruvi
- Yangi yutuq qo'shish
- Mavjud yutuqlarni tahrirlash
- Kategoriya bo'yicha saralash
- Mukofot ma'lumotlari

### Xabarlar
- Contact form xabarlari
- O'qilgan/o'qilmagan belgilash
- Javob berish
- Xabarlarni o'chirish

## 📱 Responsive Design

Website barcha qurilmalarda mukammal ishlaydi:
- 📱 **Mobile** (320px+)
- 📱 **Tablet** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Desktop** (1400px+)

## 🔒 Xavfsizlik

- JWT token autentifikatsiya
- CORS himoyasi
- File upload xavfsizligi
- Input validation
- Rate limiting
- Helmet.js himoyasi

## 🚀 Production Deploy

### Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify
\`\`\`bash
npm run build
# dist papkasini Netlify ga yuklang
\`\`\`

### Heroku
\`\`\`bash
git init
heroku create yakudza-website
git push heroku main
\`\`\`

## 🤝 Yordam

Agar savollaringiz bo'lsa:
1. **Issues** bo'limida savol bering
2. **Documentation** ni o'qing
3. **Admin panel** da yordam bo'limini ko'ring

## 📄 Litsenziya

MIT License - batafsil ma'lumot uchun LICENSE faylini ko'ring.

---

**Yaratuvchi:** Shoxruz Yakudza Team  
**Versiya:** 1.0.0  
**Sana:** 2024
`;

    try {
        await fs.writeFile('README.md', readmeContent);
        console.log('   ✅ README.md fayli yaratildi');
    } catch (error) {
        console.log('   ❌ README.md fayli yaratilmadi:', error.message);
    }
}

async function main() {
    try {
        await createDirectories();
        await createConfigFiles();
        await createKeepFiles();
        await createStartScript();
        await createReadme();
        
        console.log('\n🎉 Setup muvaffaqiyatli yakunlandi!\n');
        console.log('📋 Keyingi qadamlar:');
        console.log('   1. npm install - dependencies o\'rnatish');
        console.log('   2. npm start - serverni ishga tushirish');
        console.log('   3. index.html ni brauzerda oching');
        console.log('   4. Logo ustiga 2 marta bosib admin panelga kiring');
        console.log('   5. Parol: yakudza2024\n');
        console.log('🌐 Server: http://localhost:3001');
        console.log('📊 API: http://localhost:3001/api');
        console.log('🔐 Admin: Logo ustiga 2 marta bosing\n');
        console.log('✨ Omad tilaymiz!');
        
    } catch (error) {
        console.error('❌ Setup xatoligi:', error);
        process.exit(1);
    }
}

main();