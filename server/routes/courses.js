const express = require('express');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all courses with filters
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      level,
      search,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = { isPublished: true };

    // Apply filters
    if (category) query.category = category;
    if (level) query.level = level;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const courses = await Course.find(query)
      .populate('instructor', 'firstName lastName avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Course.countDocuments(query);

    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Get featured courses
router.get('/featured', async (req, res) => {
  try {
    const courses = await Course.find({ 
      isPublished: true, 
      isFeatured: true 
    })
      .populate('instructor', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({ courses });
  } catch (error) {
    console.error('Get featured courses error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'firstName lastName avatar bio')
      .populate('lessons');

    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    // Increment views
    await course.incrementViews();

    res.json({ course });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Create course (instructor only)
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'instructor') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const courseData = {
      ...req.body,
      instructor: req.userId
    };

    const course = new Course(courseData);
    await course.save();

    res.status(201).json({
      message: 'Курс создан успешно',
      course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Update course (instructor only)
router.put('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    Object.assign(course, req.body);
    await course.save();

    res.json({
      message: 'Курс обновлен успешно',
      course
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Delete course (instructor only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Курс удален успешно' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Rate course
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Рейтинг должен быть от 1 до 5' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Курс не найден' });
    }

    await course.updateRating(rating);

    res.json({
      message: 'Рейтинг добавлен успешно',
      rating: course.rating
    });
  } catch (error) {
    console.error('Rate course error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Get course lessons
router.get('/:id/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.find({ 
      course: req.params.id,
      isPublished: true 
    }).sort({ order: 1 });

    res.json({ lessons });
  } catch (error) {
    console.error('Get course lessons error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Get quantum AI recommendations
router.get('/quantum/recommendations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Simulate quantum AI recommendations
    const recommendations = {
      quantumProfile: user.quantumProfile,
      recommendedCourses: await Course.find({
        category: { $in: user.learningGoals },
        level: user.quantumProfile.learningStyle === 'quantum_visual' ? 'Продвинутый' : 'Средний',
        isPublished: true
      })
      .populate('instructor', 'firstName lastName avatar')
      .limit(6),
      
      metaverseWorlds: [
        {
          name: '🧬 Лаборатория ДНК',
          quantumLevel: 0.9,
          description: 'Изучение генетики в 3D',
          courses: await Course.find({ metaverseWorld: 'dna-lab', isPublished: true }).limit(3)
        },
        {
          name: '🌌 Космическая станция',
          quantumLevel: 0.8,
          description: 'Физика в невесомости',
          courses: await Course.find({ metaverseWorld: 'space-station', isPublished: true }).limit(3)
        }
      ],
      
      quantumMentors: [
        {
          name: '🧠 ИИ-Эйнштейн',
          specialty: 'Квантовая физика',
          quantumLevel: 0.99,
          courses: await Course.find({ category: 'quantum', isPublished: true }).limit(2)
        },
        {
          name: '💻 ИИ-Тьюринг',
          specialty: 'Программирование',
          quantumLevel: 0.95,
          courses: await Course.find({ category: 'programming', isPublished: true }).limit(2)
        }
      ]
    };

    res.json(recommendations);
  } catch (error) {
    console.error('Get quantum recommendations error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
