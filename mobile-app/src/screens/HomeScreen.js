import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import NetInfo from '@react-native-netinfo/netinfo';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [quantumLevel, setQuantumLevel] = useState(95);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const quickActions = [
    {
      id: 'quantum-ai',
      title: 'Квантовый ИИ',
      subtitle: 'Активировать ИИ-систему',
      icon: '🧠',
      gradient: ['#00d4ff', '#0099cc'],
      onPress: () => navigation.navigate('Analytics'),
    },
    {
      id: 'metaverse',
      title: 'Метавселенная',
      subtitle: 'Виртуальные миры',
      icon: '🌐',
      gradient: ['#ff6b6b', '#ee5a52'],
      onPress: () => navigation.navigate('Metaverse'),
    },
    {
      id: 'neural-interface',
      title: 'Нейроинтерфейс',
      subtitle: 'Управление мыслями',
      icon: '⚡',
      gradient: ['#4ecdc4', '#44a08d'],
      onPress: () => navigation.navigate('NeuralInterface'),
    },
    {
      id: 'hologram',
      title: 'Голография',
      subtitle: '3D проекции',
      icon: '✨',
      gradient: ['#a8edea', '#fed6e3'],
      onPress: () => navigation.navigate('Hologram'),
    },
    {
      id: 'quantum-mentors',
      title: 'Квантовые менторы',
      subtitle: 'ИИ-наставники',
      icon: '🤖',
      gradient: ['#ffecd2', '#fcb69f'],
      onPress: () => navigation.navigate('QuantumMentor'),
    },
    {
      id: 'vr-3d',
      title: 'VR/3D Обучение',
      subtitle: 'Иммерсивное обучение',
      icon: '🥽',
      gradient: ['#667eea', '#764ba2'],
      onPress: () => navigation.navigate('VR3D'),
    },
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'Квантовая физика для ИИ',
      progress: 75,
      thumbnail: '🧬',
      instructor: 'Др. Алексей Квантов',
      duration: '8 недель',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Нейроинтерфейсы будущего',
      progress: 45,
      thumbnail: '🧠',
      instructor: 'Проф. Мария Нейрон',
      duration: '10 недель',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Метавселенная для образования',
      progress: 90,
      thumbnail: '🌐',
      instructor: 'Архитектор Виртуальных Миров',
      duration: '6 недель',
      rating: 4.7,
    },
  ];

  const stats = [
    { label: 'Курсы', value: '12', icon: '📚' },
    { label: 'Уроки', value: '156', icon: '🎓' },
    { label: 'Сертификаты', value: '8', icon: '🏆' },
    { label: 'Часы обучения', value: '342', icon: '⏱️' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00d4ff"
            colors={['#00d4ff']}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>
                Добро пожаловать,{'\n'}
                <Text style={styles.userName}>{user?.name || 'Студент'}</Text>
              </Text>
              <Text style={styles.subtitle}>
                Готовы к обучению будущего? 🚀
              </Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Icon name="person" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Connection Status */}
          <View style={styles.connectionStatus}>
            <Icon 
              name={isConnected ? "wifi" : "wifi-off"} 
              size={16} 
              color={isConnected ? "#28a745" : "#dc3545"} 
            />
            <Text style={[
              styles.connectionText,
              { color: isConnected ? "#28a745" : "#dc3545" }
            ]}>
              {isConnected ? 'Подключено' : 'Нет соединения'}
            </Text>
          </View>
        </View>

        {/* Quantum AI Status */}
        <View style={styles.quantumStatus}>
          <LinearGradient
            colors={['rgba(0, 212, 255, 0.1)', 'rgba(0, 153, 204, 0.1)']}
            style={styles.quantumCard}
          >
            <View style={styles.quantumHeader}>
              <Text style={styles.quantumTitle}>🧠 Квантовая ИИ-система</Text>
              <View style={styles.quantumLevel}>
                <Text style={styles.quantumLevelText}>{quantumLevel}%</Text>
              </View>
            </View>
            <Text style={styles.quantumSubtitle}>
              Система работает на максимальной мощности
            </Text>
            <View style={styles.quantumProgress}>
              <View 
                style={[
                  styles.quantumProgressBar,
                  { width: `${quantumLevel}%` }
                ]} 
              />
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Быстрые действия</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={action.onPress}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={action.gradient}
                  style={styles.quickActionGradient}
                >
                  <Text style={styles.quickActionIcon}>{action.icon}</Text>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Ваша статистика</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📚 Недавние курсы</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
              <Text style={styles.seeAllText}>Все курсы →</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.coursesScroll}
          >
            {recentCourses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => navigation.navigate('CourseDetail', { course })}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                  style={styles.courseGradient}
                >
                  <View style={styles.courseHeader}>
                    <Text style={styles.courseThumbnail}>{course.thumbnail}</Text>
                    <View style={styles.courseRating}>
                      <Icon name="star" size={14} color="#ffc107" />
                      <Text style={styles.courseRatingText}>{course.rating}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.courseTitle} numberOfLines={2}>
                    {course.title}
                  </Text>
                  
                  <Text style={styles.courseInstructor}>
                    👨‍🏫 {course.instructor}
                  </Text>
                  
                  <Text style={styles.courseDuration}>
                    ⏱️ {course.duration}
                  </Text>
                  
                  <View style={styles.courseProgress}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${course.progress}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>{course.progress}%</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 30,
  },
  userName: {
    color: '#00d4ff',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 5,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  connectionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  quantumStatus: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  quantumCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  quantumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantumTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  quantumLevel: {
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quantumLevelText: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: '700',
  },
  quantumSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 15,
  },
  quantumProgress: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  quantumProgressBar: {
    height: '100%',
    backgroundColor: '#00d4ff',
    borderRadius: 3,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#00d4ff',
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 15,
  },
  quickActionCard: {
    width: (width - 55) / 2,
    height: 120,
    borderRadius: 15,
    overflow: 'hidden',
  },
  quickActionGradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00d4ff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  coursesScroll: {
    paddingLeft: 20,
  },
  courseCard: {
    width: 280,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  courseGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  courseThumbnail: {
    fontSize: 32,
  },
  courseRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courseRatingText: {
    color: '#ffc107',
    fontSize: 12,
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
    lineHeight: 20,
  },
  courseInstructor: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  courseDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 15,
  },
  courseProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00d4ff',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#00d4ff',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default HomeScreen;
