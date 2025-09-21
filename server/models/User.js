const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  skills: [{
    type: String,
    trim: true
  }],
  learningGoals: [{
    type: String,
    trim: true
  }],
  preferences: {
    language: {
      type: String,
      default: 'ru'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'dark'
    }
  },
  progress: {
    totalCourses: {
      type: Number,
      default: 0
    },
    completedCourses: {
      type: Number,
      default: 0
    },
    totalHours: {
      type: Number,
      default: 0
    },
    certificates: [{
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      },
      completedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  quantumProfile: {
    learningStyle: {
      type: String,
      enum: ['visual', 'auditory', 'kinesthetic', 'quantum_visual'],
      default: 'quantum_visual'
    },
    cognitiveLoad: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.7
    },
    emotionalState: {
      type: String,
      enum: ['excited', 'focused', 'relaxed', 'stressed'],
      default: 'excited'
    },
    quantumSignature: {
      type: String,
      default: ''
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate quantum signature
userSchema.methods.generateQuantumSignature = function() {
  this.quantumProfile.quantumSignature = 'q_' + Math.random().toString(36).substr(2, 9);
  return this.quantumProfile.quantumSignature;
};

module.exports = mongoose.model('User', userSchema);