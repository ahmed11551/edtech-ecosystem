#!/bin/bash

# EdTech Ecosystem Deployment Script
# Автоматическое развертывание на production сервер

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="edtech-ecosystem"
DOCKER_COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env.production"
BACKUP_DIR="/var/backups/edtech-ecosystem"
LOG_FILE="/var/log/edtech-deployment.log"

# Functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" | tee -a $LOG_FILE
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}" | tee -a $LOG_FILE
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}" | tee -a $LOG_FILE
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        error "This script should not be run as root for security reasons"
    fi
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed. Please install Docker first."
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed. Please install Docker Compose first."
    fi
    
    # Check if .env file exists
    if [ ! -f "$ENV_FILE" ]; then
        error "Environment file $ENV_FILE not found. Please create it first."
    fi
    
    log "Prerequisites check passed ✓"
}

# Create backup
create_backup() {
    log "Creating backup..."
    
    # Create backup directory
    sudo mkdir -p $BACKUP_DIR
    
    # Backup database
    if docker ps | grep -q "edtech-mongodb"; then
        log "Backing up MongoDB..."
        docker exec edtech-mongodb mongodump --out /backup --gzip
        docker cp edtech-mongodb:/backup $BACKUP_DIR/mongodb-$(date +%Y%m%d-%H%M%S)
    fi
    
    # Backup Redis
    if docker ps | grep -q "edtech-redis"; then
        log "Backing up Redis..."
        docker exec edtech-redis redis-cli BGSAVE
        docker cp edtech-redis:/data $BACKUP_DIR/redis-$(date +%Y%m%d-%H%M%S)
    fi
    
    # Backup application files
    log "Backing up application files..."
    sudo tar -czf $BACKUP_DIR/app-$(date +%Y%m%d-%H%M%S).tar.gz \
        --exclude=node_modules \
        --exclude=.git \
        --exclude=logs \
        .
    
    log "Backup completed ✓"
}

# Pull latest code
pull_code() {
    log "Pulling latest code..."
    
    # Check if we're in a git repository
    if [ -d ".git" ]; then
        git fetch origin
        git reset --hard origin/main
        log "Code updated ✓"
    else
        warning "Not a git repository, skipping code pull"
    fi
}

# Build and deploy
deploy() {
    log "Starting deployment..."
    
    # Stop existing containers
    log "Stopping existing containers..."
    docker-compose -f $DOCKER_COMPOSE_FILE down --remove-orphans
    
    # Build new images
    log "Building Docker images..."
    docker-compose -f $DOCKER_COMPOSE_FILE build --no-cache
    
    # Start services
    log "Starting services..."
    docker-compose -f $DOCKER_COMPOSE_FILE up -d
    
    # Wait for services to be ready
    log "Waiting for services to be ready..."
    sleep 30
    
    # Health check
    log "Performing health checks..."
    
    # Check backend
    if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
        log "Backend health check passed ✓"
    else
        error "Backend health check failed"
    fi
    
    # Check frontend
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        log "Frontend health check passed ✓"
    else
        error "Frontend health check failed"
    fi
    
    # Check nginx
    if curl -f http://localhost/health > /dev/null 2>&1; then
        log "Nginx health check passed ✓"
    else
        error "Nginx health check failed"
    fi
    
    log "Deployment completed successfully ✓"
}

# Setup SSL certificates
setup_ssl() {
    log "Setting up SSL certificates..."
    
    # Create SSL directory
    sudo mkdir -p /etc/nginx/ssl
    
    # Check if certificates exist
    if [ ! -f "/etc/nginx/ssl/cert.pem" ] || [ ! -f "/etc/nginx/ssl/key.pem" ]; then
        warning "SSL certificates not found. Generating self-signed certificates..."
        
        # Generate self-signed certificate
        sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout /etc/nginx/ssl/key.pem \
            -out /etc/nginx/ssl/cert.pem \
            -subj "/C=RU/ST=Moscow/L=Moscow/O=EdTech Ecosystem/CN=edtech-ecosystem.com"
        
        log "Self-signed SSL certificates generated ✓"
    else
        log "SSL certificates already exist ✓"
    fi
}

# Setup monitoring
setup_monitoring() {
    log "Setting up monitoring..."
    
    # Create monitoring directories
    sudo mkdir -p /var/log/edtech
    sudo mkdir -p /var/www/static
    
    # Set permissions
    sudo chown -R $USER:$USER /var/log/edtech
    sudo chown -R $USER:$USER /var/www/static
    
    log "Monitoring setup completed ✓"
}

# Cleanup old images
cleanup() {
    log "Cleaning up old Docker images..."
    
    # Remove unused images
    docker image prune -f
    
    # Remove unused volumes
    docker volume prune -f
    
    log "Cleanup completed ✓"
}

# Show status
show_status() {
    log "Deployment Status:"
    echo ""
    
    # Docker containers status
    info "Docker Containers:"
    docker-compose -f $DOCKER_COMPOSE_FILE ps
    
    echo ""
    
    # Service URLs
    info "Service URLs:"
    echo "  Frontend: https://localhost"
    echo "  Backend API: https://localhost/api"
    echo "  Grafana: http://localhost:3001"
    echo "  Kibana: http://localhost:5601"
    echo "  Prometheus: http://localhost:9090"
    
    echo ""
    
    # Disk usage
    info "Disk Usage:"
    df -h | grep -E "(Filesystem|/dev/)"
    
    echo ""
    
    # Memory usage
    info "Memory Usage:"
    free -h
}

# Main deployment function
main() {
    log "Starting EdTech Ecosystem deployment..."
    
    check_root
    check_prerequisites
    create_backup
    pull_code
    setup_ssl
    setup_monitoring
    deploy
    cleanup
    show_status
    
    log "Deployment completed successfully! 🚀"
    log "EdTech Ecosystem is now running at https://localhost"
}

# Handle script arguments
case "${1:-}" in
    "backup")
        create_backup
        ;;
    "status")
        show_status
        ;;
    "logs")
        docker-compose -f $DOCKER_COMPOSE_FILE logs -f
        ;;
    "restart")
        log "Restarting services..."
        docker-compose -f $DOCKER_COMPOSE_FILE restart
        show_status
        ;;
    "stop")
        log "Stopping services..."
        docker-compose -f $DOCKER_COMPOSE_FILE down
        ;;
    "cleanup")
        cleanup
        ;;
    *)
        main
        ;;
esac
