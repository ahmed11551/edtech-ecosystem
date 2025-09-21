const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role: role || 'student'
    });

    // Generate quantum signature
    user.generateQuantumSignature();

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        quantumSignature: user.quantumProfile.quantumSignature
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Успешный вход в систему',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        quantumSignature: user.quantumProfile.quantumSignature,
        progress: user.progress
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        skills: user.skills,
        learningGoals: user.learningGoals,
        preferences: user.preferences,
        progress: user.progress,
        quantumProfile: user.quantumProfile,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, bio, skills, learningGoals, preferences } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (bio !== undefined) user.bio = bio;
    if (skills) user.skills = skills;
    if (learningGoals) user.learningGoals = learningGoals;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();

    res.json({
      message: 'Профиль обновлен',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        skills: user.skills,
        learningGoals: user.learningGoals,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Update quantum profile
router.put('/quantum-profile', auth, async (req, res) => {
  try {
    const { learningStyle, cognitiveLoad, emotionalState } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Update quantum profile
    if (learningStyle) user.quantumProfile.learningStyle = learningStyle;
    if (cognitiveLoad !== undefined) user.quantumProfile.cognitiveLoad = cognitiveLoad;
    if (emotionalState) user.quantumProfile.emotionalState = emotionalState;

    await user.save();

    res.json({
      message: 'Квантовый профиль обновлен',
      quantumProfile: user.quantumProfile
    });
  } catch (error) {
    console.error('Update quantum profile error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Logout (client-side token removal)
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Выход выполнен успешно' });
});

module.exports = router;