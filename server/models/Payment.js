const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  // Основная информация
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  
  // Финансовая информация
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'RUB',
    enum: ['RUB', 'USD', 'EUR']
  },
  
  // Платежная система
  provider: {
    type: String,
    required: true,
    enum: ['yookassa', 'sberbank', 'tinkoff', 'robokassa', 'qiwi', 'webmoney']
  },
  providerPaymentId: {
    type: String,
    default: null
  },
  
  // Статус платежа
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'paid', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  
  // URL для оплаты
  paymentUrl: {
    type: String,
    default: null
  },
  
  // Временные метки
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: null
  },
  paidAt: {
    type: Date,
    default: null
  },
  
  // Дополнительная информация
  metadata: {
    courseTitle: String,
    userName: String,
    userEmail: String,
    ipAddress: String,
    userAgent: String
  },
  
  // Информация о возврате
  refund: {
    amount: Number,
    reason: String,
    processedAt: Date,
    refundId: String
  },
  
  // Webhook данные
  webhookData: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  }
}, {
  timestamps: true
});

// Индексы для оптимизации запросов
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ courseId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ provider: 1 });
paymentSchema.index({ createdAt: -1 });

// Виртуальные поля
paymentSchema.virtual('isExpired').get(function() {
  return this.expiresAt && this.expiresAt < new Date();
});

paymentSchema.virtual('isPaid').get(function() {
  return this.status === 'paid';
});

paymentSchema.virtual('canRefund').get(function() {
  return this.status === 'paid' && !this.refund.amount;
});

// Методы
paymentSchema.methods.markAsPaid = function(providerPaymentId = null) {
  this.status = 'paid';
  this.paidAt = new Date();
  if (providerPaymentId) {
    this.providerPaymentId = providerPaymentId;
  }
  return this.save();
};

paymentSchema.methods.markAsFailed = function() {
  this.status = 'failed';
  return this.save();
};

paymentSchema.methods.markAsCancelled = function() {
  this.status = 'cancelled';
  return this.save();
};

paymentSchema.methods.processRefund = function(amount, reason) {
  this.refund = {
    amount: amount || this.amount,
    reason: reason || 'Возврат по запросу пользователя',
    processedAt: new Date(),
    refundId: `refund_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
  this.status = 'refunded';
  return this.save();
};

// Статические методы
paymentSchema.statics.findByUser = function(userId, options = {}) {
  const { page = 1, limit = 10, status, provider } = options;
  const query = { userId };
  
  if (status) query.status = status;
  if (provider) query.provider = provider;
  
  return this.find(query)
    .populate('courseId', 'title description price')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
};

paymentSchema.statics.findByCourse = function(courseId, options = {}) {
  const { page = 1, limit = 10, status } = options;
  const query = { courseId };
  
  if (status) query.status = status;
  
  return this.find(query)
    .populate('userId', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
};

paymentSchema.statics.getRevenueStats = function(startDate, endDate) {
  const query = { 
    status: 'paid',
    createdAt: { $gte: startDate, $lte: endDate }
  };
  
  return this.aggregate([
    { $match: query },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$amount' },
        totalPayments: { $sum: 1 },
        averagePayment: { $avg: '$amount' },
        byProvider: {
          $push: {
            provider: '$provider',
            amount: '$amount'
          }
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Payment', paymentSchema);
