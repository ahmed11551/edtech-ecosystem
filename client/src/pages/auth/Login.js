import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import './Auth.css';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await login(data.email, data.password);
    setIsLoading(false);
    
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="auth-card"
        >
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <span className="logo-icon">🎓</span>
              <span className="logo-text">EdTech</span>
            </Link>
            <h1 className="auth-title">Добро пожаловать!</h1>
            <p className="auth-subtitle">
              Войдите в свой аккаунт, чтобы продолжить обучение
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="error-message"
              >
                {error}
              </motion.div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email адрес
              </label>
              <input
                {...register('email', {
                  required: 'Email обязателен',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Неверный формат email'
                  }
                })}
                type="email"
                id="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Введите ваш email"
                autoComplete="email"
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Пароль
              </label>
              <input
                {...register('password', {
                  required: 'Пароль обязателен',
                  minLength: {
                    value: 6,
                    message: 'Пароль должен содержать минимум 6 символов'
                  }
                })}
                type="password"
                id="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Введите ваш пароль"
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-text">Запомнить меня</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Забыли пароль?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner">⏳</span>
              ) : (
                'Войти'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Нет аккаунта?{' '}
              <Link to="/register" className="auth-link">
                Зарегистрироваться
              </Link>
            </p>
          </div>

          <div className="auth-divider">
            <span>или</span>
          </div>

          <div className="social-login">
            <button className="btn btn-outline social-btn">
              <span className="social-icon">🔍</span>
              Войти через Google
            </button>
            <button className="btn btn-outline social-btn">
              <span className="social-icon">📘</span>
              Войти через Facebook
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="auth-info"
        >
          <div className="info-content">
            <h2 className="info-title">
              Изучайте эффективно с помощью ИИ
            </h2>
            <p className="info-description">
              Наша платформа использует искусственный интеллект для создания 
              персонализированных образовательных траекторий, адаптированных 
              под ваш стиль обучения и цели.
            </p>
            <div className="info-features">
              <div className="info-feature">
                <span className="feature-icon">🎯</span>
                <span>Персонализированные рекомендации</span>
              </div>
              <div className="info-feature">
                <span className="feature-icon">📊</span>
                <span>Аналитика прогресса</span>
              </div>
              <div className="info-feature">
                <span className="feature-icon">👥</span>
                <span>Социальное обучение</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
