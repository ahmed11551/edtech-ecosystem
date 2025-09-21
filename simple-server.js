const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Serve the NextGen 2025 demo
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'nextgen-demo', 'index.html'));
});

// Serve the Metaverse worlds
app.get('/metaverse', (req, res) => {
  res.sendFile(path.join(__dirname, 'metaverse-worlds', 'index.html'));
});

// Serve the Neural Interface
app.get('/neural', (req, res) => {
  res.sendFile(path.join(__dirname, 'neural-interface', 'index.html'));
});

// Serve the Holographic Projections
app.get('/hologram', (req, res) => {
  res.sendFile(path.join(__dirname, 'holographic-projections', 'index.html'));
});

// Serve the Quantum Mentors
app.get('/mentors', (req, res) => {
  res.sendFile(path.join(__dirname, 'quantum-mentors', 'index.html'));
});

// Serve the Real-Time Analytics
app.get('/analytics', (req, res) => {
  res.sendFile(path.join(__dirname, 'real-time-analytics', 'index.html'));
});

// Serve the 3D demo
app.get('/3d', (req, res) => {
  res.sendFile(path.join(__dirname, '3d-demo', 'index.html'));
});

// Serve the original 2D demo
app.get('/2d', (req, res) => {
  res.sendFile(path.join(__dirname, 'mvp_demo', 'index.html'));
});

// API endpoints for demo
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'EdTech Ecosystem MVP Server',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Mock API endpoints
app.get('/api/courses/popular', (req, res) => {
  res.json({
    data: [
      {
        _id: '1',
        title: 'Python для начинающих',
        shortDescription: 'Изучите основы программирования на Python',
        instructor: {
          firstName: 'Алексей',
          lastName: 'Петров',
          avatar: 'https://via.placeholder.com/40'
        },
        thumbnail: 'https://via.placeholder.com/350x200/667eea/ffffff?text=Python',
        price: 2990,
        isFree: false,
        level: 'Начинающий',
        rating: { average: 4.8 },
        duration: 1200,
        studentsCount: 1250
      },
      {
        _id: '2',
        title: 'UI/UX Дизайн',
        shortDescription: 'Создание пользовательских интерфейсов',
        instructor: {
          firstName: 'Мария',
          lastName: 'Сидорова',
          avatar: 'https://via.placeholder.com/40'
        },
        thumbnail: 'https://via.placeholder.com/350x200/764ba2/ffffff?text=UI/UX',
        price: 3990,
        isFree: false,
        level: 'Средний',
        rating: { average: 4.9 },
        duration: 1800,
        studentsCount: 890
      },
      {
        _id: '3',
        title: 'Анализ данных',
        shortDescription: 'Data Science и машинное обучение',
        instructor: {
          firstName: 'Дмитрий',
          lastName: 'Козлов',
          avatar: 'https://via.placeholder.com/40'
        },
        thumbnail: 'https://via.placeholder.com/350x200/f093fb/ffffff?text=Data+Science',
        price: 4990,
        isFree: false,
        level: 'Продвинутый',
        rating: { average: 4.7 },
        duration: 2400,
        studentsCount: 650
      }
    ]
  });
});

// Quantum AI API
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
  
  // Симуляция квантового анализа
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

app.get('/api/courses', (req, res) => {
  res.json({
    data: [
      {
        _id: '1',
        title: 'Квантовая физика для ИИ',
        description: 'Изучение квантовых вычислений и их применение в ИИ',
        instructor: {
          firstName: 'Альберт',
          lastName: 'Квантов'
        },
        thumbnail: 'https://via.placeholder.com/350x200/00d4ff/ffffff?text=Quantum+AI',
        price: 9990,
        level: 'Продвинутый',
        rating: { average: 4.9, count: 2500 },
        duration: 3600,
        studentsCount: 2500,
        category: 'quantum',
        quantumLevel: 0.95
      },
      {
        _id: '2',
        title: 'Нейроинтерфейсы будущего',
        description: 'Управление обучением силой мысли',
        instructor: {
          firstName: 'Нейра',
          lastName: 'Интерфейс'
        },
        thumbnail: 'https://via.placeholder.com/350x200/ff006e/ffffff?text=Neuro+Interface',
        price: 8990,
        level: 'Продвинутый',
        rating: { average: 4.8, count: 1800 },
        duration: 3000,
        studentsCount: 1800,
        category: 'neurotech',
        quantumLevel: 0.92
      },
      {
        _id: '3',
        title: 'Метавселенная для образования',
        description: 'Создание образовательных миров в VR',
        instructor: {
          firstName: 'Мета',
          lastName: 'Верс'
        },
        thumbnail: 'https://via.placeholder.com/350x200/8338ec/ffffff?text=Metaverse',
        price: 7990,
        level: 'Средний',
        rating: { average: 4.7, count: 3200 },
        duration: 2400,
        studentsCount: 3200,
        category: 'metaverse',
        quantumLevel: 0.88
      },
      {
        _id: '4',
        title: 'Голографические проекции',
        description: '3D объекты в реальном пространстве',
        instructor: {
          firstName: 'Голо',
          lastName: 'Граф'
        },
        thumbnail: 'https://via.placeholder.com/350x200/06ffa5/ffffff?text=Hologram',
        price: 6990,
        level: 'Средний',
        rating: { average: 4.6, count: 1500 },
        duration: 2000,
        studentsCount: 1500,
        category: 'hologram',
        quantumLevel: 0.85
      },
      {
        _id: '5',
        title: 'Телепатическое программирование',
        description: 'Кодирование силой мысли',
        instructor: {
          firstName: 'Теле',
          lastName: 'Пат'
        },
        thumbnail: 'https://via.placeholder.com/350x200/ffbe0b/ffffff?text=Telepathy',
        price: 11990,
        level: 'Эксперт',
        rating: { average: 4.9, count: 800 },
        duration: 4200,
        studentsCount: 800,
        category: 'telepathy',
        quantumLevel: 0.98
      },
      {
        _id: '6',
        title: 'Квантовые алгоритмы',
        description: 'Программирование квантовых компьютеров',
        instructor: {
          firstName: 'Квант',
          lastName: 'Алгоритм'
        },
        thumbnail: 'https://via.placeholder.com/350x200/fb5607/ffffff?text=Quantum+Algo',
        price: 14990,
        level: 'Эксперт',
        rating: { average: 4.8, count: 600 },
        duration: 4800,
        studentsCount: 600,
        category: 'quantum',
        quantumLevel: 0.99
      }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 EdTech MVP Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎓 Demo: http://localhost:${PORT}/mvp_demo/`);
  console.log(`📋 Pitch Deck: http://localhost:${PORT}/pitch_deck.html`);
});
