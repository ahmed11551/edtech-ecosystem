import React, { useState, useEffect } from 'react';
import './CourseManagement.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      
      // Симуляция данных для демо
      setTimeout(() => {
        setCourses([
          {
            id: 1,
            title: 'Квантовая физика для ИИ',
            description: 'Изучение квантовых принципов в машинном обучении',
            category: 'quantum',
            status: 'published',
            price: 25000,
            students: 156,
            rating: 4.8,
            lessons: 12,
            duration: '8 недель',
            instructor: 'Др. Алексей Квантов',
            createdAt: '2024-01-15',
            updatedAt: '2024-09-20',
            thumbnail: '🧬',
            tags: ['квантовая физика', 'ИИ', 'машинное обучение']
          },
          {
            id: 2,
            title: 'Нейроинтерфейсы будущего',
            description: 'Создание интерфейсов мозг-компьютер',
            category: 'neural',
            status: 'draft',
            price: 30000,
            students: 89,
            rating: 4.9,
            lessons: 15,
            duration: '10 недель',
            instructor: 'Проф. Мария Нейрон',
            createdAt: '2024-02-10',
            updatedAt: '2024-09-18',
            thumbnail: '🧠',
            tags: ['нейроинтерфейсы', 'BCI', 'нейротехнологии']
          },
          {
            id: 3,
            title: 'Метавселенная для образования',
            description: 'Создание образовательных миров в VR/AR',
            category: 'metaverse',
            status: 'published',
            price: 20000,
            students: 234,
            rating: 4.7,
            lessons: 10,
            duration: '6 недель',
            instructor: 'Архитектор Виртуальных Миров',
            createdAt: '2024-03-05',
            updatedAt: '2024-09-21',
            thumbnail: '🌐',
            tags: ['метавселенная', 'VR', 'AR', 'образование']
          },
          {
            id: 4,
            title: 'Голографические проекции',
            description: 'Технологии 3D голографии в обучении',
            category: 'hologram',
            status: 'published',
            price: 18000,
            students: 167,
            rating: 4.6,
            lessons: 8,
            duration: '5 недель',
            instructor: 'Голограф Макс',
            createdAt: '2024-04-12',
            updatedAt: '2024-09-19',
            thumbnail: '✨',
            tags: ['голография', '3D', 'проекции']
          },
          {
            id: 5,
            title: 'Квантовые менторы ИИ',
            description: 'Создание ИИ-наставников нового поколения',
            category: 'ai',
            status: 'archived',
            price: 35000,
            students: 45,
            rating: 4.9,
            lessons: 20,
            duration: '12 недель',
            instructor: 'ИИ-Эйнштейн',
            createdAt: '2024-05-20',
            updatedAt: '2024-09-15',
            thumbnail: '🤖',
            tags: ['ИИ', 'менторы', 'квантовые вычисления']
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Ошибка загрузки курсов:', error);
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || course.category === filterCategory;
    const matchesStatus = !filterStatus || course.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'quantum': return '🧬';
      case 'neural': return '🧠';
      case 'metaverse': return '🌐';
      case 'hologram': return '✨';
      case 'ai': return '🤖';
      default: return '📚';
    }
  };

  const getCategoryName = (category) => {
    switch (category) {
      case 'quantum': return 'Квантовая физика';
      case 'neural': return 'Нейроинтерфейсы';
      case 'metaverse': return 'Метавселенная';
      case 'hologram': return 'Голография';
      case 'ai': return 'Искусственный интеллект';
      default: return category;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return '#28a745';
      case 'draft': return '#ffc107';
      case 'archived': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'published': return 'Опубликован';
      case 'draft': return 'Черновик';
      case 'archived': return 'Архив';
      default: return status;
    }
  };

  const openCourseModal = (course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  const editCourse = (course) => {
    setEditingCourse(course);
    setShowCourseModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  if (loading) {
    return (
      <div className="course-management">
        <div className="loading">
          <div className="spinner"></div>
          <p>Загрузка курсов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="course-management">
      <div className="management-header">
        <h1>📚 Управление курсами</h1>
        <p>Администрирование образовательных программ</p>
      </div>

      {/* Фильтры и поиск */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск по названию, описанию или преподавателю..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">Все категории</option>
            <option value="quantum">Квантовая физика</option>
            <option value="neural">Нейроинтерфейсы</option>
            <option value="metaverse">Метавселенная</option>
            <option value="hologram">Голография</option>
            <option value="ai">Искусственный интеллект</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="">Все статусы</option>
            <option value="published">Опубликован</option>
            <option value="draft">Черновик</option>
            <option value="archived">Архив</option>
          </select>
        </div>

        <div className="actions">
          <button className="action-btn primary">
            ➕ Создать курс
          </button>
          <button className="action-btn secondary">
            📊 Аналитика курсов
          </button>
        </div>
      </div>

      {/* Статистика */}
      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-number">{courses.length}</div>
          <div className="stat-label">Всего курсов</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{courses.filter(c => c.status === 'published').length}</div>
          <div className="stat-label">Опубликованных</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{courses.reduce((sum, c) => sum + c.students, 0)}</div>
          <div className="stat-label">Студентов</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{courses.reduce((sum, c) => sum + c.price * c.students, 0).toLocaleString()} ₽</div>
          <div className="stat-label">Выручка</div>
        </div>
      </div>

      {/* Сетка курсов */}
      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <div className="course-thumbnail">{course.thumbnail}</div>
              <div className="course-status">
                <span 
                  className="status-badge"
                  style={{ color: getStatusColor(course.status) }}
                >
                  ● {getStatusText(course.status)}
                </span>
              </div>
            </div>

            <div className="course-content">
              <div className="course-category">
                {getCategoryIcon(course.category)} {getCategoryName(course.category)}
              </div>
              
              <h3 className="course-title" onClick={() => openCourseModal(course)}>
                {course.title}
              </h3>
              
              <p className="course-description">{course.description}</p>
              
              <div className="course-instructor">
                👨‍🏫 {course.instructor}
              </div>

              <div className="course-stats">
                <div className="stat">
                  <span className="stat-icon">👥</span>
                  <span className="stat-value">{course.students}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">⭐</span>
                  <span className="stat-value">{course.rating}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">📚</span>
                  <span className="stat-value">{course.lessons}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">⏱️</span>
                  <span className="stat-value">{course.duration}</span>
                </div>
              </div>

              <div className="course-price">
                {course.price.toLocaleString()} ₽
              </div>

              <div className="course-tags">
                {course.tags.map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>
            </div>

            <div className="course-actions">
              <button 
                className="action-btn view"
                onClick={() => openCourseModal(course)}
                title="Просмотр"
              >
                👁️
              </button>
              <button 
                className="action-btn edit"
                onClick={() => editCourse(course)}
                title="Редактировать"
              >
                ✏️
              </button>
              <button 
                className="action-btn analytics"
                title="Аналитика"
              >
                📊
              </button>
              <button 
                className="action-btn duplicate"
                title="Дублировать"
              >
                📋
              </button>
              <button 
                className="action-btn archive"
                title="Архивировать"
              >
                📦
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно курса */}
      {showCourseModal && selectedCourse && (
        <div className="modal-overlay" onClick={() => setShowCourseModal(false)}>
          <div className="course-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📚 {selectedCourse.title}</h2>
              <button 
                className="close-btn"
                onClick={() => setShowCourseModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="course-details">
                <div className="course-info">
                  <div className="course-meta">
                    <div className="meta-item">
                      <span className="meta-label">Категория:</span>
                      <span className="meta-value">
                        {getCategoryIcon(selectedCourse.category)} {getCategoryName(selectedCourse.category)}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Статус:</span>
                      <span 
                        className="meta-value"
                        style={{ color: getStatusColor(selectedCourse.status) }}
                      >
                        ● {getStatusText(selectedCourse.status)}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Преподаватель:</span>
                      <span className="meta-value">{selectedCourse.instructor}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Цена:</span>
                      <span className="meta-value">{selectedCourse.price.toLocaleString()} ₽</span>
                    </div>
                  </div>

                  <div className="course-description-full">
                    <h4>Описание:</h4>
                    <p>{selectedCourse.description}</p>
                  </div>

                  <div className="course-stats-detailed">
                    <div className="stat-card">
                      <div className="stat-icon">👥</div>
                      <div className="stat-info">
                        <div className="stat-value">{selectedCourse.students}</div>
                        <div className="stat-label">Студентов</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">⭐</div>
                      <div className="stat-info">
                        <div className="stat-value">{selectedCourse.rating}</div>
                        <div className="stat-label">Рейтинг</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">📚</div>
                      <div className="stat-info">
                        <div className="stat-value">{selectedCourse.lessons}</div>
                        <div className="stat-label">Уроков</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">⏱️</div>
                      <div className="stat-info">
                        <div className="stat-value">{selectedCourse.duration}</div>
                        <div className="stat-label">Длительность</div>
                      </div>
                    </div>
                  </div>

                  <div className="course-dates">
                    <div className="date-item">
                      <span className="date-label">Создан:</span>
                      <span className="date-value">{formatDate(selectedCourse.createdAt)}</span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">Обновлен:</span>
                      <span className="date-value">{formatDate(selectedCourse.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setShowCourseModal(false)}>
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

export default CourseManagement;
