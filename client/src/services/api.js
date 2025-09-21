import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/password', passwordData),
  logout: () => api.post('/auth/logout'),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
};

// Users API
export const usersAPI = {
  getUsers: (params) => api.get('/users', { params }),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getUsersStats: () => api.get('/users/stats'),
};

// Courses API
export const coursesAPI = {
  getCourses: (params) => api.get('/courses', { params }),
  getCourse: (id) => api.get(`/courses/${id}`),
  createCourse: (courseData) => api.post('/courses', courseData),
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  enrollCourse: (id) => api.post(`/courses/${id}/enroll`),
  unenrollCourse: (id) => api.delete(`/courses/${id}/enroll`),
  getMyCourses: () => api.get('/courses/my'),
  getPopularCourses: () => api.get('/courses/popular'),
  searchCourses: (query, filters) => api.get('/courses/search', { params: { q: query, ...filters } }),
  getCourseAnalytics: (id) => api.get(`/courses/${id}/analytics`),
};

// Lessons API
export const lessonsAPI = {
  getLessons: (courseId) => api.get(`/lessons?course=${courseId}`),
  getLesson: (id) => api.get(`/lessons/${id}`),
  createLesson: (lessonData) => api.post('/lessons', lessonData),
  updateLesson: (id, lessonData) => api.put(`/lessons/${id}`, lessonData),
  deleteLesson: (id) => api.delete(`/lessons/${id}`),
  getNextLesson: (courseId, currentOrder) => api.get(`/lessons/next?course=${courseId}&order=${currentOrder}`),
  getPreviousLesson: (courseId, currentOrder) => api.get(`/lessons/previous?course=${courseId}&order=${currentOrder}`),
};

// Progress API
export const progressAPI = {
  getProgress: (courseId) => api.get(`/progress?course=${courseId}`),
  updateProgress: (lessonId, progressData) => api.put(`/progress/${lessonId}`, progressData),
  getMyProgress: () => api.get('/progress/my'),
  getCourseProgress: (courseId) => api.get(`/progress/course/${courseId}`),
  markLessonComplete: (lessonId) => api.post(`/progress/${lessonId}/complete`),
  getStats: () => api.get('/progress/stats'),
};

// Recommendations API
export const recommendationsAPI = {
  getRecommendations: () => api.get('/recommendations'),
  getCourseRecommendations: (courseId) => api.get(`/recommendations/course/${courseId}`),
  updatePreferences: (preferences) => api.put('/recommendations/preferences', preferences),
  getSimilarCourses: (courseId) => api.get(`/recommendations/similar/${courseId}`),
  getTrendingCourses: () => api.get('/recommendations/trending'),
};

// Analytics API
export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getCourseAnalytics: (courseId) => api.get(`/analytics/course/${courseId}`),
  getUserAnalytics: (userId) => api.get(`/analytics/user/${userId}`),
  getLearningPath: () => api.get('/analytics/learning-path'),
  getProgressChart: (period) => api.get(`/analytics/progress-chart?period=${period}`),
  getEngagementMetrics: () => api.get('/analytics/engagement'),
};

// File upload API
export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadVideo: (file) => {
    const formData = new FormData();
    formData.append('video', file);
    return api.post('/upload/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append('document', file);
    return api.post('/upload/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Search API
export const searchAPI = {
  search: (query, filters) => api.get('/search', { params: { q: query, ...filters } }),
  getSuggestions: (query) => api.get('/search/suggestions', { params: { q: query } }),
  getTrending: () => api.get('/search/trending'),
  getRecent: () => api.get('/search/recent'),
};

export default api;
