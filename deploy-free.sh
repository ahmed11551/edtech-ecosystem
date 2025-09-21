#!/bin/bash

# EdTech Ecosystem - Бесплатное развертывание
# Автоматический деплой на Vercel + Railway + MongoDB Atlas

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    log "Проверка предварительных требований..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js не установлен. Установите Node.js 16+ с https://nodejs.org"
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        error "npm не установлен. Установите npm"
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        error "Git не установлен. Установите Git"
    fi
    
    log "Предварительные требования выполнены ✓"
}

# Setup MongoDB Atlas
setup_mongodb() {
    log "Настройка MongoDB Atlas..."
    
    echo ""
    info "📋 ИНСТРУКЦИИ ДЛЯ MONGODB ATLAS:"
    echo "1. Перейдите на https://mongodb.com/atlas"
    echo "2. Создайте бесплатный аккаунт"
    echo "3. Создайте новый кластер (бесплатный M0)"
    echo "4. Создайте пользователя базы данных"
    echo "5. Получите строку подключения"
    echo ""
    
    read -p "Введите строку подключения MongoDB Atlas: " MONGODB_URI
    
    if [ -z "$MONGODB_URI" ]; then
        error "Строка подключения MongoDB обязательна"
    fi
    
    echo "MONGODB_URI=$MONGODB_URI" > .env.railway
    log "MongoDB Atlas настроен ✓"
}

# Setup Railway
setup_railway() {
    log "Настройка Railway..."
    
    echo ""
    info "📋 ИНСТРУКЦИИ ДЛЯ RAILWAY:"
    echo "1. Перейдите на https://railway.app"
    echo "2. Войдите через GitHub"
    echo "3. Создайте новый проект"
    echo "4. Подключите ваш GitHub репозиторий"
    echo "5. Выберите папку 'server' для бэкенда"
    echo ""
    
    read -p "Нажмите Enter когда Railway будет настроен..."
    
    # Add environment variables to Railway
    if [ -f ".env.railway" ]; then
        log "Добавление переменных окружения в Railway..."
        echo ""
        info "Добавьте эти переменные в Railway Dashboard:"
        cat .env.railway
        echo ""
        echo "JWT_SECRET=your-super-secret-jwt-key-$(date +%s)"
        echo "NODE_ENV=production"
        echo "CLIENT_URL=https://edtech-frontend.vercel.app"
        echo ""
    fi
    
    log "Railway настроен ✓"
}

# Setup Vercel
setup_vercel() {
    log "Настройка Vercel..."
    
    # Install Vercel CLI
    if ! command -v vercel &> /dev/null; then
        log "Установка Vercel CLI..."
        npm install -g vercel
    fi
    
    echo ""
    info "📋 ИНСТРУКЦИИ ДЛЯ VERCEL:"
    echo "1. Войдите в Vercel: vercel login"
    echo "2. Перейдите в папку client: cd client"
    echo "3. Запустите: vercel --prod"
    echo "4. Следуйте инструкциям на экране"
    echo ""
    
    read -p "Нажмите Enter когда Vercel будет настроен..."
    
    log "Vercel настроен ✓"
}

# Build and prepare
build_project() {
    log "Сборка проекта..."
    
    # Install dependencies
    log "Установка зависимостей..."
    npm install
    
    # Build frontend
    log "Сборка фронтенда..."
    cd client
    npm install
    npm run build
    cd ..
    
    # Copy demo files to build
    log "Копирование демо-файлов..."
    cp -r 3d-demo client/build/
    cp -r metaverse-worlds client/build/
    cp -r neural-interface client/build/
    cp -r holographic-projections client/build/
    cp -r quantum-mentors client/build/
    cp -r real-time-analytics client/build/
    cp -r nextgen-demo client/build/
    cp -r mvp_demo client/build/
    
    log "Проект собран ✓"
}

# Create deployment instructions
create_instructions() {
    log "Создание инструкций по развертыванию..."
    
    cat > DEPLOYMENT_INSTRUCTIONS.md << EOF
# 🚀 Инструкции по развертыванию EdTech Ecosystem

## ✅ Что уже настроено:
- ✅ Проект собран и готов к развертыванию
- ✅ Конфигурация для Vercel и Railway создана
- ✅ Демо-файлы скопированы

## 📋 Следующие шаги:

### 1. MongoDB Atlas (База данных)
1. Перейдите на https://mongodb.com/atlas
2. Создайте бесплатный аккаунт
3. Создайте кластер M0 (бесплатный)
4. Создайте пользователя базы данных
5. Получите строку подключения

### 2. Railway (Backend API)
1. Перейдите на https://railway.app
2. Войдите через GitHub
3. Создайте новый проект
4. Подключите репозиторий
5. Выберите папку 'server'
6. Добавьте переменные окружения:
   - MONGODB_URI=ваша-строка-подключения
   - JWT_SECRET=ваш-секретный-ключ
   - NODE_ENV=production
   - CLIENT_URL=https://ваш-фронтенд.vercel.app

### 3. Vercel (Frontend)
1. Установите Vercel CLI: npm install -g vercel
2. Перейдите в папку client: cd client
3. Войдите в Vercel: vercel login
4. Запустите деплой: vercel --prod
5. Следуйте инструкциям на экране

### 4. Настройка домена (опционально)
1. Перейдите на https://freenom.com
2. Зарегистрируйте бесплатный домен (.tk, .ml, .ga)
3. Настройте DNS записи в Vercel и Railway

## 🔗 После развертывания:
- Frontend: https://ваш-проект.vercel.app
- Backend API: https://ваш-проект.railway.app
- Демо-страницы:
  - 3D: https://ваш-проект.vercel.app/3d
  - Метавселенная: https://ваш-проект.vercel.app/metaverse
  - Нейроинтерфейс: https://ваш-проект.vercel.app/neural
  - Голография: https://ваш-проект.vercel.app/hologram
  - Квантовые менторы: https://ваш-проект.vercel.app/mentors
  - Аналитика: https://ваш-проект.vercel.app/analytics

## 💰 Стоимость: $0/месяц
- Vercel: Бесплатно
- Railway: 500 часов/месяц бесплатно
- MongoDB Atlas: 512MB бесплатно

## 🆘 Поддержка:
- GitHub Issues: https://github.com/your-repo/issues
- Email: support@edtech-ecosystem.com
- Telegram: @edtech_support

Удачи с развертыванием! 🚀
EOF

    log "Инструкции созданы в DEPLOYMENT_INSTRUCTIONS.md ✓"
}

# Main function
main() {
    log "🚀 Запуск бесплатного развертывания EdTech Ecosystem..."
    
    check_prerequisites
    setup_mongodb
    build_project
    setup_railway
    setup_vercel
    create_instructions
    
    log "✅ Настройка завершена!"
    echo ""
    info "📋 Следующие шаги:"
    echo "1. Прочитайте DEPLOYMENT_INSTRUCTIONS.md"
    echo "2. Следуйте инструкциям для каждого сервиса"
    echo "3. Ваш проект будет доступен бесплатно!"
    echo ""
    log "🎉 EdTech Ecosystem готов к развертыванию!"
}

# Handle arguments
case "${1:-}" in
    "mongodb")
        setup_mongodb
        ;;
    "railway")
        setup_railway
        ;;
    "vercel")
        setup_vercel
        ;;
    "build")
        build_project
        ;;
    *)
        main
        ;;
esac
