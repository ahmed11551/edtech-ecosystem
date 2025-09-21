import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Симуляция данных для демо
      setTimeout(() => {
        setUsers([
          {
            id: 1,
            name: 'Алексей Петров',
            email: 'alexey@example.com',
            role: 'student',
            status: 'active',
            joinDate: '2024-01-15',
            lastActive: '2024-09-21',
            courses: 5,
            payments: 3,
            totalSpent: 45000,
            avatar: '👨‍💻'
          },
          {
            id: 2,
            name: 'Мария Сидорова',
            email: 'maria@example.com',
            role: 'instructor',
            status: 'active',
            joinDate: '2023-11-20',
            lastActive: '2024-09-21',
            courses: 12,
            payments: 0,
            totalSpent: 0,
            avatar: '👩‍🏫'
          },
          {
            id: 3,
            name: 'Дмитрий Козлов',
            email: 'dmitry@example.com',
            role: 'student',
            status: 'inactive',
            joinDate: '2024-03-10',
            lastActive: '2024-08-15',
            courses: 2,
            payments: 1,
            totalSpent: 15000,
            avatar: '👨‍🎓'
          },
          {
            id: 4,
            name: 'Елена Волкова',
            email: 'elena@example.com',
            role: 'admin',
            status: 'active',
            joinDate: '2023-09-01',
            lastActive: '2024-09-21',
            courses: 0,
            payments: 0,
            totalSpent: 0,
            avatar: '👩‍💼'
          },
          {
            id: 5,
            name: 'Иван Смирнов',
            email: 'ivan@example.com',
            role: 'student',
            status: 'banned',
            joinDate: '2024-06-05',
            lastActive: '2024-09-10',
            courses: 1,
            payments: 0,
            totalSpent: 0,
            avatar: '👨‍🔬'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return '👑';
      case 'instructor': return '👨‍🏫';
      case 'student': return '👨‍🎓';
      default: return '👤';
    }
  };

  const getRoleName = (role) => {
    switch (role) {
      case 'admin': return 'Администратор';
      case 'instructor': return 'Преподаватель';
      case 'student': return 'Студент';
      default: return role;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#28a745';
      case 'inactive': return '#ffc107';
      case 'banned': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'inactive': return 'Неактивен';
      case 'banned': return 'Заблокирован';
      default: return status;
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleUserAction = (action, userId) => {
    console.log(`${action} пользователя ${userId}`);
    // Здесь будет логика выполнения действий
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  if (loading) {
    return (
      <div className="user-management">
        <div className="loading">
          <div className="spinner"></div>
          <p>Загрузка пользователей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="management-header">
        <h1>👥 Управление пользователями</h1>
        <p>Администрирование пользователей платформы</p>
      </div>

      {/* Фильтры и поиск */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск по имени или email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="">Все роли</option>
            <option value="admin">Администратор</option>
            <option value="instructor">Преподаватель</option>
            <option value="student">Студент</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="">Все статусы</option>
            <option value="active">Активен</option>
            <option value="inactive">Неактивен</option>
            <option value="banned">Заблокирован</option>
          </select>
        </div>

        <div className="actions">
          <button className="action-btn primary">
            ➕ Добавить пользователя
          </button>
          <button 
            className="action-btn secondary"
            disabled={selectedUsers.length === 0}
          >
            📧 Отправить сообщение ({selectedUsers.length})
          </button>
        </div>
      </div>

      {/* Статистика */}
      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-number">{users.length}</div>
          <div className="stat-label">Всего пользователей</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{users.filter(u => u.status === 'active').length}</div>
          <div className="stat-label">Активных</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{users.filter(u => u.role === 'instructor').length}</div>
          <div className="stat-label">Преподавателей</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{users.filter(u => u.role === 'student').length}</div>
          <div className="stat-label">Студентов</div>
        </div>
      </div>

      {/* Таблица пользователей */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={handleSelectAll}
                  className="checkbox"
                />
              </th>
              <th>Пользователь</th>
              <th>Роль</th>
              <th>Статус</th>
              <th>Курсы</th>
              <th>Платежи</th>
              <th>Потрачено</th>
              <th>Последняя активность</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="user-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                    className="checkbox"
                  />
                </td>
                <td>
                  <div className="user-info" onClick={() => openUserModal(user)}>
                    <div className="user-avatar">{user.avatar}</div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="role-badge">
                    {getRoleIcon(user.role)} {getRoleName(user.role)}
                  </div>
                </td>
                <td>
                  <div 
                    className="status-badge"
                    style={{ color: getStatusColor(user.status) }}
                  >
                    ● {getStatusText(user.status)}
                  </div>
                </td>
                <td>
                  <div className="courses-count">{user.courses}</div>
                </td>
                <td>
                  <div className="payments-count">{user.payments}</div>
                </td>
                <td>
                  <div className="total-spent">
                    {user.totalSpent.toLocaleString()} ₽
                  </div>
                </td>
                <td>
                  <div className="last-active">
                    {formatDate(user.lastActive)}
                  </div>
                </td>
                <td>
                  <div className="user-actions">
                    <button 
                      className="action-icon-btn"
                      onClick={() => openUserModal(user)}
                      title="Просмотр"
                    >
                      👁️
                    </button>
                    <button 
                      className="action-icon-btn"
                      onClick={() => handleUserAction('edit', user.id)}
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                    <button 
                      className="action-icon-btn"
                      onClick={() => handleUserAction('message', user.id)}
                      title="Сообщение"
                    >
                      💬
                    </button>
                    <button 
                      className="action-icon-btn danger"
                      onClick={() => handleUserAction('ban', user.id)}
                      title="Заблокировать"
                    >
                      🚫
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Модальное окно пользователя */}
      {showUserModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>👤 Информация о пользователе</h2>
              <button 
                className="close-btn"
                onClick={() => setShowUserModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="user-profile">
                <div className="profile-avatar">{selectedUser.avatar}</div>
                <div className="profile-info">
                  <h3>{selectedUser.name}</h3>
                  <p>{selectedUser.email}</p>
                  <div className="profile-badges">
                    <span className="role-badge">
                      {getRoleIcon(selectedUser.role)} {getRoleName(selectedUser.role)}
                    </span>
                    <span 
                      className="status-badge"
                      style={{ color: getStatusColor(selectedUser.status) }}
                    >
                      ● {getStatusText(selectedUser.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="user-stats">
                <div className="stat-card">
                  <div className="stat-label">Курсы</div>
                  <div className="stat-value">{selectedUser.courses}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Платежи</div>
                  <div className="stat-value">{selectedUser.payments}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Потрачено</div>
                  <div className="stat-value">{selectedUser.totalSpent.toLocaleString()} ₽</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Дата регистрации</div>
                  <div className="stat-value">{formatDate(selectedUser.joinDate)}</div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setShowUserModal(false)}>
                Закрыть
              </button>
              <button className="btn primary">
                Редактировать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
