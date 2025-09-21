#!/bin/bash

# EdTech Ecosystem - Автоматический запуск
# Максимально простой процесс развертывания

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Clear screen
clear

echo -e "${CYAN}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    EdTech Ecosystem                         ║"
echo "║              Автоматический запуск проекта                  ║"
echo "║                       2025 год                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${GREEN}🚀 ПОДГОТОВКА К ЗАПУСКУ...${NC}"
echo

echo -e "${BLUE}📋 ПРОВЕРКА СИСТЕМЫ:${NC}"
echo

# Check Node.js
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js установлен${NC}"
else
    echo -e "${RED}❌ Node.js НЕ установлен${NC}"
    echo -e "${YELLOW}   Скачайте с https://nodejs.org${NC}"
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    echo -e "${GREEN}✅ Git установлен${NC}"
else
    echo -e "${RED}❌ Git НЕ установлен${NC}"
    echo -e "${YELLOW}   Скачайте с https://git-scm.com${NC}"
    exit 1
fi

# Check Vercel CLI
if command -v vercel &> /dev/null; then
    echo -e "${GREEN}✅ Vercel CLI установлен${NC}"
else
    echo -e "${YELLOW}⚠️  Vercel CLI не установлен${NC}"
    echo -e "${BLUE}   Устанавливаю...${NC}"
    npm install -g vercel
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Vercel CLI установлен${NC}"
    else
        echo -e "${RED}❌ Ошибка установки Vercel CLI${NC}"
        exit 1
    fi
fi

echo
echo -e "${GREEN}🎯 ВСЕ ГОТОВО К ЗАПУСКУ!${NC}"
echo

echo -e "${BLUE}📋 СЛЕДУЮЩИЕ ШАГИ:${NC}"
echo
echo -e "${PURPLE}1️⃣ MongoDB Atlas (2 минуты):${NC}"
echo "   - Откройте https://mongodb.com/atlas"
echo "   - Создайте бесплатный аккаунт"
echo "   - Создайте кластер M0 (бесплатный)"
echo "   - Получите строку подключения"
echo

echo -e "${PURPLE}2️⃣ Railway Backend (3 минуты):${NC}"
echo "   - Откройте https://railway.app"
echo "   - Войдите через GitHub"
echo "   - Создайте проект из репозитория"
echo "   - Выберите папку 'server'"
echo "   - Добавьте переменные окружения"
echo

echo -e "${PURPLE}3️⃣ Vercel Frontend (3 минуты):${NC}"
echo "   - Войдите в Vercel: vercel login"
echo "   - Перейдите в папку client: cd client"
echo "   - Запустите деплой: vercel --prod"
echo

echo -e "${PURPLE}4️⃣ Связывание сервисов (2 минуты):${NC}"
echo "   - Обновите URL в Railway и Vercel"
echo

echo -e "${GREEN}💰 СТОИМОСТЬ: \$0/месяц навсегда!${NC}"
echo

echo -e "${CYAN}🎉 ВАШ ПРОЕКТ БУДЕТ ДОСТУПЕН ПО АДРЕСАМ:${NC}"
echo "   - Главная: https://your-frontend.vercel.app"
echo "   - API: https://your-backend.railway.app/api"
echo "   - 3D Demo: https://your-frontend.vercel.app/3d"
echo "   - Metaverse: https://your-frontend.vercel.app/metaverse"
echo "   - Neural Interface: https://your-frontend.vercel.app/neural"
echo "   - Hologram: https://your-frontend.vercel.app/hologram"
echo "   - Quantum Mentors: https://your-frontend.vercel.app/mentors"
echo "   - Analytics: https://your-frontend.vercel.app/analytics"
echo

echo -e "${BLUE}📚 ПОДРОБНЫЕ ИНСТРУКЦИИ:${NC}"
echo "   - Откройте AUTO_DEPLOY.md"
echo "   - Следуйте пошаговым инструкциям"
echo

echo -e "${GREEN}🚀 ГОТОВЫ НАЧИНАТЬ?${NC}"
echo
read -p "Нажмите Enter для продолжения..."

echo
echo -e "${YELLOW}🎯 ЗАПУСК АВТОМАТИЧЕСКОЙ НАСТРОЙКИ...${NC}"
echo

# Create .env file for Railway
cat > .env.railway << EOF
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/edtech_ecosystem
JWT_SECRET=edtech-super-secret-key-2025
NODE_ENV=production
CLIENT_URL=https://your-frontend.vercel.app
EOF

echo -e "${GREEN}✅ Файл .env.railway создан${NC}"
echo

# Create .env file for Vercel
mkdir -p client
cat > client/.env.local << EOF
REACT_APP_API_URL=https://your-backend.railway.app/api
REACT_APP_QUANTUM_AI_URL=https://your-backend.railway.app/api/quantum-ai
REACT_APP_METAVERSE_URL=https://your-frontend.vercel.app/metaverse
REACT_APP_NEURAL_URL=https://your-frontend.vercel.app/neural
REACT_APP_HOLOGRAM_URL=https://your-frontend.vercel.app/hologram
REACT_APP_MENTORS_URL=https://your-frontend.vercel.app/mentors
REACT_APP_ANALYTICS_URL=https://your-frontend.vercel.app/analytics
EOF

echo -e "${GREEN}✅ Файл client/.env.local создан${NC}"
echo

echo -e "${GREEN}🎉 ВСЕ ФАЙЛЫ ГОТОВЫ!${NC}"
echo

echo -e "${BLUE}📋 ТЕПЕРЬ СЛЕДУЙТЕ ИНСТРУКЦИЯМ:${NC}"
echo "   1. Откройте AUTO_DEPLOY.md"
echo "   2. Следуйте пошаговым инструкциям"
echo "   3. Ваш проект будет готов за 10 минут!"
echo

echo -e "${GREEN}🚀 УДАЧИ С РАЗВЕРТЫВАНИЕМ!${NC}"
echo
