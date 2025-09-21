@echo off
echo 🚀 EdTech Ecosystem - Бесплатное развертывание
echo ================================================

echo.
echo 📋 ИНСТРУКЦИИ ДЛЯ РАЗВЕРТЫВАНИЯ:
echo.

echo 1️⃣ MONGODB ATLAS (База данных):
echo    - Перейдите на https://mongodb.com/atlas
echo    - Создайте бесплатный аккаунт
echo    - Создайте кластер M0 (бесплатный)
echo    - Получите строку подключения
echo.

echo 2️⃣ RAILWAY (Backend API):
echo    - Перейдите на https://railway.app
echo    - Войдите через GitHub
echo    - Создайте новый проект
echo    - Подключите репозиторий
echo    - Выберите папку 'server'
echo.

echo 3️⃣ VERCEL (Frontend):
echo    - Установите Vercel CLI: npm install -g vercel
echo    - Перейдите в папку client: cd client
echo    - Войдите в Vercel: vercel login
echo    - Запустите деплой: vercel --prod
echo.

echo 4️⃣ ДОМЕН (Опционально):
echo    - Перейдите на https://freenom.com
echo    - Зарегистрируйте бесплатный домен
echo    - Настройте DNS записи
echo.

echo 💰 СТОИМОСТЬ: $0/месяц
echo.

echo 📁 Файлы готовы к развертыванию:
echo    - vercel.json (конфигурация Vercel)
echo    - railway.json (конфигурация Railway)
echo    - deploy-free.sh (скрипт для Linux/Mac)
echo    - FREE_DEPLOYMENT.md (подробные инструкции)
echo.

echo 🎉 Готово! Следуйте инструкциям выше.
echo.

pause
