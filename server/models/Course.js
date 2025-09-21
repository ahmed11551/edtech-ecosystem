const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  level: {
    type: String,
    enum: ['Начинающий', 'Средний', 'Продвинутый', 'Эксперт'],
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['quantum', 'neurotech', 'metaverse', 'hologram', 'telepathy', 'programming', 'ai', 'vr', 'ar']
  },
  tags: [{
    type: String,
    trim: true
  }],
  duration: {
    type: Number, // in minutes
    required: true
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  studentsCount: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  requirements: [{
    type: String,
    trim: true
  }],
  learningOutcomes: [{
    type: String,
    trim: true
  }],
  quantumLevel: {
    type: Number,
    min: 0,
    max: 1,
    default: 0.8
  },
  metaverseWorld: {
    type: String,
    enum: ['dna-lab', 'space-station', 'ancient-rome', 'code-matrix', 'quantum-realm', 'art-gallery'],
    default: null
  },
  holographicContent: [{
    type: {
      type: String,
      enum: ['dna', 'atom', 'heart', 'brain', 'solar', 'molecule']
    },
    title: String,
    description: String
  }],
  neuralInterface: {
    enabled: {
      type: Boolean,
      default: false
    },
    commands: [{
      type: String,
      trim: true
    }]
  },
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    enrollments: {
      type: Number,
      default: 0
    },
    completions: {
      type: Number,
      default: 0
    },
    averageCompletionTime: {
      type: Number,
      default: 0
    }
  },
  metadata: {
    language: {
      type: String,
      default: 'ru'
    },
    subtitles: [{
      language: String,
      url: String
    }],
    accessibility: {
      audioDescription: {
        type: Boolean,
        default: false
      },
      signLanguage: {
        type: Boolean,
        default: false
      }
    }
  }
}, {
  timestamps: true
});

// Index for search
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });
courseSchema.index({ category: 1, level: 1, price: 1 });
courseSchema.index({ isPublished: 1, isFeatured: 1 });

// Virtual for completion rate
courseSchema.virtual('completionRate').get(function() {
  if (this.analytics.enrollments === 0) return 0;
  return (this.analytics.completions / this.analytics.enrollments) * 100;
});

// Method to update rating
courseSchema.methods.updateRating = function(newRating) {
  const totalRating = this.rating.average * this.rating.count + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

// Method to increment views
courseSchema.methods.incrementViews = function() {
  this.analytics.views += 1;
  return this.save();
};

module.exports = mongoose.model('Course', courseSchema);