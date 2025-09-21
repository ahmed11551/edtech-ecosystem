import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const navItems = [
    { name: 'Курсы', path: '/courses' },
    { name: 'О нас', path: '/about' },
    { name: 'Контакты', path: '/contact' },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">EdTech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="navbar-actions">
            {isAuthenticated ? (
              <div className="user-menu">
                <button
                  className="user-avatar"
                  onClick={toggleProfile}
                  aria-label="User menu"
                >
                  <img
                    src={user?.avatar || '/default-avatar.png'}
                    alt={user?.firstName}
                    className="avatar-img"
                  />
                  <span className="avatar-name">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="dropdown-arrow">▼</span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="profile-dropdown"
                    >
                      <Link
                        to="/dashboard"
                        className="dropdown-item"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span className="dropdown-icon">📊</span>
                        Дашборд
                      </Link>
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span className="dropdown-icon">👤</span>
                        Профиль
                      </Link>
                      <Link
                        to="/my-courses"
                        className="dropdown-item"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span className="dropdown-icon">📚</span>
                        Мои курсы
                      </Link>
                      <div className="dropdown-divider" />
                      <button
                        className="dropdown-item logout-item"
                        onClick={handleLogout}
                      >
                        <span className="dropdown-icon">🚪</span>
                        Выйти
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline btn-sm">
                  Войти
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Регистрация
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-nav"
            >
              <div className="mobile-nav-content">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {!isAuthenticated && (
                  <div className="mobile-auth-buttons">
                    <Link
                      to="/login"
                      className="btn btn-outline btn-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Войти
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary btn-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Регистрация
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
