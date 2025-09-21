@echo off
title EdTech Ecosystem - Автоматический запуск
color 0A

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    EdTech Ecosystem                         ║
echo ║              Автоматический запуск проекта                  ║
echo ║                       2025 год                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 🚀 ПОДГОТОВКА К ЗАПУСКУ...
echo.

echo 📋 ПРОВЕРКА СИСТЕМЫ:
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Node.js установлен
) else (
    echo ❌ Node.js НЕ установлен
    echo    Скачайте с https://nodejs.org
    pause
    exit
)

REM Check Git
git --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Git установлен
) else (
    echo ❌ Git НЕ установлен
    echo    Скачайте с https://git-scm.com
    pause
    exit
)

REM Check Vercel CLI
vercel --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Vercel CLI установлен
) else (
    echo ⚠️  Vercel CLI не установлен
    echo    Устанавливаю...
    npm install -g vercel
    if %errorlevel% == 0 (
        echo ✅ Vercel CLI установлен
    ) else (
        echo ❌ Ошибка установки Vercel CLI
        pause
        exit
    )
)

echo.
echo 🎯 ВСЕ ГОТОВО К ЗАПУСКУ!
echo.

echo 📋 СЛЕДУЮЩИЕ ШАГИ:
echo.
echo 1️⃣ MongoDB Atlas (2 минуты):
echo    - Откройте https://mongodb.com/atlas
echo    - Создайте бесплатный аккаунт
echo    - Создайте кластер M0 (бесплатный)
echo    - Получите строку подключения
echo.

echo 2️⃣ Railway Backend (3 минуты):
echo    - Откройте https://railway.app
echo    - Войдите через GitHub
echo    - Создайте проект из репозитория
echo    - Выберите папку 'server'
echo    - Добавьте переменные окружения
echo.

echo 3️⃣ Vercel Frontend (3 минуты):
echo    - Войдите в Vercel: vercel login
echo    - Перейдите в папку client: cd client
echo    - Запустите деплой: vercel --prod
echo.

echo 4️⃣ Связывание сервисов (2 минуты):
echo    - Обновите URL в Railway и Vercel
echo.

echo 💰 СТОИМОСТЬ: $0/месяц навсегда!
echo.

echo 🎉 ВАШ ПРОЕКТ БУДЕТ ДОСТУПЕН ПО АДРЕСАМ:
echo    - Главная: https://your-frontend.vercel.app
echo    - API: https://your-backend.railway.app/api
echo    - 3D Demo: https://your-frontend.vercel.app/3d
echo    - Metaverse: https://your-frontend.vercel.app/metaverse
echo    - Neural Interface: https://your-frontend.vercel.app/neural
echo    - Hologram: https://your-frontend.vercel.app/hologram
echo    - Quantum Mentors: https://your-frontend.vercel.app/mentors
echo    - Analytics: https://your-frontend.vercel.app/analytics
echo.

echo 📚 ПОДРОБНЫЕ ИНСТРУКЦИИ:
echo    - Откройте AUTO_DEPLOY.md
echo    - Следуйте пошаговым инструкциям
echo.

echo 🚀 ГОТОВЫ НАЧИНАТЬ?
echo.
pause

echo.
echo 🎯 ЗАПУСК АВТОМАТИЧЕСКОЙ НАСТРОЙКИ...
echo.

REM Create .env file for Railway
echo MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/edtech_ecosystem > .env.railway
echo JWT_SECRET=edtech-super-secret-key-2025 >> .env.railway
echo NODE_ENV=production >> .env.railway
echo CLIENT_URL=https://your-frontend.vercel.app >> .env.railway

echo ✅ Файл .env.railway создан
echo.

REM Create .env file for Vercel
echo REACT_APP_API_URL=https://your-backend.railway.app/api > client\.env.local
echo REACT_APP_QUANTUM_AI_URL=https://your-backend.railway.app/api/quantum-ai >> client\.env.local
echo REACT_APP_METAVERSE_URL=https://your-frontend.vercel.app/metaverse >> client\.env.local
echo REACT_APP_NEURAL_URL=https://your-frontend.vercel.app/neural >> client\.env.local
echo REACT_APP_HOLOGRAM_URL=https://your-frontend.vercel.app/hologram >> client\.env.local
echo REACT_APP_MENTORS_URL=https://your-frontend.vercel.app/mentors >> client\.env.local
echo REACT_APP_ANALYTICS_URL=https://your-frontend.vercel.app/analytics >> client\.env.local

echo ✅ Файл client\.env.local создан
echo.

echo 🎉 ВСЕ ФАЙЛЫ ГОТОВЫ!
echo.

echo 📋 ТЕПЕРЬ СЛЕДУЙТЕ ИНСТРУКЦИЯМ:
echo    1. Откройте AUTO_DEPLOY.md
echo    2. Следуйте пошаговым инструкциям
echo    3. Ваш проект будет готов за 10 минут!
echo.

echo 🚀 УДАЧИ С РАЗВЕРТЫВАНИЕМ!
echo.

pause
