# 🚀 GitHub ga Yuklash Qo'llanmasi

## ❌ MUAMMO: Git o'rnatilmagan

Sizning kompyuteringizda Git o'rnatilmagan.

---

## ✅ YECHIM:

### 1️⃣ **Git o'rnatish:**

**Windows uchun:**
1. https://git-scm.com/download/win ga kiring
2. Git-ni yuklab oling va o'rnating
3. O'rnatish jarayonida barcha default sozlamalarni qoldiring
4. O'rnatish tugagandan keyin terminalni yoping va qayta oching

---

### 2️⃣ **Git o'rnatilganini tekshirish:**

Terminal da yozing:
```bash
git --version
```

Agar versiya ko'rsatilsa, Git o'rnatilgan.

---

### 3️⃣ **GitHub ga yuklash:**

Git o'rnatilgandan keyin quyidagi buyruqlarni **alohida-alohida** bajaring:

```bash
# 1. Git repository yaratish
git init

# 2. Git config (birinchi marta)
git config --global user.name "Sizning ismingiz"
git config --global user.email "sizning@email.com"

# 3. README yaratish
echo "# Yakudza PUBG Website" > README.md

# 4. Barcha fayllarni qo'shish
git add .

# 5. Commit qilish
git commit -m "Initial commit - Shoxruz Yakudza website"

# 6. Branch nomini o'zgartirish
git branch -M main

# 7. Remote repository qo'shish
git remote add origin https://github.com/xudoyorkholov-bit/yakudza.git

# 8. GitHub ga push qilish
git push -u origin main
```

---

### 4️⃣ **Agar GitHub parol so'rasa:**

GitHub endi parol qabul qilmaydi. **Personal Access Token** kerak:

1. GitHub.com ga kiring
2. Settings → Developer settings → Personal access tokens → Tokens (classic)
3. "Generate new token" bosing
4. Token nomini yozing (masalan: "Yakudza Project")
5. Expiration: 90 days yoki No expiration
6. Scopes: **repo** ni belgilang
7. "Generate token" bosing
8. **Tokenni copy qiling va saqlang!** (Bir marta ko'rsatiladi)

Push qilishda parol o'rniga **token** ni kiriting.

---

### 5️⃣ **Agar repository allaqachon mavjud bo'lsa:**

```bash
# Eski remote o'chirish
git remote remove origin

# Yangi remote qo'shish
git remote add origin https://github.com/xudoyorkholov-bit/yakudza.git

# Force push
git push -u origin main --force
```

---

### 6️⃣ **Tezkor yuklash (Git o'rnatilgandan keyin):**

```bash
git init
git add .
git commit -m "Shoxruz Yakudza PUBG Website"
git branch -M main
git remote add origin https://github.com/xudoyorkholov-bit/yakudza.git
git push -u origin main
```

---

## 🔧 MUAMMOLAR VA YECHIMLAR:

### **"git: command not found"**
- Git o'rnatilmagan
- Terminalni qayta oching
- PATH ga qo'shilganini tekshiring

### **"Permission denied"**
- Personal Access Token ishlatib ko'ring
- SSH key sozlang

### **"Repository not found"**
- Repository nomini tekshiring
- GitHub da repository yaratilganini tekshiring

### **"Failed to push"**
- `git pull origin main --allow-unrelated-histories`
- Keyin: `git push -u origin main`

---

## 📦 .gitignore yaratish:

```bash
# .gitignore faylini yaratish
echo "node_modules/" > .gitignore
echo "data/" >> .gitignore
echo "uploads/" >> .gitignore
echo ".env" >> .gitignore
```

---

## 🎯 OXIRGI QADAMLAR:

1. **Git o'rnating** - https://git-scm.com
2. **Terminalni qayta oching**
3. **Yuqoridagi buyruqlarni bajaring**
4. **GitHub da repository yarating** (agar yo'q bo'lsa)
5. **Push qiling**

**Muvaffaqiyat!** 🚀