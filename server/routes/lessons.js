const express = require('express');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get lesson by ID
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate('course', 'title instructor')
      .populate('prerequisites');

    if (!lesson) {
      return res.status(404).json({ message: 'Урок не найден' });
    }

    // Increment views
    await lesson.incrementViews();

    res.json({ lesson });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Create lesson (instructor only)
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'instructor') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const lesson = new Lesson(req.body);
    await lesson.save();

    res.status(201).json({
      message: 'Урок создан успешно',
      lesson
    });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Update lesson (instructor only)
router.put('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Урок не найден' });
    }

    const course = await Course.findById(lesson.course);
    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    Object.assign(lesson, req.body);
    await lesson.save();

    res.json({
      message: 'Урок обновлен успешно',
      lesson
    });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Delete lesson (instructor only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Урок не найден' });
    }

    const course = await Course.findById(lesson.course);
    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: 'Урок удален успешно' });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Rate lesson
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Рейтинг должен быть от 1 до 5' });
    }

    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Урок не найден' });
    }

    await lesson.addRating(req.userId, rating, comment);

    res.json({
      message: 'Рейтинг добавлен успешно',
      ratings: lesson.analytics.ratings
    });
  } catch (error) {
    console.error('Rate lesson error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Complete lesson
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Урок не найден' });
    }

    await lesson.markCompleted();

    res.json({
      message: 'Урок завершен успешно',
      completionRate: lesson.completionRate
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Get holographic content
router.get('/:id/holographic', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || lesson.type !== 'holographic') {
      return res.status(404).json({ message: 'Голографический контент не найден' });
    }

    const holographicData = {
      type: lesson.content.holographic.type,
      interactive: lesson.content.holographic.interactive,
      animations: lesson.content.holographic.animations,
      resources: lesson.resources.filter(r => r.type === 'hologram')
    };

    res.json({ holographicData });
  } catch (error) {
    console.error('Get holographic content error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Get neural interface commands
router.get('/:id/neural', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || lesson.type !== 'neural') {
      return res.status(404).json({ message: 'Нейроинтерфейс не найден' });
    }

    const neuralData = {
      commands: lesson.content.neural.commands,
      brainwavePatterns: lesson.content.neural.brainwavePatterns
    };

    res.json({ neuralData });
  } catch (error) {
    console.error('Get neural interface error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Get metaverse world data
router.get('/:id/metaverse', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || lesson.type !== 'metaverse') {
      return res.status(404).json({ message: 'Метавселенная не найдена' });
    }

    const metaverseData = {
      world: lesson.content.metaverse.world,
      coordinates: lesson.content.metaverse.coordinates,
      interactiveObjects: lesson.content.metaverse.interactiveObjects
    };

    res.json({ metaverseData });
  } catch (error) {
    console.error('Get metaverse data error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
