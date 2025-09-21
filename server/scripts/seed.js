const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

const connectDB = require('../config/database');

const seedData = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Начинаем заполнение базы данных...');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Lesson.deleteMany({});

    // Create users
    const users = await User.create([
      {
        firstName: 'Альберт',
        lastName: 'Квантов',
        email: 'einstein@edtech.com',
        password: 'password123',
        role: 'instructor',
        bio: 'Эксперт по квантовой физике и теории относительности',
        skills: ['Квантовая физика', 'Теория относительности', 'Математика'],
        quantumProfile: {
          learningStyle: 'quantum_visual',
          cognitiveLoad: 0.9,
          emotionalState: 'focused',
          quantumSignature: 'q_einstein_2025'
        }
      },
      {
        firstName: 'Алан',
        lastName: 'Тьюринг',
        email: 'turing@edtech.com',
        password: 'password123',
        role: 'instructor',
        bio: 'Мастер алгоритмов и квантовых вычислений',
        skills: ['Программирование', 'Алгоритмы', 'ИИ'],
        quantumProfile: {
          learningStyle: 'quantum_visual',
          cognitiveLoad: 0.95,
          emotionalState: 'excited',
          quantumSignature: 'q_turing_2025'
        }
      },
      {
        firstName: 'Мария',
        lastName: 'Кюри',
        email: 'curie@edtech.com',
        password: 'password123',
        role: 'instructor',
        bio: 'Эксперт по молекулярной биологии и химическим реакциям',
        skills: ['Химия', 'Биология', 'Физика'],
        quantumProfile: {
          learningStyle: 'kinesthetic',
          cognitiveLoad: 0.8,
          emotionalState: 'excited',
          quantumSignature: 'q_curie_2025'
        }
      },
      {
        firstName: 'Леонардо',
        lastName: 'да Винчи',
        email: 'davinci@edtech.com',
        password: 'password123',
        role: 'instructor',
        bio: 'Гений творчества и инноваций',
        skills: ['Искусство', 'Дизайн', 'Инженерия'],
        quantumProfile: {
          learningStyle: 'visual',
          cognitiveLoad: 0.7,
          emotionalState: 'relaxed',
          quantumSignature: 'q_davinci_2025'
        }
      },
      {
        firstName: 'Стивен',
        lastName: 'Хокинг',
        email: 'hawking@edtech.com',
        password: 'password123',
        role: 'instructor',
        bio: 'Мастер космоса и черных дыр',
        skills: ['Космология', 'Физика', 'Математика'],
        quantumProfile: {
          learningStyle: 'quantum_visual',
          cognitiveLoad: 0.9,
          emotionalState: 'focused',
          quantumSignature: 'q_hawking_2025'
        }
      },
      {
        firstName: 'Никола',
        lastName: 'Тесла',
        email: 'tesla@edtech.com',
        password: 'password123',
        role: 'instructor',
        bio: 'Гений электричества и изобретений',
        skills: ['Электротехника', 'Физика', 'Изобретения'],
        quantumProfile: {
          learningStyle: 'kinesthetic',
          cognitiveLoad: 0.85,
          emotionalState: 'excited',
          quantumSignature: 'q_tesla_2025'
        }
      },
      {
        firstName: 'Иван',
        lastName: 'Студент',
        email: 'student@edtech.com',
        password: 'password123',
        role: 'student',
        bio: 'Студент, изучающий квантовые технологии',
        learningGoals: ['Квантовая физика', 'Программирование', 'ИИ'],
        quantumProfile: {
          learningStyle: 'quantum_visual',
          cognitiveLoad: 0.7,
          emotionalState: 'excited',
          quantumSignature: 'q_student_2025'
        }
      }
    ]);

    console.log(`✅ Создано ${users.length} пользователей`);

    // Create courses
    const courses = await Course.create([
      {
        title: 'Квантовая физика для ИИ',
        description: 'Изучение квантовых вычислений и их применение в искусственном интеллекте. Курс охватывает основы квантовой механики, квантовые алгоритмы и их реализацию в современных ИИ-системах.',
        shortDescription: 'Квантовые вычисления для ИИ',
        instructor: users[0]._id,
        thumbnail: 'https://via.placeholder.com/350x200/00d4ff/ffffff?text=Quantum+AI',
        price: 9990,
        originalPrice: 14990,
        level: 'Продвинутый',
        category: 'quantum',
        tags: ['квантовая физика', 'ИИ', 'алгоритмы'],
        duration: 3600,
        rating: { average: 4.9, count: 2500 },
        studentsCount: 2500,
        isPublished: true,
        isFeatured: true,
        requirements: ['Базовые знания физики', 'Знание математики'],
        learningOutcomes: ['Понимание квантовых принципов', 'Создание квантовых алгоритмов'],
        quantumLevel: 0.95,
        metaverseWorld: 'quantum-realm',
        holographicContent: [
          { type: 'atom', title: 'Структура атома', description: '3D модель атома водорода' },
          { type: 'molecule', title: 'Квантовая молекула', description: 'Интерактивная молекула' }
        ],
        neuralInterface: {
          enabled: true,
          commands: ['изучить кванты', 'показать алгоритм', 'запустить симуляцию']
        }
      },
      {
        title: 'Нейроинтерфейсы будущего',
        description: 'Управление обучением силой мысли. Изучение современных нейроинтерфейсов и их применение в образовании.',
        shortDescription: 'Управление мыслями',
        instructor: users[1]._id,
        thumbnail: 'https://via.placeholder.com/350x200/ff006e/ffffff?text=Neuro+Interface',
        price: 8990,
        originalPrice: 12990,
        level: 'Продвинутый',
        category: 'neurotech',
        tags: ['нейроинтерфейс', 'мозг', 'ИИ'],
        duration: 3000,
        rating: { average: 4.8, count: 1800 },
        studentsCount: 1800,
        isPublished: true,
        isFeatured: true,
        quantumLevel: 0.92,
        neuralInterface: {
          enabled: true,
          commands: ['активировать обучение', 'показать прогресс', 'синхронизировать мозг']
        }
      },
      {
        title: 'Метавселенная для образования',
        description: 'Создание образовательных миров в виртуальной реальности. Изучение возможностей VR/AR в обучении.',
        shortDescription: 'Обучение в VR',
        instructor: users[2]._id,
        thumbnail: 'https://via.placeholder.com/350x200/8338ec/ffffff?text=Metaverse',
        price: 7990,
        originalPrice: 11990,
        level: 'Средний',
        category: 'metaverse',
        tags: ['VR', 'AR', 'метавселенная'],
        duration: 2400,
        rating: { average: 4.7, count: 3200 },
        studentsCount: 3200,
        isPublished: true,
        isFeatured: true,
        quantumLevel: 0.88,
        metaverseWorld: 'space-station'
      },
      {
        title: 'Голографические проекции',
        description: '3D объекты в реальном пространстве. Создание и управление голографическими проекциями для обучения.',
        shortDescription: '3D голограммы',
        instructor: users[3]._id,
        thumbnail: 'https://via.placeholder.com/350x200/06ffa5/ffffff?text=Hologram',
        price: 6990,
        originalPrice: 9990,
        level: 'Средний',
        category: 'hologram',
        tags: ['голограммы', '3D', 'проекции'],
        duration: 2000,
        rating: { average: 4.6, count: 1500 },
        studentsCount: 1500,
        isPublished: true,
        quantumLevel: 0.85,
        holographicContent: [
          { type: 'dna', title: 'ДНК структура', description: 'Интерактивная модель ДНК' },
          { type: 'heart', title: 'Сердце человека', description: '3D модель сердца' }
        ]
      },
      {
        title: 'Телепатическое программирование',
        description: 'Кодирование силой мысли. Изучение новых методов программирования через нейроинтерфейсы.',
        shortDescription: 'Программирование мыслями',
        instructor: users[4]._id,
        thumbnail: 'https://via.placeholder.com/350x200/ffbe0b/ffffff?text=Telepathy',
        price: 11990,
        originalPrice: 17990,
        level: 'Эксперт',
        category: 'telepathy',
        tags: ['телепатия', 'программирование', 'нейроинтерфейс'],
        duration: 4200,
        rating: { average: 4.9, count: 800 },
        studentsCount: 800,
        isPublished: true,
        quantumLevel: 0.98,
        neuralInterface: {
          enabled: true,
          commands: ['создать код', 'отладить программу', 'запустить приложение']
        }
      },
      {
        title: 'Квантовые алгоритмы',
        description: 'Программирование квантовых компьютеров. Изучение квантовых алгоритмов и их реализация.',
        shortDescription: 'Квантовые алгоритмы',
        instructor: users[5]._id,
        thumbnail: 'https://via.placeholder.com/350x200/fb5607/ffffff?text=Quantum+Algo',
        price: 14990,
        originalPrice: 19990,
        level: 'Эксперт',
        category: 'quantum',
        tags: ['квантовые алгоритмы', 'программирование', 'физика'],
        duration: 4800,
        rating: { average: 4.8, count: 600 },
        studentsCount: 600,
        isPublished: true,
        quantumLevel: 0.99,
        metaverseWorld: 'quantum-realm'
      }
    ]);

    console.log(`✅ Создано ${courses.length} курсов`);

    // Create lessons for each course
    const lessons = [];
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      const courseLessons = await Lesson.create([
        {
          title: `Введение в ${course.title}`,
          description: `Основы и введение в тему курса ${course.title}`,
          course: course._id,
          order: 1,
          duration: 60,
          type: 'video',
          content: {
            video: {
              url: 'https://example.com/video1.mp4',
              thumbnail: course.thumbnail,
              duration: 60,
              quality: '1080p'
            }
          },
          isPublished: true,
          isFree: true,
          quantumLevel: course.quantumLevel * 0.8
        },
        {
          title: `Практические упражнения - ${course.title}`,
          description: `Практические задания для закрепления материала`,
          course: course._id,
          order: 2,
          duration: 90,
          type: 'assignment',
          content: {
            assignment: {
              instructions: 'Выполните практические задания по теме курса',
              points: 100
            }
          },
          isPublished: true,
          quantumLevel: course.quantumLevel * 0.9
        },
        {
          title: `Тест по ${course.title}`,
          description: `Проверка знаний по пройденному материалу`,
          course: course._id,
          order: 3,
          duration: 30,
          type: 'quiz',
          content: {
            quiz: {
              questions: [
                {
                  question: 'Что является основой квантовых вычислений?',
                  type: 'multiple_choice',
                  options: ['Классическая физика', 'Квантовая механика', 'Термодинамика'],
                  correctAnswer: 'Квантовая механика',
                  explanation: 'Квантовые вычисления основаны на принципах квантовой механики',
                  points: 1
                }
              ],
              passingScore: 70,
              attempts: 3
            }
          },
          isPublished: true,
          quantumLevel: course.quantumLevel
        }
      ]);
      lessons.push(...courseLessons);
    }

    console.log(`✅ Создано ${lessons.length} уроков`);

    // Update courses with lessons
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      const courseLessons = lessons.filter(lesson => lesson.course.toString() === course._id.toString());
      course.lessons = courseLessons.map(lesson => lesson._id);
      await course.save();
    }

    console.log('🎉 База данных успешно заполнена!');
    console.log(`📊 Статистика:`);
    console.log(`   👥 Пользователей: ${users.length}`);
    console.log(`   📚 Курсов: ${courses.length}`);
    console.log(`   📖 Уроков: ${lessons.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
    process.exit(1);
  }
};

seedData();
