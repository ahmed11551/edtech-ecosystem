# 🚀 EdTech Ecosystem MVP - Инструкция по запуску

## Обзор

Это полноценный MVP (Minimum Viable Product) для EdTech Ecosystem Platform - образовательной платформы с ИИ-персонализацией.

## 🏗️ Архитектура

```
edtech-ecosystem-mvp/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── pages/         # Страницы приложения
│   │   ├── contexts/      # React Context (Auth, Theme)
│   │   ├── services/      # API сервисы
│   │   └── styles/        # CSS стили
│   └── package.json
├── server/                # Node.js Backend
│   ├── models/           # MongoDB модели
│   ├── routes/           # API маршруты
│   ├── middleware/       # Middleware функции
│   └── package.json
└── package.json          # Root package.json
```

## 🛠️ Технологический стек

### Backend
- **Node.js** + **Express.js** - серверная часть
- **MongoDB** + **Mongoose** - база данных
- **Redis** - кэширование
- **JWT** - аутентификация
- **bcryptjs** - хеширование паролей

### Frontend
- **React 18** - UI библиотека
- **React Router** - маршрутизация
- **React Query** - управление состоянием сервера
- **Framer Motion** - анимации
- **Styled Components** - стилизация
- **React Hook Form** - формы

## 📋 Предварительные требования

- **Node.js** 18+ 
- **MongoDB** 5.0+
- **Redis** 6.0+
- **Git**

## 🚀 Быстрый старт

### 1. Клонирование и установка

```bash
# Клонировать репозиторий
git clone <repository-url>
cd edtech-ecosystem-mvp

# Установить зависимости для всех частей
npm run install-all
```

### 2. Настройка окружения

Создайте файл `.env` в папке `server/`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/edtech-ecosystem
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Client
CLIENT_URL=http://localhost:3000
```

### 3. Запуск базы данных

```bash
# Запустить MongoDB (если не запущен)
mongod

# Запустить Redis (если не запущен)
redis-server
```

### 4. Запуск приложения

```bash
# Запустить backend и frontend одновременно
npm run dev

# Или запустить отдельно:
# Backend (порт 5000)
npm run server

# Frontend (порт 3000)
npm run client
```

### 5. Открыть приложение

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📁 Структура проекта

### Backend (server/)

#### Модели данных
- **User** - пользователи системы
- **Course** - курсы и образовательные программы
- **Lesson** - уроки в рамках курсов
- **Progress** - прогресс обучения пользователей

#### API Endpoints

**Аутентификация** (`/api/auth`)
- `POST /register` - регистрация пользователя
- `POST /login` - вход в систему
- `GET /me` - получение текущего пользователя
- `PUT /profile` - обновление профиля
- `PUT /password` - смена пароля

**Курсы** (`/api/courses`)
- `GET /` - список курсов
- `GET /:id` - детали курса
- `POST /` - создание курса (только инструкторы)
- `PUT /:id` - обновление курса
- `POST /:id/enroll` - запись на курс

**Уроки** (`/api/lessons`)
- `GET /` - список уроков курса
- `GET /:id` - детали урока
- `POST /` - создание урока
- `PUT /:id` - обновление урока

**Прогресс** (`/api/progress`)
- `GET /` - прогресс пользователя
- `PUT /:lessonId` - обновление прогресса
- `POST /:lessonId/complete` - отметка о завершении

### Frontend (client/)

#### Основные страницы
- **Home** - главная страница с популярными курсами
- **Login/Register** - аутентификация
- **Dashboard** - личный кабинет пользователя
- **Courses** - каталог курсов
- **CourseDetail** - детали курса
- **Lesson** - просмотр урока
- **Profile** - профиль пользователя

#### Компоненты
- **Navbar** - навигационное меню
- **Footer** - подвал сайта
- **CourseCard** - карточка курса
- **ProgressBar** - индикатор прогресса

## 🔧 Разработка

### Добавление новых функций

1. **Backend**: Создайте модель, маршруты и контроллеры
2. **Frontend**: Создайте компоненты и страницы
3. **API**: Обновите сервисы в `client/src/services/api.js`

### Структура API запросов

```javascript
// Пример использования API
import { coursesAPI } from './services/api';

// Получить список курсов
const courses = await coursesAPI.getCourses();

// Создать новый курс
const newCourse = await coursesAPI.createCourse({
  title: 'Новый курс',
  description: 'Описание курса',
  price: 1000
});
```

## 🧪 Тестирование

```bash
# Запустить тесты backend
cd server
npm test

# Запустить тесты frontend
cd client
npm test
```

## 📦 Сборка для продакшена

```bash
# Собрать frontend
npm run build

# Запустить в продакшене
npm start
```

## 🐳 Docker (опционально)

```bash
# Создать Docker образы
docker build -t edtech-frontend ./client
docker build -t edtech-backend ./server

# Запустить с Docker Compose
docker-compose up -d
```

## 🔍 Мониторинг и отладка

### Логи
- Backend логи выводятся в консоль
- Frontend ошибки в React DevTools
- API запросы в Network tab браузера

### База данных
```bash
# Подключиться к MongoDB
mongo edtech-ecosystem

# Подключиться к Redis
redis-cli
```

## 🚨 Решение проблем

### Частые ошибки

1. **MongoDB не запущен**
   ```bash
   mongod --dbpath /path/to/your/db
   ```

2. **Redis не запущен**
   ```bash
   redis-server
   ```

3. **Порт занят**
   - Измените PORT в .env файле
   - Или убейте процесс: `lsof -ti:5000 | xargs kill -9`

4. **CORS ошибки**
   - Проверьте CLIENT_URL в .env
   - Убедитесь что frontend запущен на правильном порту

### Отладка

```bash
# Проверить статус сервисов
curl http://localhost:5000/api/health

# Проверить подключение к MongoDB
mongo --eval "db.runCommand({ping: 1})"

# Проверить подключение к Redis
redis-cli ping
```

## 📈 Производительность

### Оптимизация
- Используйте React.memo для компонентов
- Реализуйте виртуализацию для больших списков
- Добавьте кэширование в Redis
- Используйте CDN для статических файлов

### Мониторинг
- Добавьте метрики в Prometheus
- Настройте логирование в ELK Stack
- Используйте APM инструменты

## 🔐 Безопасность

### Рекомендации
- Используйте HTTPS в продакшене
- Настройте CORS правильно
- Валидируйте все входные данные
- Используйте rate limiting
- Регулярно обновляйте зависимости

## 📚 Документация API

После запуска сервера, API документация доступна по адресу:
- Swagger UI: http://localhost:5000/api-docs
- OpenAPI JSON: http://localhost:5000/api-docs.json

## 🤝 Вклад в проект

1. Создайте feature branch
2. Внесите изменения
3. Добавьте тесты
4. Создайте Pull Request

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи в консоли
2. Убедитесь что все сервисы запущены
3. Проверьте настройки в .env файле
4. Создайте issue в репозитории

---

## 🎉 Готово!

Теперь у вас есть полнофункциональный MVP EdTech платформы! 

**Следующие шаги:**
1. Настройте продакшен окружение
2. Добавьте больше функций
3. Интегрируйте платежную систему
4. Добавьте ИИ-рекомендации
5. Масштабируйте инфраструктуру

Удачной разработки! 🚀
