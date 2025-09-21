import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { coursesAPI } from '../services/api';

const Home = () => {
  const { data: popularCourses, isLoading } = useQuery(
    'popular-courses',
    coursesAPI.getPopularCourses,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const features = [
    {
      icon: '🧠',
      title: 'ИИ-персонализация',
      description: 'Адаптивные образовательные траектории под каждого пользователя'
    },
    {
      icon: '📊',
      title: 'Аналитика прогресса',
      description: 'Детальная аналитика обучения в реальном времени'
    },
    {
      icon: '👥',
      title: 'Социальное обучение',
      description: 'Интерактивные форумы и групповые проекты'
    },
    {
      icon: '📱',
      title: 'Мультиплатформенность',
      description: 'Доступ с любых устройств с синхронизацией'
    },
    {
      icon: '🏪',
      title: 'Маркетплейс контента',
      description: 'Создание и продажа образовательного контента'
    },
    {
      icon: '🏢',
      title: 'Корпоративные решения',
      description: 'Комплексные решения для обучения персонала'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Активных пользователей' },
    { number: '500+', label: 'Курсов на платформе' },
    { number: '50+', label: 'Корпоративных клиентов' },
    { number: '95%', label: 'Довольных студентов' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 className="hero-title">
              Революционная образовательная платформа с{' '}
              <span className="text-gradient">ИИ-персонализацией</span>
            </h1>
            <p className="hero-description">
              Изучайте эффективно с помощью умных алгоритмов, которые адаптируют контент 
              под ваши потребности и стиль обучения
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Начать обучение
              </Link>
              <Link to="/courses" className="btn btn-outline btn-lg">
                Посмотреть курсы
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="stats-grid"
          >
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Почему выбирают нас</h2>
            <p>Инновационные технологии для эффективного обучения</p>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="feature-card"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="courses-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Популярные курсы</h2>
            <p>Начните с самых востребованных направлений</p>
          </motion.div>

          {isLoading ? (
            <div className="courses-loading">
              <div className="loading-skeleton">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="course-skeleton" />
                ))}
              </div>
            </div>
          ) : (
            <div className="courses-grid">
              {popularCourses?.data?.slice(0, 6).map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="course-card"
                >
                  <div className="course-thumbnail">
                    <img src={course.thumbnail} alt={course.title} />
                    <div className="course-level">{course.level}</div>
                  </div>
                  <div className="course-content">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-description">{course.shortDescription}</p>
                    <div className="course-meta">
                      <div className="course-instructor">
                        <img 
                          src={course.instructor?.avatar || '/default-avatar.png'} 
                          alt={course.instructor?.firstName}
                        />
                        <span>{course.instructor?.firstName} {course.instructor?.lastName}</span>
                      </div>
                      <div className="course-rating">
                        <span className="rating-stars">★★★★★</span>
                        <span className="rating-value">{course.rating?.average || 0}</span>
                      </div>
                    </div>
                    <div className="course-footer">
                      <div className="course-price">
                        {course.isFree ? (
                          <span className="price-free">Бесплатно</span>
                        ) : (
                          <span className="price-amount">{course.price} ₽</span>
                        )}
                      </div>
                      <Link to={`/courses/${course._id}`} className="btn btn-primary btn-sm">
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="courses-actions">
            <Link to="/courses" className="btn btn-outline btn-lg">
              Все курсы
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cta-content"
          >
            <h2>Готовы начать обучение?</h2>
            <p>Присоединяйтесь к тысячам студентов, которые уже изучают новые навыки</p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Создать аккаунт
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Войти
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
