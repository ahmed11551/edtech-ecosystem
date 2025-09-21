# 🚀 EdTech Ecosystem - Руководство по развертыванию

Полное руководство по развертыванию EdTech Ecosystem на production сервере.

## 📋 Содержание

- [Требования](#требования)
- [Быстрый старт](#быстрый-старт)
- [Подробная настройка](#подробная-настройка)
- [Мониторинг](#мониторинг)
- [Безопасность](#безопасность)
- [Резервное копирование](#резервное-копирование)
- [Устранение неполадок](#устранение-неполадок)

## 🔧 Требования

### Минимальные требования сервера:
- **CPU**: 4 ядра
- **RAM**: 8 GB
- **Диск**: 100 GB SSD
- **ОС**: Ubuntu 20.04+ / CentOS 8+ / Debian 11+

### Программное обеспечение:
- Docker 20.10+
- Docker Compose 2.0+
- Git
- Nginx (опционально, если не используете Docker)
- SSL сертификаты

## ⚡ Быстрый старт

### 1. Клонирование репозитория
```bash
git clone https://github.com/your-username/edtech-ecosystem.git
cd edtech-ecosystem
```

### 2. Настройка переменных окружения
```bash
cp env.production.example .env.production
nano .env.production  # Настройте под ваши нужды
```

### 3. Запуск развертывания
```bash
chmod +x deploy.sh
./deploy.sh
```

### 4. Проверка статуса
```bash
./deploy.sh status
```

## 🔧 Подробная настройка

### 1. Установка Docker и Docker Compose

#### Ubuntu/Debian:
```bash
# Обновление пакетов
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Перезагрузка для применения изменений
sudo reboot
```

#### CentOS/RHEL:
```bash
# Установка Docker
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
sudo systemctl enable docker

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Настройка переменных окружения

Создайте файл `.env.production` на основе `env.production.example`:

```bash
cp env.production.example .env.production
```

**Обязательные настройки:**
- `DOMAIN_NAME` - ваш домен
- `MONGO_ROOT_PASSWORD` - пароль для MongoDB
- `REDIS_PASSWORD` - пароль для Redis
- `JWT_SECRET` - секретный ключ для JWT
- `GRAFANA_PASSWORD` - пароль для Grafana

**Платежные системы (опционально):**
- Настройте ключи для ЮKassa, Сбербанк, Тинькофф и других

### 3. Настройка SSL сертификатов

#### Автоматические сертификаты (Let's Encrypt):
```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot certonly --standalone -d your-domain.com

# Копирование сертификатов
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ./ssl/key.pem
```

#### Самоподписанные сертификаты (для тестирования):
```bash
mkdir -p ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/key.pem \
    -out ssl/cert.pem \
    -subj "/C=RU/ST=Moscow/L=Moscow/O=EdTech Ecosystem/CN=your-domain.com"
```

### 4. Запуск сервисов

```bash
# Запуск всех сервисов
docker-compose up -d

# Проверка статуса
docker-compose ps

# Просмотр логов
docker-compose logs -f
```

## 📊 Мониторинг

### Доступные сервисы мониторинга:

- **Grafana**: http://your-domain.com:3001
  - Логин: admin
  - Пароль: из переменной GRAFANA_PASSWORD

- **Prometheus**: http://your-domain.com:9090
  - Метрики и мониторинг производительности

- **Kibana**: http://your-domain.com:5601
  - Анализ логов и поиск

- **Elasticsearch**: http://your-domain.com:9200
  - Хранение и индексация логов

### Настройка алертов:

1. Откройте Grafana
2. Перейдите в Alerting → Alert Rules
3. Создайте правила для:
   - Высокая загрузка CPU
   - Недостаток памяти
   - Ошибки в логах
   - Недоступность сервисов

## 🔒 Безопасность

### 1. Настройка файрвола

```bash
# UFW (Ubuntu)
sudo ufw enable
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3001/tcp  # Grafana (опционально)

# iptables (CentOS)
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 3001 -j ACCEPT
sudo iptables-save > /etc/iptables/rules.v4
```

### 2. Настройка fail2ban

```bash
# Установка
sudo apt install fail2ban

# Конфигурация
sudo nano /etc/fail2ban/jail.local
```

Добавьте:
```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
```

### 3. Регулярные обновления

```bash
# Создание скрипта обновления
sudo nano /usr/local/bin/update-edtech.sh
```

```bash
#!/bin/bash
cd /path/to/edtech-ecosystem
git pull origin main
docker-compose pull
docker-compose up -d
docker system prune -f
```

```bash
sudo chmod +x /usr/local/bin/update-edtech.sh

# Добавление в cron
echo "0 2 * * 0 /usr/local/bin/update-edtech.sh" | sudo crontab -
```

## 💾 Резервное копирование

### 1. Автоматическое резервное копирование

```bash
# Создание скрипта резервного копирования
sudo nano /usr/local/bin/backup-edtech.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/edtech-ecosystem"
DATE=$(date +%Y%m%d-%H%M%S)

# Создание директории
mkdir -p $BACKUP_DIR

# Резервное копирование базы данных
docker exec edtech-mongodb mongodump --out /backup --gzip
docker cp edtech-mongodb:/backup $BACKUP_DIR/mongodb-$DATE

# Резервное копирование Redis
docker exec edtech-redis redis-cli BGSAVE
docker cp edtech-redis:/data $BACKUP_DIR/redis-$DATE

# Резервное копирование файлов
tar -czf $BACKUP_DIR/files-$DATE.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=logs \
    /path/to/edtech-ecosystem

# Удаление старых резервных копий (старше 30 дней)
find $BACKUP_DIR -type d -mtime +30 -exec rm -rf {} \;
```

```bash
sudo chmod +x /usr/local/bin/backup-edtech.sh

# Добавление в cron (ежедневно в 3:00)
echo "0 3 * * * /usr/local/bin/backup-edtech.sh" | sudo crontab -
```

### 2. Восстановление из резервной копии

```bash
# Остановка сервисов
docker-compose down

# Восстановление базы данных
docker cp /var/backups/edtech-ecosystem/mongodb-YYYYMMDD-HHMMSS edtech-mongodb:/backup
docker exec edtech-mongodb mongorestore --gzip /backup

# Восстановление Redis
docker cp /var/backups/edtech-ecosystem/redis-YYYYMMDD-HHMMSS edtech-redis:/data

# Запуск сервисов
docker-compose up -d
```

## 🔧 Устранение неполадок

### Частые проблемы:

#### 1. Сервисы не запускаются
```bash
# Проверка логов
docker-compose logs [service-name]

# Проверка статуса
docker-compose ps

# Перезапуск сервиса
docker-compose restart [service-name]
```

#### 2. Проблемы с базой данных
```bash
# Проверка подключения к MongoDB
docker exec -it edtech-mongodb mongo --eval "db.adminCommand('ismaster')"

# Проверка подключения к Redis
docker exec -it edtech-redis redis-cli ping
```

#### 3. Проблемы с SSL
```bash
# Проверка сертификатов
openssl x509 -in ssl/cert.pem -text -noout

# Проверка конфигурации Nginx
docker exec -it edtech-nginx nginx -t
```

#### 4. Высокая загрузка
```bash
# Мониторинг ресурсов
docker stats

# Очистка неиспользуемых ресурсов
docker system prune -a
```

### Полезные команды:

```bash
# Просмотр логов в реальном времени
docker-compose logs -f

# Выполнение команд в контейнере
docker exec -it [container-name] /bin/bash

# Перезапуск всех сервисов
docker-compose restart

# Обновление образов
docker-compose pull
docker-compose up -d

# Очистка системы
docker system prune -a
docker volume prune
```

## 📞 Поддержка

Если у вас возникли проблемы:

1. Проверьте логи: `docker-compose logs -f`
2. Проверьте статус: `./deploy.sh status`
3. Создайте issue в GitHub
4. Обратитесь в поддержку: support@edtech-ecosystem.com

## 🎉 Готово!

Ваш EdTech Ecosystem успешно развернут и готов к использованию!

**Доступные URL:**
- 🌐 **Основной сайт**: https://your-domain.com
- 📊 **Grafana**: http://your-domain.com:3001
- 📈 **Prometheus**: http://your-domain.com:9090
- 🔍 **Kibana**: http://your-domain.com:5601

**Следующие шаги:**
1. Настройте домен и DNS
2. Настройте мониторинг и алерты
3. Настройте резервное копирование
4. Протестируйте все функции
5. Пригласите пользователей! 🚀
