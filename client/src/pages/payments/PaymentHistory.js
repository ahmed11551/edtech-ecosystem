import React, { useState, useEffect } from 'react';
import './PaymentHistory.css';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    provider: '',
    page: 1
  });

  useEffect(() => {
    fetchPayments();
  }, [filters]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.provider) queryParams.append('provider', filters.provider);
      queryParams.append('page', filters.page);
      queryParams.append('limit', '10');

      const response = await fetch(`/api/payments/history?${queryParams}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      const data = await response.json();

      if (data.success) {
        setPayments(data.payments);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Ошибка загрузки истории платежей');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return '✅';
      case 'pending': return '⏳';
      case 'failed': return '❌';
      case 'cancelled': return '🚫';
      case 'refunded': return '↩️';
      default: return '❓';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Оплачен';
      case 'pending': return 'Ожидает оплаты';
      case 'failed': return 'Ошибка оплаты';
      case 'cancelled': return 'Отменен';
      case 'refunded': return 'Возвращен';
      default: return 'Неизвестно';
    }
  };

  const getProviderIcon = (provider) => {
    switch (provider) {
      case 'yookassa': return '💳';
      case 'sberbank': return '🏦';
      case 'tinkoff': return '🟡';
      case 'robokassa': return '🤖';
      case 'qiwi': return '💰';
      case 'webmoney': return '🌐';
      default: return '💳';
    }
  };

  const getProviderName = (provider) => {
    switch (provider) {
      case 'yookassa': return 'ЮKassa';
      case 'sberbank': return 'Сбербанк';
      case 'tinkoff': return 'Тинькофф';
      case 'robokassa': return 'Робокасса';
      case 'qiwi': return 'QIWI';
      case 'webmoney': return 'WebMoney';
      default: return provider;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="payment-history">
        <div className="loading">
          <div className="spinner"></div>
          <p>Загрузка истории платежей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-history">
      <div className="history-header">
        <h1>💳 История платежей</h1>
        <p>Все ваши транзакции и платежи</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Статус:</label>
          <select 
            value={filters.status} 
            onChange={(e) => setFilters({...filters, status: e.target.value, page: 1})}
          >
            <option value="">Все статусы</option>
            <option value="paid">Оплачен</option>
            <option value="pending">Ожидает оплаты</option>
            <option value="failed">Ошибка оплаты</option>
            <option value="cancelled">Отменен</option>
            <option value="refunded">Возвращен</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Провайдер:</label>
          <select 
            value={filters.provider} 
            onChange={(e) => setFilters({...filters, provider: e.target.value, page: 1})}
          >
            <option value="">Все провайдеры</option>
            <option value="yookassa">ЮKassa</option>
            <option value="sberbank">Сбербанк</option>
            <option value="tinkoff">Тинькофф</option>
            <option value="robokassa">Робокасса</option>
            <option value="qiwi">QIWI</option>
            <option value="webmoney">WebMoney</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      <div className="payments-list">
        {payments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💳</div>
            <h3>Платежей пока нет</h3>
            <p>Здесь будет отображаться история ваших платежей</p>
          </div>
        ) : (
          payments.map((payment) => (
            <div key={payment.id} className="payment-card">
              <div className="payment-info">
                <div className="payment-header">
                  <div className="payment-id">
                    #{payment.id.slice(-8)}
                  </div>
                  <div className={`payment-status ${payment.status}`}>
                    {getStatusIcon(payment.status)} {getStatusText(payment.status)}
                  </div>
                </div>
                
                <div className="payment-details">
                  <div className="course-info">
                    <h4>{payment.metadata?.courseTitle || 'Курс'}</h4>
                    <p>{payment.metadata?.userEmail || 'Пользователь'}</p>
                  </div>
                  
                  <div className="payment-amount">
                    <span className="amount">{payment.amount.toLocaleString()} ₽</span>
                    <span className="currency">{payment.currency}</span>
                  </div>
                </div>

                <div className="payment-meta">
                  <div className="provider">
                    {getProviderIcon(payment.provider)} {getProviderName(payment.provider)}
                  </div>
                  <div className="date">
                    {formatDate(payment.createdAt)}
                  </div>
                </div>
              </div>

              {payment.status === 'paid' && (
                <div className="payment-actions">
                  <button className="download-btn">
                    📄 Скачать чек
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button 
          className="page-btn"
          disabled={filters.page === 1}
          onClick={() => setFilters({...filters, page: filters.page - 1})}
        >
          ← Назад
        </button>
        
        <span className="page-info">
          Страница {filters.page}
        </span>
        
        <button 
          className="page-btn"
          disabled={payments.length < 10}
          onClick={() => setFilters({...filters, page: filters.page + 1})}
        >
          Вперед →
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
