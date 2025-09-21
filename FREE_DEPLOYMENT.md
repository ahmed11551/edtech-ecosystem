# 🆓 Бесплатное развертывание EdTech Ecosystem

Полное руководство по развертыванию EdTech Ecosystem на бесплатных платформах.

## 💰 Стоимость: $0/месяц

| Сервис | Провайдер | Лимит | Стоимость |
|--------|-----------|-------|-----------|
| Frontend | Vercel | Безлимитно | $0 |
| Backend | Railway | 500 часов/месяц | $0 |
| Database | MongoDB Atlas | 512MB | $0 |
| Домен | Freenom | .tk, .ml, .ga | $0 |
| **ИТОГО** | | | **$0** |

## 🚀 Быстрый старт

### 1. Запуск автоматической настройки
```bash
chmod +x deploy-free.sh
./deploy-free.sh
```

### 2. Следуйте инструкциям на экране
Скрипт проведет вас через настройку всех сервисов.

## 📋 Подробные инструкции

### 1️⃣ MongoDB Atlas (База данных)

#### Регистрация:
1. Перейдите на https://mongodb.com/atlas
2. Нажмите "Try Free"
3. Заполните форму регистрации
4. Подтвердите email

#### Создание кластера:
1. Выберите "M0 Sandbox" (бесплатный)
2. Выберите регион (ближайший к вам)
3. Нажмите "Create Cluster"
4. Дождитесь создания (2-3 минуты)

#### Настройка доступа:
1. Создайте пользователя базы данных
2. Настройте IP whitelist (0.0.0.0/0 для всех)
3. Получите строку подключения

#### Строка подключения:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/edtech_ecosystem?retryWrites=true&w=majority
```

### 2️⃣ Railway (Backend API)

#### Регистрация:
1. Перейдите на https://railway.app
2. Нажмите "Login with GitHub"
3. Разрешите доступ к репозиториям

#### Создание проекта:
1. Нажмите "New Project"
2. Выберите "Deploy from GitHub repo"
3. Выберите ваш репозиторий
4. Выберите папку "server"

#### Настройка переменных:
В Railway Dashboard → Variables добавьте:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/edtech_ecosystem
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
CLIENT_URL=https://your-frontend.vercel.app
```

#### Получение URL:
После деплоя получите URL вида:
```
https://edtech-backend-production.railway.app
```

### 3️⃣ Vercel (Frontend)

#### Установка CLI:
```bash
npm install -g vercel
```

#### Вход в аккаунт:
```bash
vercel login
```

#### Деплой:
```bash
cd client
vercel --prod
```

#### Настройка переменных:
В Vercel Dashboard → Settings → Environment Variables:
```
REACT_APP_API_URL=https://your-backend.railway.app/api
REACT_APP_QUANTUM_AI_URL=https://your-backend.railway.app/api/quantum-ai
```

### 4️⃣ Домен (Опционально)

#### Freenom:
1. Перейдите на https://freenom.com
2. Зарегистрируйтесь
3. Выберите бесплатный домен (.tk, .ml, .ga)
4. Настройте DNS записи

#### DNS настройки:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## 🔧 Конфигурация

### Переменные окружения

#### Backend (Railway):
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
NODE_ENV=production
CLIENT_URL=https://your-frontend.vercel.app
PORT=5000
```

#### Frontend (Vercel):
```env
REACT_APP_API_URL=https://your-backend.railway.app/api
REACT_APP_QUANTUM_AI_URL=https://your-backend.railway.app/api/quantum-ai
REACT_APP_METAVERSE_URL=https://your-frontend.vercel.app/metaverse
REACT_APP_NEURAL_URL=https://your-frontend.vercel.app/neural
REACT_APP_HOLOGRAM_URL=https://your-frontend.vercel.app/hologram
REACT_APP_MENTORS_URL=https://your-frontend.vercel.app/mentors
REACT_APP_ANALYTICS_URL=https://your-frontend.vercel.app/analytics
```

## 📱 Доступные URL

После развертывания ваш проект будет доступен по адресам:

### Основные страницы:
- **Главная**: https://your-project.vercel.app
- **API**: https://your-backend.railway.app/api
- **Документация**: https://your-project.vercel.app/docs

### Демо-страницы:
- **3D Обучение**: https://your-project.vercel.app/3d
- **Метавселенная**: https://your-project.vercel.app/metaverse
- **Нейроинтерфейс**: https://your-project.vercel.app/neural
- **Голография**: https://your-project.vercel.app/hologram
- **Квантовые менторы**: https://your-project.vercel.app/mentors
- **Аналитика**: https://your-project.vercel.app/analytics

### API Endpoints:
- **Health Check**: https://your-backend.railway.app/api/health
- **Auth**: https://your-backend.railway.app/api/auth
- **Courses**: https://your-backend.railway.app/api/courses
- **Payments**: https://your-backend.railway.app/api/payments
- **Quantum AI**: https://your-backend.railway.app/api/quantum-ai

## ⚠️ Ограничения бесплатных планов

### Railway:
- ✅ 500 часов в месяц (≈ 16 часов в день)
- ✅ 512MB RAM
- ✅ 1GB диск
- ⚠️ Нет гарантии uptime
- ⚠️ Сон после неактивности

### Vercel:
- ✅ Безлимитные деплои
- ✅ CDN по всему миру
- ✅ Автоматический SSL
- ⚠️ Только статические сайты
- ⚠️ Ограничения на Server-Side Rendering

### MongoDB Atlas:
- ✅ 512MB диска
- ✅ 100 подключений
- ✅ Shared кластер
- ⚠️ Нет резервного копирования
- ⚠️ Ограниченная производительность

## 🔄 Обновление проекта

### Автоматическое обновление:
```bash
# Обновление кода
git pull origin main

# Пересборка и деплой
./deploy-free.sh
```

### Ручное обновление:
```bash
# Backend
cd server
railway up

# Frontend
cd client
vercel --prod
```

## 📊 Мониторинг

### Railway:
- Логи: Railway Dashboard → Deployments → Logs
- Метрики: Railway Dashboard → Metrics
- Переменные: Railway Dashboard → Variables

### Vercel:
- Логи: Vercel Dashboard → Functions → Logs
- Аналитика: Vercel Dashboard → Analytics
- Настройки: Vercel Dashboard → Settings

### MongoDB Atlas:
- Мониторинг: MongoDB Atlas → Monitoring
- Логи: MongoDB Atlas → Logs
- Алерты: MongoDB Atlas → Alerts

## 🆘 Устранение неполадок

### Проблемы с Railway:
```bash
# Проверка логов
railway logs

# Перезапуск сервиса
railway up

# Проверка переменных
railway variables
```

### Проблемы с Vercel:
```bash
# Проверка статуса
vercel ls

# Передеплой
vercel --prod

# Проверка логов
vercel logs
```

### Проблемы с MongoDB:
- Проверьте строку подключения
- Убедитесь что IP добавлен в whitelist
- Проверьте права пользователя

## 🎉 Готово!

Ваш EdTech Ecosystem успешно развернут на бесплатных платформах!

**Следующие шаги:**
1. Протестируйте все функции
2. Настройте мониторинг
3. Пригласите пользователей
4. Начните монетизацию!

**Поддержка:**
- GitHub Issues: https://github.com/your-repo/issues
- Email: support@edtech-ecosystem.com
- Telegram: @edtech_support

Удачи с вашим EdTech проектом! 🚀✨
