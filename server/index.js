const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const lessonRoutes = require('./routes/lessons');
const paymentRoutes = require('./routes/payments');

const app = express();

// Connect to database (optional for demo)
// connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Слишком много запросов с этого IP, попробуйте позже'
});
app.use(limiter);

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'EdTech Ecosystem API Server',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Quantum AI API endpoints
app.get('/api/quantum-ai/status', (req, res) => {
  res.json({
    status: 'ACTIVE',
    quantumLevel: 0.95,
    coherence: 0.98,
    entanglement: 0.87,
    message: 'Квантовая ИИ-система работает на максимальной мощности',
    capabilities: [
      'Квантовые вычисления',
      'Нейроинтерфейс',
      'Метавселенная',
      'Голографические проекции',
      'Телепатическое обучение'
    ]
  });
});

app.post('/api/quantum-ai/analyze', (req, res) => {
  const { userData } = req.body;

  // Simulate quantum analysis
  const analysis = {
    quantumProfile: {
      learningStyle: 'quantum_visual',
      cognitiveLoad: 0.7,
      emotionalState: 'excited',
      quantumSignature: 'q_' + Math.random().toString(36).substr(2, 9)
    },
    recommendations: {
      courses: [
        {
          id: 'q1',
          title: 'Квантовая физика для ИИ',
          quantumScore: 0.95,
          confidence: 0.98
        },
        {
          id: 'q2',
          title: 'Нейроинтерфейсы будущего',
          quantumScore: 0.92,
          confidence: 0.96
        }
      ],
      metaverseWorlds: [
        {
          name: '🧬 Лаборатория ДНК',
          quantumLevel: 0.9,
          description: 'Изучение генетики в 3D'
        }
      ],
      quantumMentors: [
        {
          name: '🧠 ИИ-Эйнштейн',
          specialty: 'Квантовая физика',
          quantumLevel: 0.99
        }
      ]
    },
    quantumOptimization: {
      score: 0.94,
      coherence: 0.97,
      entanglement: 0.89
    }
  };

  res.json(analysis);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Внутренняя ошибка сервера',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Что-то пошло не так'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Маршрут не найден',
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 EdTech Ecosystem API Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
});

module.exports = app;