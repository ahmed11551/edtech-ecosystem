@echo off
title EdTech Ecosystem - GitHub Integration
color 0A

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    EdTech Ecosystem                         ║
echo ║              GitHub Integration & Deployment                ║
echo ║                       2025 год                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 🤔 ВЫБЕРИТЕ ДЕЙСТВИЕ:
echo.
echo 1️⃣ 🚀 Запустить локально
echo 2️⃣ 📤 Настроить GitHub и развернуть
echo 3️⃣ 🔄 Обновить существующий репозиторий
echo 4️⃣ 📚 Показать инструкции
echo 5️⃣ ❌ Выход
echo.

set /p choice="Введите номер (1-5): "

if "%choice%"=="1" goto local
if "%choice%"=="2" goto github
if "%choice%"=="3" goto update
if "%choice%"=="4" goto instructions
if "%choice%"=="5" goto exit
goto invalid

:local
echo.
echo 🚀 ЗАПУСК EdTech Ecosystem ЛОКАЛЬНО...
echo.

echo 📋 ПРОВЕРКА СИСТЕМЫ:
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Node.js установлен
) else (
    echo ❌ Node.js НЕ установлен
    echo    Скачайте с https://nodejs.org
    pause
    goto menu
)

echo.
echo 📦 Установка зависимостей сервера...
cd server
call npm install
if errorlevel 1 (
    echo ❌ Ошибка установки зависимостей сервера!
    pause
    goto menu
)

echo.
echo 📦 Установка зависимостей клиента...
cd ..\client
call npm install
if errorlevel 1 (
    echo ❌ Ошибка установки зависимостей клиента!
    pause
    goto menu
)

echo.
echo 🚀 Запуск сервера...
cd ..\server
start "EdTech Server" cmd /k "node index.js"

echo.
echo ⏳ Ожидание запуска сервера...
timeout /t 3 /nobreak > nul

echo.
echo 🌐 Запуск клиента...
cd ..\client
start "EdTech Client" cmd /k "npm start"

echo.
echo ✅ EdTech Ecosystem запущен!
echo.
echo 🌐 Откройте браузер и перейдите по адресу:
echo    http://localhost:3000
echo.
echo 🎮 Доступные демо:
echo    - Главная: http://localhost:3000
echo    - 3D Demo: http://localhost:3000/3d
echo    - Metaverse: http://localhost:3000/metaverse
echo    - Neural Interface: http://localhost:3000/neural
echo    - Hologram: http://localhost:3000/hologram
echo    - Quantum Mentors: http://localhost:3000/mentors
echo    - Analytics: http://localhost:3000/analytics
echo.
pause
goto menu

:github
echo.
echo 📤 НАСТРОЙКА GITHUB И РАЗВЕРТЫВАНИЕ...
echo.

echo 📋 ИНСТРУКЦИИ:
echo 1. Создайте репозиторий на GitHub
echo 2. Запустите github-setup.bat
echo 3. Настройте секреты (см. GITHUB_SECRETS.md)
echo 4. Автоматическое развертывание готово!
echo.

echo 🚀 Запустить github-setup.bat? (y/n)
set /p run_github="Введите y для запуска: "
if /i "%run_github%"=="y" (
    call github-setup.bat
)
pause
goto menu

:update
echo.
echo 🔄 ОБНОВЛЕНИЕ СУЩЕСТВУЮЩЕГО РЕПОЗИТОРИЯ...
echo.

echo 📝 Добавление изменений...
git add .

echo.
echo 💾 Коммит изменений...
set /p commit_msg="Введите сообщение коммита (или Enter для стандартного): "
if "%commit_msg%"=="" set commit_msg="🚀 Update EdTech Ecosystem 2025"

git commit -m "%commit_msg%"

echo.
echo 📤 Отправка в GitHub...
git push origin main

echo.
echo ✅ Репозиторий обновлен!
echo.
echo 🚀 Автоматическое развертывание запущено!
echo    Проверьте Actions в вашем репозитории на GitHub
echo.
pause
goto menu

:instructions
echo.
echo 📚 ИНСТРУКЦИИ ПО РАЗВЕРТЫВАНИЮ:
echo.
echo 🚀 ЛОКАЛЬНЫЙ ЗАПУСК:
echo 1. Выберите опцию 1 в этом меню
echo 2. Дождитесь установки зависимостей
echo 3. Откройте http://localhost:3000
echo.
echo 🌐 РАЗВЕРТЫВАНИЕ В ОБЛАКЕ:
echo 1. Создайте аккаунты на Vercel, Railway, MongoDB Atlas
echo 2. Запустите github-setup.bat
echo 3. Настройте секреты в GitHub
echo 4. Автоматическое развертывание при каждом push!
echo.
echo 📚 Подробные инструкции:
echo - README_FINAL.md - полное руководство
echo - GITHUB_SECRETS.md - настройка секретов
echo - FREE_DEPLOYMENT.md - бесплатное развертывание
echo - AUTO_DEPLOY.md - автоматическое развертывание
echo.
echo 💰 СТОИМОСТЬ: $0/месяц навсегда!
echo.
echo 🎯 ПРЕИМУЩЕСТВА GITHUB ИНТЕГРАЦИИ:
echo - Автоматическое развертывание при каждом push
echo - История изменений и версий
echo - Совместная работа с командой
echo - Бесплатный хостинг на GitHub Pages
echo - Интеграция с Vercel и Railway
echo.
pause
goto menu

:invalid
echo ❌ Неверный выбор! Попробуйте снова.
pause
goto menu

:menu
echo.
echo 🔄 Возврат в главное меню...
timeout /t 2 /nobreak > nul
goto start

:exit
echo.
echo 👋 До свидания! Удачи с EdTech Ecosystem!
echo.
pause
exit

:start
cls
goto :eof
