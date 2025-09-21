# Техническая архитектура EdTech Ecosystem Platform

## Обзор архитектуры

### Принципы проектирования
- **Микросервисная архитектура** - масштабируемость и независимость сервисов
- **API-First подход** - интеграция с внешними системами
- **Cloud-Native** - развертывание в облаке
- **AI-Driven** - интеграция ИИ на всех уровнях
- **Security by Design** - безопасность с самого начала

## Технологический стек

### Backend
- **Язык**: Python 3.11+ / Node.js 18+
- **Фреймворк**: FastAPI / Express.js
- **База данных**: PostgreSQL + Redis
- **Очереди**: RabbitMQ / Apache Kafka
- **Кэширование**: Redis Cluster
- **Поиск**: Elasticsearch

### Frontend
- **Web**: React 18 + TypeScript
- **Mobile**: React Native / Flutter
- **State Management**: Redux Toolkit / Zustand
- **UI Framework**: Material-UI / Ant Design
- **Build Tool**: Vite / Webpack

### AI/ML
- **ML Framework**: PyTorch / TensorFlow
- **MLOps**: MLflow / Kubeflow
- **Vector DB**: Pinecone / Weaviate
- **NLP**: spaCy / Transformers
- **Recommendation**: Apache Spark MLlib

### Infrastructure
- **Containerization**: Docker + Kubernetes
- **Cloud Provider**: Yandex Cloud / AWS
- **CDN**: CloudFlare
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack
- **CI/CD**: GitLab CI / GitHub Actions

## Архитектура системы

### 1. API Gateway
```
┌─────────────────┐
│   Load Balancer │
└─────────┬───────┘
          │
┌─────────▼───────┐
│   API Gateway   │
│   (Kong/Nginx)  │
└─────────┬───────┘
          │
    ┌─────┴─────┐
    │           │
┌───▼───┐   ┌───▼───┐
│ Auth  │   │ Rate  │
│Service│   │Limit  │
└───────┘   └───────┘
```

### 2. Микросервисы

#### User Management Service
- **Функции**: Регистрация, аутентификация, профили
- **Технологии**: FastAPI + PostgreSQL
- **API**: REST + GraphQL

#### Learning Service
- **Функции**: Курсы, уроки, прогресс
- **Технологии**: FastAPI + PostgreSQL + Redis
- **API**: REST + WebSocket

#### AI Recommendation Service
- **Функции**: Персонализация, рекомендации
- **Технологии**: Python + PyTorch + Redis
- **API**: gRPC

#### Content Management Service
- **Функции**: Загрузка, обработка, хранение контента
- **Технологии**: FastAPI + MinIO + FFmpeg
- **API**: REST

#### Analytics Service
- **Функции**: Сбор, обработка, визуализация данных
- **Технологии**: Python + ClickHouse + Grafana
- **API**: REST + WebSocket

#### Payment Service
- **Функции**: Платежи, подписки, биллинг
- **Технологии**: FastAPI + PostgreSQL + Stripe
- **API**: REST

#### Notification Service
- **Функции**: Email, SMS, Push, WebSocket
- **Технологии**: Node.js + Redis + SendGrid
- **API**: REST + WebSocket

### 3. База данных

#### PostgreSQL (Основная БД)
```sql
-- Пользователи
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Курсы
CREATE TABLE courses (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id UUID REFERENCES users(id),
    price DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Уроки
CREATE TABLE lessons (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    content JSONB,
    order_index INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Прогресс пользователей
CREATE TABLE user_progress (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    lesson_id UUID REFERENCES lessons(id),
    completed_at TIMESTAMP,
    score DECIMAL(5,2),
    time_spent INTEGER -- в секундах
);

-- Рекомендации
CREATE TABLE recommendations (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    course_id UUID REFERENCES courses(id),
    score DECIMAL(5,2),
    algorithm VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Redis (Кэш и сессии)
```redis
# Сессии пользователей
SETEX user:session:{user_id} 3600 {session_data}

# Кэш курсов
SETEX course:{course_id} 1800 {course_data}

# Рекомендации
SETEX recommendations:{user_id} 3600 {recommendations_json}

# Счетчики
INCR course:views:{course_id}
INCR user:lessons_completed:{user_id}
```

### 4. AI/ML Pipeline

#### Рекомендательная система
```python
# models/recommendation_model.py
import torch
import torch.nn as nn
from transformers import AutoModel

class RecommendationModel(nn.Module):
    def __init__(self, user_dim, course_dim, hidden_dim=128):
        super().__init__()
        self.user_embedding = nn.Embedding(user_dim, hidden_dim)
        self.course_embedding = nn.Embedding(course_dim, hidden_dim)
        self.fc = nn.Sequential(
            nn.Linear(hidden_dim * 2, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, 1),
            nn.Sigmoid()
        )
    
    def forward(self, user_ids, course_ids):
        user_emb = self.user_embedding(user_ids)
        course_emb = self.course_embedding(course_ids)
        combined = torch.cat([user_emb, course_emb], dim=1)
        return self.fc(combined)
```

#### Анализ контента
```python
# services/content_analysis.py
from transformers import pipeline
import spacy

class ContentAnalyzer:
    def __init__(self):
        self.sentiment_analyzer = pipeline("sentiment-analysis")
        self.nlp = spacy.load("ru_core_news_sm")
    
    def analyze_course_content(self, content):
        # Анализ сложности
        complexity = self._calculate_complexity(content)
        
        # Анализ тональности
        sentiment = self.sentiment_analyzer(content)
        
        # Извлечение ключевых слов
        keywords = self._extract_keywords(content)
        
        return {
            "complexity": complexity,
            "sentiment": sentiment,
            "keywords": keywords
        }
```

### 5. Frontend Architecture

#### React Application Structure
```
src/
├── components/          # Переиспользуемые компоненты
│   ├── ui/             # Базовые UI компоненты
│   ├── forms/          # Формы
│   └── charts/         # Графики и аналитика
├── pages/              # Страницы приложения
│   ├── auth/           # Авторизация
│   ├── dashboard/      # Дашборд
│   ├── courses/        # Курсы
│   └── profile/        # Профиль
├── hooks/              # Custom React hooks
├── services/           # API сервисы
├── store/              # State management
├── utils/              # Утилиты
└── types/              # TypeScript типы
```

#### State Management (Redux Toolkit)
```typescript
// store/slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface UserState {
  currentUser: User | null
  loading: boolean
  error: string | null
}

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId: string) => {
    const response = await api.get(`/users/${userId}`)
    return response.data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })
  }
})
```

### 6. Mobile App (React Native)

#### Навигация
```typescript
// navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Courses" component={CoursesScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
```

### 7. DevOps и Infrastructure

#### Docker Configuration
```dockerfile
# Dockerfile.backend
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```dockerfile
# Dockerfile.frontend
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
```

#### Kubernetes Deployment
```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend-api
  template:
    metadata:
      labels:
        app: backend-api
    spec:
      containers:
      - name: backend-api
        image: edtech/backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### 8. Monitoring и Observability

#### Prometheus Configuration
```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'backend-api'
    static_configs:
      - targets: ['backend-api:8000']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']
```

#### Grafana Dashboard
```json
{
  "dashboard": {
    "title": "EdTech Platform Metrics",
    "panels": [
      {
        "title": "API Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
          }
        ]
      },
      {
        "title": "Active Users",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(rate(user_sessions_total[5m]))"
          }
        ]
      }
    ]
  }
}
```

### 9. Security

#### Authentication & Authorization
```python
# auth/jwt_handler.py
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class JWTHandler:
    def __init__(self, secret_key: str):
        self.secret_key = secret_key
    
    def create_access_token(self, data: dict, expires_delta: timedelta = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm="HS256")
        return encoded_jwt
    
    def verify_token(self, token: str):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=["HS256"])
            return payload
        except jwt.PyJWTError:
            return None
```

#### Rate Limiting
```python
# middleware/rate_limiter.py
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    # Применяем лимиты на основе пользователя и эндпоинта
    if request.url.path.startswith("/api/v1/learning"):
        # Более строгие лимиты для обучения
        pass
    return await call_next(request)
```

### 10. Performance Optimization

#### Database Optimization
```sql
-- Индексы для оптимизации запросов
CREATE INDEX idx_user_progress_user_lesson ON user_progress(user_id, lesson_id);
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_lessons_course_order ON lessons(course_id, order_index);
CREATE INDEX idx_recommendations_user ON recommendations(user_id, score DESC);

-- Партиционирование таблицы прогресса по дате
CREATE TABLE user_progress_2024 PARTITION OF user_progress
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

#### Caching Strategy
```python
# services/cache_service.py
import redis
from typing import Optional, Any
import json

class CacheService:
    def __init__(self, redis_client: redis.Redis):
        self.redis = redis_client
    
    async def get_course(self, course_id: str) -> Optional[dict]:
        cached = await self.redis.get(f"course:{course_id}")
        if cached:
            return json.loads(cached)
        return None
    
    async def set_course(self, course_id: str, course_data: dict, ttl: int = 1800):
        await self.redis.setex(
            f"course:{course_id}",
            ttl,
            json.dumps(course_data)
        )
    
    async def get_recommendations(self, user_id: str) -> Optional[list]:
        cached = await self.redis.get(f"recommendations:{user_id}")
        if cached:
            return json.loads(cached)
        return None
```

## Масштабирование

### Горизонтальное масштабирование
- **API Gateway**: Load Balancer + Multiple Instances
- **Микросервисы**: Kubernetes HPA (Horizontal Pod Autoscaler)
- **База данных**: Read Replicas + Sharding
- **Кэш**: Redis Cluster

### Вертикальное масштабирование
- **CPU**: До 8 cores на сервис
- **Memory**: До 16GB на сервис
- **Storage**: SSD с высокой производительностью

### CDN и Global Distribution
- **Static Assets**: CloudFlare CDN
- **API**: Multi-region deployment
- **Database**: Read replicas в разных регионах

## Заключение

Предложенная архитектура обеспечивает:
- **Высокую производительность** через кэширование и оптимизацию
- **Масштабируемость** через микросервисы и Kubernetes
- **Надежность** через мониторинг и автоматическое восстановление
- **Безопасность** через современные практики аутентификации
- **Гибкость** через API-first подход и модульность

Архитектура готова к росту от 10,000 до 1,000,000 пользователей с минимальными изменениями.
