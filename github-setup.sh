#!/bin/bash

echo "🚀 EdTech Ecosystem - GitHub Setup"
echo "================================="

echo ""
echo "📁 Инициализация Git репозитория..."
git init

echo ""
echo "📝 Добавление всех файлов..."
git add .

echo ""
echo "💾 Первый коммит..."
git commit -m "🚀 Initial commit: EdTech Ecosystem 2025"

echo ""
echo "🌐 Настройка удаленного репозитория..."
echo ""
echo "📋 ИНСТРУКЦИИ:"
echo "1. Перейдите на https://github.com"
echo "2. Создайте новый репозиторий: edtech-ecosystem"
echo "3. Скопируйте URL репозитория"
echo "4. Вставьте URL ниже и нажмите Enter"
echo ""
read -p "Введите URL репозитория: " REPO_URL

echo ""
echo "🔗 Подключение к GitHub..."
git remote add origin $REPO_URL

echo ""
echo "📤 Отправка в GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ ГОТОВО! Репозиторий создан и настроен!"
echo ""
echo "🎯 СЛЕДУЮЩИЕ ШАГИ:"
echo "1. Перейдите в настройки репозитория на GitHub"
echo "2. Включите GitHub Pages в разделе Pages"
echo "3. Настройте Vercel и Railway для автоматического развертывания"
echo "4. Добавьте секреты в Settings > Secrets and variables > Actions"
echo ""
echo "📚 Подробные инструкции в README.md"
echo ""
