# 🚀 EdTech Ecosystem - Production Setup Guide

Полная инструкция по развертыванию production-ready платформы EdTech Ecosystem 2025.

## 📋 Предварительные требования

### Системные требования
- **Node.js** 16+ 
- **MongoDB** 4.4+
- **Redis** 6+ (опционально)
- **Nginx** (для production)
- **SSL сертификат**

### Облачные сервисы
- **MongoDB Atlas** - База данных
- **Cloudinary** - Загрузка файлов
- **Stripe** - Платежи
- **SendGrid** - Email
- **Vercel/Netlify** - Frontend
- **Railway/Heroku** - Backend

## 🏗️ Архитектура системы

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN           │    │   Redis Cache   │    │   File Storage  │
│   (CloudFlare)  │    │   (Optional)    │    │   (Cloudinary)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Настройка Backend API

### 1. Установка зависимостей
```bash
cd server
npm install
```

### 2. Настройка переменных окружения
```bash
cp env.example .env
```

Отредактируйте `.env`:
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edtech_ecosystem

# JWT Secret (сгенерируйте сложный ключ)
JWT_SECRET=your-super-secret-jwt-key-here-2025

# Server
PORT=5000
NODE_ENV=production

# Client URL
CLIENT_URL=https://your-domain.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-publishable-key

# Email
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

### 3. Заполнение базы данных
```bash
npm run seed
```

### 4. Запуск сервера
```bash
# Development
npm run dev

# Production
npm start
```

## 🌐 Настройка Frontend

### 1. Установка зависимостей
```bash
cd client
npm install
```

### 2. Настройка переменных окружения
```bash
cp .env.example .env.local
```

Отредактируйте `.env.local`:
```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-publishable-key
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

### 3. Сборка для production
```bash
npm run build
```

## 🗄️ Настройка базы данных

### MongoDB Atlas
1. Создайте кластер в MongoDB Atlas
2. Настройте пользователя базы данных
3. Получите connection string
4. Добавьте IP адреса в whitelist

### Локальная MongoDB
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb

# Windows
# Скачайте с официального сайта
```

## 🔐 Настройка безопасности

### SSL сертификаты
```bash
# Let's Encrypt
sudo certbot --nginx -d your-domain.com

# Или используйте CloudFlare SSL
```

### Nginx конфигурация
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/private.key;

    # Frontend
    location / {
        root /var/www/edtech-frontend/build;
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🚀 Развертывание

### Вариант 1: VPS (DigitalOcean, Linode, Vultr)

1. **Создайте VPS сервер**
   - Ubuntu 20.04+
   - 2GB RAM минимум
   - 50GB SSD

2. **Установите зависимости**
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Nginx
sudo apt-get install nginx

# PM2
sudo npm install -g pm2
```

3. **Развертывание**
```bash
# Клонируйте репозиторий
git clone https://github.com/your-username/edtech-ecosystem.git
cd edtech-ecosystem

# Backend
cd server
npm install
npm run seed
pm2 start index.js --name edtech-api

# Frontend
cd ../client
npm install
npm run build
sudo cp -r build/* /var/www/edtech-frontend/
```

### Вариант 2: Heroku

1. **Backend на Heroku**
```bash
# Установите Heroku CLI
# Создайте приложение
heroku create edtech-api

# Добавьте переменные окружения
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret

# Развертывание
git push heroku main
```

2. **Frontend на Vercel**
```bash
# Установите Vercel CLI
npm i -g vercel

# Развертывание
vercel --prod
```

### Вариант 3: Docker

1. **Dockerfile для Backend**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

2. **Docker Compose**
```yaml
version: '3.8'
services:
  api:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/edtech_ecosystem
    depends_on:
      - mongo

  frontend:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## 📊 Мониторинг и аналитика

### PM2 мониторинг
```bash
# Статус процессов
pm2 status

# Логи
pm2 logs edtech-api

# Мониторинг
pm2 monit
```

### Логирование
```bash
# Nginx логи
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Приложение логи
pm2 logs edtech-api --lines 100
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd server
          npm ci
          
      - name: Run tests
        run: |
          cd server
          npm test
          
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "edtech-api"
          heroku_email: "your-email@example.com"
```

## 📈 Масштабирование

### Горизонтальное масштабирование
- Несколько инстансов API
- Load balancer (Nginx)
- Redis для сессий
- CDN для статики

### Вертикальное масштабирование
- Увеличение RAM/CPU
- Оптимизация запросов
- Кэширование
- Индексы базы данных

## 🛡️ Безопасность

### Рекомендации
- Регулярные обновления
- Мониторинг безопасности
- Backup базы данных
- Rate limiting
- CORS настройки
- Валидация входных данных

## 📞 Поддержка

- **Документация**: https://docs.edtech-ecosystem.com
- **GitHub Issues**: https://github.com/edtech-ecosystem/issues
- **Discord**: https://discord.gg/edtech
- **Email**: support@edtech-ecosystem.com

---

**EdTech Ecosystem 2025** - Будущее образования уже здесь! 🚀✨
