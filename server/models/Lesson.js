const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'text', 'quiz', 'assignment', 'holographic', 'neural', 'metaverse'],
    required: true
  },
  content: {
    video: {
      url: String,
      thumbnail: String,
      duration: Number,
      quality: {
        type: String,
        enum: ['720p', '1080p', '4K', '8K'],
        default: '1080p'
      }
    },
    text: {
      content: String,
      format: {
        type: String,
        enum: ['markdown', 'html', 'plain'],
        default: 'markdown'
      }
    },
    quiz: {
      questions: [{
        question: String,
        type: {
          type: String,
          enum: ['multiple_choice', 'true_false', 'fill_blank', 'quantum_choice']
        },
        options: [String],
        correctAnswer: mongoose.Schema.Types.Mixed,
        explanation: String,
        points: {
          type: Number,
          default: 1
        }
      }],
      passingScore: {
        type: Number,
        default: 70
      },
      attempts: {
        type: Number,
        default: 3
      }
    },
    assignment: {
      instructions: String,
      files: [{
        name: String,
        url: String,
        type: String
      }],
      dueDate: Date,
      points: {
        type: Number,
        default: 100
      }
    },
    holographic: {
      type: {
        type: String,
        enum: ['dna', 'atom', 'heart', 'brain', 'solar', 'molecule']
      },
      interactive: {
        type: Boolean,
        default: true
      },
      animations: [{
        name: String,
        duration: Number,
        trigger: String
      }]
    },
    neural: {
      commands: [{
        command: String,
        action: String,
        description: String
      }],
      brainwavePatterns: [{
        frequency: String,
        description: String
      }]
    },
    metaverse: {
      world: {
        type: String,
        enum: ['dna-lab', 'space-station', 'ancient-rome', 'code-matrix', 'quantum-realm', 'art-gallery']
      },
      coordinates: {
        x: Number,
        y: Number,
        z: Number
      },
      interactiveObjects: [{
        name: String,
        type: String,
        action: String
      }]
    }
  },
  resources: [{
    title: String,
    type: {
      type: String,
      enum: ['file', 'link', 'video', 'audio', 'hologram']
    },
    url: String,
    description: String
  }],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFree: {
    type: Boolean,
    default: false
  },
  quantumLevel: {
    type: Number,
    min: 0,
    max: 1,
    default: 0.5
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    completions: {
      type: Number,
      default: 0
    },
    averageTime: {
      type: Number,
      default: 0
    },
    ratings: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  metadata: {
    language: {
      type: String,
      default: 'ru'
    },
    accessibility: {
      audioDescription: {
        type: Boolean,
        default: false
      },
      signLanguage: {
        type: Boolean,
        default: false
      },
      subtitles: [{
        language: String,
        url: String
      }]
    }
  }
}, {
  timestamps: true
});

// Indexes
lessonSchema.index({ course: 1, order: 1 });
lessonSchema.index({ type: 1, isPublished: 1 });

// Virtual for completion rate
lessonSchema.virtual('completionRate').get(function() {
  if (this.analytics.views === 0) return 0;
  return (this.analytics.completions / this.analytics.views) * 100;
});

// Method to add rating
lessonSchema.methods.addRating = function(userId, rating, comment) {
  // Remove existing rating from this user
  this.analytics.ratings = this.analytics.ratings.filter(
    r => r.user.toString() !== userId.toString()
  );
  
  // Add new rating
  this.analytics.ratings.push({
    user: userId,
    rating: rating,
    comment: comment
  });
  
  return this.save();
};

// Method to increment views
lessonSchema.methods.incrementViews = function() {
  this.analytics.views += 1;
  return this.save();
};

// Method to mark as completed
lessonSchema.methods.markCompleted = function() {
  this.analytics.completions += 1;
  return this.save();
};

module.exports = mongoose.model('Lesson', lessonSchema);