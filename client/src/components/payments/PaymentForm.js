import React, { useState, useEffect } from 'react';
import './PaymentForm.css';

const PaymentForm = ({ course, onPaymentSuccess, onCancel }) => {
  const [selectedProvider, setSelectedProvider] = useState('yookassa');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Российские платежные системы
  const paymentProviders = [
    {
      id: 'yookassa',
      name: 'ЮKassa',
      description: 'Быстрые и безопасные платежи',
      icon: '💳',
      popular: true
    },
    {
      id: 'sberbank',
      name: 'Сбербанк',
      description: 'Платежи через Сбербанк',
      icon: '🏦',
      popular: true
    },
    {
      id: 'tinkoff',
      name: 'Тинькофф',
      description: 'Тинькофф Банк',
      icon: '🟡',
      popular: true
    },
    {
      id: 'robokassa',
      name: 'Робокасса',
      description: 'Универсальная платежная система',
      icon: '🤖'
    },
    {
      id: 'qiwi',
      name: 'QIWI',
      description: 'Платежи через QIWI',
      icon: '💰'
    },
    {
      id: 'webmoney',
      name: 'WebMoney',
      description: 'WebMoney кошелек',
      icon: '🌐'
    }
  ];

  const handlePayment = async () => {
    if (!course) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          courseId: course._id,
          provider: selectedProvider,
          amount: course.price,
          currency: 'RUB'
        })
      });

      const data = await response.json();

      if (data.success) {
        // Открываем страницу оплаты
        window.open(data.payment.paymentUrl, '_blank');
        
        // Начинаем проверку статуса платежа
        checkPaymentStatus(data.payment.id);
      } else {
        setError(data.message || 'Ошибка создания платежа');
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async (paymentId) => {
    const maxAttempts = 30; // 5 минут проверки
    let attempts = 0;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/payments/status/${paymentId}`, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });

        const data = await response.json();

        if (data.success) {
          if (data.payment.status === 'paid') {
            onPaymentSuccess(data.payment);
            return;
          } else if (data.payment.status === 'failed' || data.payment.status === 'cancelled') {
            setError('Платеж не был завершен');
            return;
          }
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 10000); // Проверяем каждые 10 секунд
        } else {
          setError('Время ожидания платежа истекло');
        }
      } catch (err) {
        console.error('Ошибка проверки статуса платежа:', err);
      }
    };

    checkStatus();
  };

  if (!course) return null;

  return (
    <div className="payment-form-overlay">
      <div className="payment-form">
        <div className="payment-header">
          <h2>💳 Оплата курса</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <div className="course-info">
          <h3>{course.title}</h3>
          <p className="course-description">{course.description}</p>
          <div className="price">
            <span className="amount">{course.price.toLocaleString()} ₽</span>
            <span className="currency">RUB</span>
          </div>
        </div>

        <div className="payment-providers">
          <h4>Выберите способ оплаты:</h4>
          <div className="providers-grid">
            {paymentProviders.map(provider => (
              <div
                key={provider.id}
                className={`provider-card ${selectedProvider === provider.id ? 'selected' : ''} ${provider.popular ? 'popular' : ''}`}
                onClick={() => setSelectedProvider(provider.id)}
              >
                <div className="provider-icon">{provider.icon}</div>
                <div className="provider-info">
                  <div className="provider-name">{provider.name}</div>
                  <div className="provider-description">{provider.description}</div>
                </div>
                {provider.popular && <div className="popular-badge">Популярный</div>}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <div className="payment-actions">
          <button 
            className="cancel-btn" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Отмена
          </button>
          <button 
            className="pay-btn" 
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? '⏳ Создание платежа...' : `💳 Оплатить ${course.price.toLocaleString()} ₽`}
          </button>
        </div>

        <div className="payment-security">
          <div className="security-badges">
            <span>🔒 SSL защита</span>
            <span>🛡️ Безопасные платежи</span>
            <span>✅ Гарантия возврата</span>
          </div>
          <p className="security-text">
            Ваши данные защищены современными методами шифрования. 
            Мы не храним данные ваших карт.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
