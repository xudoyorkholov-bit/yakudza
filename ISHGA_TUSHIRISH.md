# 🚀 Shoxruz Yakudza Website - Ishga Tushirish Qo'llanmasi

## 📋 Tezkor Boshlash

### 1️⃣ **Avtomatik O'rnatish (Tavsiya etiladi)**
```bash
# Setup scriptini ishga tushiring
node setup.js

# Dependencies o'rnatish
npm install

# Serverni ishga tushirish
npm start
```

### 2️⃣ **Windows Foydalanuvchilari**
```cmd
# Faqat start.bat faylini ikki marta bosing
start.bat
```

### 3️⃣ **Linux/Mac Foydalanuvchilari**
```bash
# Terminal da quyidagi buyruqni bajaring
./start.sh
```

## 🌐 Website Ochish

### Variant 1: Live Server (VS Code)
1. VS Code da **Live Server** extension o'rnating
2. `index.html` faylini oching
3. **"Go Live"** tugmasini bosing

### Variant 2: Python Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Variant 3: Node.js Server
```bash
# http-server o'rnatish
npm install -g http-server

# Serverni ishga tushirish
http-server -p 8000
```

### Variant 4: Brauzerda To'g'ridan-to'g'ri
1. `index.html` faylini brauzerga sudrab oling
2. Yoki fayl menyusidan "Open with Browser" tanlang

## 🔐 Admin Panelga Kirish

### 1. Logo ustiga 2 marta bosing
- Saytning yuqori qismidagi **"SHOXRUZ YAKUDZA"** logosini toping
- Uni **2 marta** ketma-ket bosing (3 soniya ichida)

### 2. Parol kiriting
- **Parol:** `yakudza2024`
- "Kirish" tugmasini bosing

### 3. Admin panel ochiladi
- Yangi oynada to'liq admin panel ochiladi
- Barcha funksiyalar ishga tushadi

## 📊 Backend Server

### Server Ishga Tushirish
```bash
# Dependencies o'rnatish (birinchi marta)
npm install

# Serverni ishga tushirish
npm start

# Development mode (auto-restart)
npm run dev
```

### Server Manzillari
- **Website:** http://localhost:3001
- **API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/api/health

### API Endpoints
```
GET  /api/health          - Server holati
POST /api/auth/login      - Admin login
GET  /api/stats           - Statistika
PUT  /api/stats           - Statistika yangilash
GET  /api/achievements    - Yutuqlar
POST /api/achievements    - Yangi yutuq
GET  /api/messages        - Xabarlar
POST /api/messages        - Yangi xabar
GET  /api/gallery         - Galereya
GET  /api/dashboard       - Dashboard
```

## 🔧 Muammolarni Hal Qilish

### ❌ "npm: command not found"
```bash
# Node.js o'rnating: https://nodejs.org
# Yoki Chocolatey orqali (Windows):
choco install nodejs

# Yoki Homebrew orqali (Mac):
brew install node
```

### ❌ "Port 3001 already in use"
```bash
# Boshqa portni ishlatish
PORT=3002 npm start

# Yoki .env faylida o'zgartiring:
PORT=3002
```

### ❌ Admin panel ochilmayapti
1. **Logo 2 marta bosilganini** tekshiring
2. **Popup blocker** o'chirilganini tekshiring
3. **JavaScript** yoqilganini tekshiring
4. **Console** da xatolarni tekshiring (F12)

### ❌ Backend bilan bog'lanmayapti
1. **Server ishlab turganini** tekshiring: http://localhost:3001/api/health
2. **CORS** xatoligi bo'lsa, server qayta ishga tushiring
3. **Firewall** yoki **antivirus** to'sib qo'ygan bo'lishi mumkin

### ❌ Fayllar yuklanmayapti
1. **uploads** papkasi mavjudligini tekshiring
2. **Fayl hajmi** 10MB dan kichik ekanini tekshiring
3. **Fayl formati** ruxsat etilganini tekshiring (jpg, png, mp4, etc.)

## 📱 Mobil Qurilmalarda Test Qilish

### 1. Local Network orqali
```bash
# IP manzilni aniqlang
ipconfig          # Windows
ifconfig          # Linux/Mac

# Mobil brauzerda oching:
http://192.168.1.100:8000
```

### 2. ngrok orqali (Internet orqali)
```bash
# ngrok o'rnatish
npm install -g ngrok

# Tunnel ochish
ngrok http 8000

# Berilgan URL ni mobil brauzerda oching
```

## 🎯 Xususiyatlarni Test Qilish

### ✅ Frontend Test
- [ ] Barcha sahifalar ochiladi
- [ ] Responsive dizayn ishlaydi
- [ ] Animatsiyalar ko'rinadi
- [ ] Navigation menu ishlaydi
- [ ] Contact form ishlaydi

### ✅ Admin Panel Test
- [ ] Logo orqali kirish ishlaydi
- [ ] Login form ishlaydi
- [ ] Dashboard yuklanadi
- [ ] Statistika yangilanadi
- [ ] Yutuqlar qo'shiladi
- [ ] Xabarlar ko'rinadi

### ✅ Backend Test
- [ ] Server ishga tushadi
- [ ] API endpoints javob beradi
- [ ] Ma'lumotlar saqlanadi
- [ ] Fayllar yuklanadi
- [ ] Authentication ishlaydi

## 🚀 Production Deploy

### Vercel (Tavsiya etiladi)
```bash
# Vercel CLI o'rnatish
npm install -g vercel

# Deploy qilish
vercel

# Custom domain
vercel --prod
```

### Netlify
```bash
# Build qilish
npm run build

# Netlify CLI orqali
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Heroku
```bash
# Heroku CLI o'rnatish va login
heroku login

# App yaratish
heroku create yakudza-website

# Deploy qilish
git push heroku main
```

## 📞 Yordam

Agar muammolar bo'lsa:

1. **Console** ni tekshiring (F12 → Console)
2. **Network** tab da so'rovlarni ko'ring
3. **Server logs** ni o'qing
4. **README.md** faylini o'qing
5. **Issues** bo'limida savol bering

## 🎉 Muvaffaqiyat!

Agar hammasi to'g'ri ishlasa:
- ✅ Website: http://localhost:8000
- ✅ Backend: http://localhost:3001
- ✅ Admin Panel: Logo → 2 marta bosish → yakudza2024

**Omad tilaymiz! 🎮🏆**