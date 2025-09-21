# 🔐 GitHub Secrets Configuration

## 📋 **НЕОБХОДИМЫЕ СЕКРЕТЫ**

Для автоматического развертывания необходимо добавить следующие секреты в GitHub:

### **1. Vercel Secrets**
- `VERCEL_TOKEN` - Токен Vercel
- `VERCEL_ORG_ID` - ID организации Vercel
- `VERCEL_PROJECT_ID` - ID проекта Vercel

### **2. Railway Secrets**
- `RAILWAY_TOKEN` - Токен Railway
- `RAILWAY_SERVICE_NAME` - Имя сервиса Railway

### **3. MongoDB Atlas**
- `MONGODB_URI` - Строка подключения к MongoDB Atlas

## 🚀 **КАК ДОБАВИТЬ СЕКРЕТЫ**

### **1. Перейдите в настройки репозитория**
1. Откройте ваш репозиторий на GitHub
2. Нажмите **Settings**
3. В левом меню выберите **Secrets and variables** > **Actions**

### **2. Добавьте каждый секрет**
1. Нажмите **New repository secret**
2. Введите **Name** (например, `VERCEL_TOKEN`)
3. Введите **Secret** (значение токена)
4. Нажмите **Add secret**

## 🔑 **ПОЛУЧЕНИЕ ТОКЕНОВ**

### **Vercel Token**
1. Перейдите на https://vercel.com
2. Войдите в аккаунт
3. Перейдите в **Settings** > **Tokens**
4. Создайте новый токен
5. Скопируйте токен

### **Vercel Org ID и Project ID**
1. В Vercel перейдите в **Settings** > **General**
2. Скопируйте **Team ID** (это Org ID)
3. В проекте перейдите в **Settings** > **General**
4. Скопируйте **Project ID**

### **Railway Token**
1. Перейдите на https://railway.app
2. Войдите в аккаунт
3. Перейдите в **Account** > **Settings** > **Tokens**
4. Создайте новый токен
5. Скопируйте токен

### **Railway Service Name**
1. В Railway создайте новый проект
2. Добавьте сервис
3. Скопируйте имя сервиса

### **MongoDB Atlas URI**
1. Перейдите на https://cloud.mongodb.com
2. Создайте кластер
3. Получите строку подключения
4. Замените `<password>` на пароль пользователя

## ✅ **ПРОВЕРКА НАСТРОЙКИ**

После добавления всех секретов:

1. Перейдите в **Actions** в вашем репозитории
2. Запустите workflow **Deploy EdTech Ecosystem**
3. Проверьте, что все шаги выполнены успешно

## 🎯 **РЕЗУЛЬТАТ**

После успешного развертывания ваш проект будет доступен:

- **Frontend**: https://your-project.vercel.app
- **Backend**: https://your-project.railway.app
- **GitHub Pages**: https://yourusername.github.io/edtech-ecosystem

## 🆘 **ПОМОЩЬ**

Если возникли проблемы:

1. Проверьте логи в **Actions**
2. Убедитесь, что все секреты добавлены правильно
3. Проверьте, что токены действительны
4. Обратитесь к документации Vercel и Railway

---

**🚀 Готово! Ваш EdTech Ecosystem автоматически развертывается при каждом push!**
