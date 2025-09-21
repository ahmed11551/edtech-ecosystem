import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    payments: 0,
    revenue: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Симуляция данных для демо
      setTimeout(() => {
        setStats({
          users: 1247,
          courses: 89,
          payments: 3421,
          revenue: 2847392
        });
        
        setRecentActivity([
          {
            id: 1,
            type: 'payment',
            user: 'Алексей Петров',
            course: 'Квантовая физика',
            amount: 15000,
            time: '2 минуты назад',
            status: 'success'
          },
          {
            id: 2,
            type: 'course',
            user: 'Мария Сидорова',
            course: 'Нейроинтерфейсы',
            amount: 0,
            time: '5 минут назад',
            status: 'info'
          },
          {
            id: 3,
            type: 'user',
            user: 'Дмитрий Козлов',
            course: 'Регистрация',
            amount: 0,
            time: '12 минут назад',
            status: 'success'
          },
          {
            id: 4,
            type: 'payment',
            user: 'Елена Волкова',
            course: 'Метавселенная',
            amount: 25000,
            time: '1 час назад',
            status: 'success'
          }
        ]);
        
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'payment': return '💳';
      case 'course': return '📚';
      case 'user': return '👤';
      default: return '📊';
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'success': return '#28a745';
      case 'info': return '#17a2b8';
      case 'warning': return '#ffc107';
      case 'error': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">
          <div className="spinner"></div>
          <p>Загрузка админ-панели...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>🎛️ Админ-панель EdTech Ecosystem</h1>
        <p>Управление образовательной платформой будущего</p>
      </div>

      {/* Статистика */}
      <div className="stats-grid">
        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.users.toLocaleString()}</div>
            <div className="stat-label">Пользователи</div>
            <div className="stat-change positive">+12% за месяц</div>
          </div>
        </div>

        <div className="stat-card courses">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-number">{stats.courses}</div>
            <div className="stat-label">Курсы</div>
            <div className="stat-change positive">+5 новых</div>
          </div>
        </div>

        <div className="stat-card payments">
          <div className="stat-icon">💳</div>
          <div className="stat-content">
            <div className="stat-number">{stats.payments.toLocaleString()}</div>
            <div className="stat-label">Платежи</div>
            <div className="stat-change positive">+23% за неделю</div>
          </div>
        </div>

        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-number">{stats.revenue.toLocaleString()} ₽</div>
            <div className="stat-label">Выручка</div>
            <div className="stat-change positive">+18% за месяц</div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="dashboard-content">
        {/* Последняя активность */}
        <div className="activity-section">
          <h2>🔥 Последняя активность</h2>
          <div className="activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon" style={{ color: getActivityColor(activity.status) }}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-content">
                  <div className="activity-title">
                    {activity.user} {activity.type === 'payment' ? 'оплатил' : activity.type === 'course' ? 'начал курс' : 'зарегистрировался'}
                    {activity.course && ` "${activity.course}"`}
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
                {activity.amount > 0 && (
                  <div className="activity-amount">
                    +{activity.amount.toLocaleString()} ₽
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Быстрые действия */}
        <div className="quick-actions">
          <h2>⚡ Быстрые действия</h2>
          <div className="actions-grid">
            <button className="action-btn create-course">
              <div className="action-icon">📚</div>
              <div className="action-text">Создать курс</div>
            </button>
            
            <button className="action-btn manage-users">
              <div className="action-icon">👥</div>
              <div className="action-text">Управление пользователями</div>
            </button>
            
            <button className="action-btn analytics">
              <div className="action-icon">📊</div>
              <div className="action-text">Аналитика</div>
            </button>
            
            <button className="action-btn payments">
              <div className="action-icon">💳</div>
              <div className="action-text">Платежи</div>
            </button>
            
            <button className="action-btn settings">
              <div className="action-icon">⚙️</div>
              <div className="action-text">Настройки</div>
            </button>
            
            <button className="action-btn support">
              <div className="action-icon">🎧</div>
              <div className="action-text">Поддержка</div>
            </button>
          </div>
        </div>
      </div>

      {/* Графики и аналитика */}
      <div className="analytics-section">
        <h2>📈 Аналитика</h2>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>📊 Выручка по месяцам</h3>
            <div className="chart-placeholder">
              <div className="chart-bars">
                <div className="bar" style={{ height: '60%' }}></div>
                <div className="bar" style={{ height: '80%' }}></div>
                <div className="bar" style={{ height: '45%' }}></div>
                <div className="bar" style={{ height: '90%' }}></div>
                <div className="bar" style={{ height: '75%' }}></div>
                <div className="bar" style={{ height: '95%' }}></div>
              </div>
              <div className="chart-labels">
                <span>Янв</span>
                <span>Фев</span>
                <span>Мар</span>
                <span>Апр</span>
                <span>Май</span>
                <span>Июн</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>👥 Рост пользователей</h3>
            <div className="chart-placeholder">
              <div className="growth-line">
                <div className="line-point" style={{ left: '10%', bottom: '20%' }}></div>
                <div className="line-point" style={{ left: '30%', bottom: '35%' }}></div>
                <div className="line-point" style={{ left: '50%', bottom: '50%' }}></div>
                <div className="line-point" style={{ left: '70%', bottom: '70%' }}></div>
                <div className="line-point" style={{ left: '90%', bottom: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Системная информация */}
      <div className="system-info">
        <h2>🔧 Системная информация</h2>
        <div className="system-grid">
          <div className="system-item">
            <div className="system-label">Статус сервера</div>
            <div className="system-value online">🟢 Онлайн</div>
          </div>
          <div className="system-item">
            <div className="system-label">База данных</div>
            <div className="system-value online">🟢 Подключена</div>
          </div>
          <div className="system-item">
            <div className="system-label">Платежные системы</div>
            <div className="system-value online">🟢 Активны</div>
          </div>
          <div className="system-item">
            <div className="system-label">Квантовая ИИ</div>
            <div className="system-value online">🟢 95% мощности</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
