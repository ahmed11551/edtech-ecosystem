import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  Alert,
  BackHandler
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-netinfo/netinfo';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';
import LessonScreen from './src/screens/LessonScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ARScreen from './src/screens/ARScreen';
import VR3DScreen from './src/screens/VR3DScreen';
import NeuralInterfaceScreen from './src/screens/NeuralInterfaceScreen';
import MetaverseScreen from './src/screens/MetaverseScreen';
import HologramScreen from './src/screens/HologramScreen';
import QuantumMentorScreen from './src/screens/QuantumMentorScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';

// Context
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator
function MainTabs() {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Courses':
              iconName = 'school';
              break;
            case 'AR':
              iconName = '3d-rotation';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00d4ff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarStyle: {
          backgroundColor: 'rgba(26, 26, 46, 0.95)',
          borderTopColor: 'rgba(0, 212, 255, 0.3)',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Главная',
        }}
      />
      <Tab.Screen 
        name="Courses" 
        component={CoursesScreen}
        options={{
          tabBarLabel: 'Курсы',
        }}
      />
      <Tab.Screen 
        name="AR" 
        component={ARScreen}
        options={{
          tabBarLabel: 'AR/VR',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
function AppNavigator() {
  const { user, loading } = useAuth();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          'Нет подключения',
          'Проверьте интернет-соединение для полной функциональности приложения',
          [{ text: 'OK' }]
        );
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Выход из приложения',
        'Вы уверены, что хотите выйти?',
        [
          { text: 'Отмена', onPress: () => null, style: 'cancel' },
          { text: 'Выйти', onPress: () => BackHandler.exitApp() },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent={true}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#0f0f23' },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        {!user ? (
          // Auth Screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Main App Screens
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen 
              name="CourseDetail" 
              component={CourseDetailScreen}
              options={{
                headerShown: true,
                headerTitle: 'Детали курса',
                headerStyle: {
                  backgroundColor: '#1a1a2e',
                  borderBottomColor: 'rgba(0, 212, 255, 0.3)',
                },
                headerTintColor: '#00d4ff',
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen 
              name="Lesson" 
              component={LessonScreen}
              options={{
                headerShown: true,
                headerTitle: 'Урок',
                headerStyle: {
                  backgroundColor: '#1a1a2e',
                  borderBottomColor: 'rgba(0, 212, 255, 0.3)',
                },
                headerTintColor: '#00d4ff',
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen 
              name="Payment" 
              component={PaymentScreen}
              options={{
                headerShown: true,
                headerTitle: 'Оплата',
                headerStyle: {
                  backgroundColor: '#1a1a2e',
                  borderBottomColor: 'rgba(0, 212, 255, 0.3)',
                },
                headerTintColor: '#00d4ff',
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{
                headerShown: true,
                headerTitle: 'Настройки',
                headerStyle: {
                  backgroundColor: '#1a1a2e',
                  borderBottomColor: 'rgba(0, 212, 255, 0.3)',
                },
                headerTintColor: '#00d4ff',
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen 
              name="VR3D" 
              component={VR3DScreen}
              options={{
                headerShown: true,
                headerTitle: '3D Обучение',
                headerStyle: {
                  backgroundColor: '#1a1a2e',
                  borderBottomColor: 'rgba(0, 212, 255, 0.3)',
                },
                headerTintColor: '#00d4ff',
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen 
              name="NeuralInterface" 
              component={NeuralInterfaceScreen}
              options={{
                headerShown: true,
                headerTitle: 'Нейроинтерфейс',
                headerStyle: {
                  backgroundColor: '#1a1a2e',
                  borderBottomColor: 'rgba(0, 212, 255, 0.3)',
                },
                headerTintColor: '#00d4ff',
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen 
              name="Metaverse" 
              component={MetaverseScreen}
              options={{
                headerShown: true,
                headerTitle: 'Метавселенная',
                headerStyle: {
                  backgroundColor: '#1a1a2e',
                  borderBottomColor: 'rgba(0, 212, 255, 0.3)',
                },
                headerTintColor: '#00d4ff',
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen 
              name="Hologram" 
              component={HologramScreen}
              options={{
                headerShown: true,
                headerTitle: 'Голография',
                headerStyle: {
                  backgroundColor: '#1a1a2e',
                  borderBottomColor: 'rgba(0, 212, 255, 0.3)',
                },
                headerTintColor: '#00d4ff',
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen 
              name="QuantumMentor" 
              component={QuantumMentorScreen}
              options={{
                headerShown: true,
                headerTitle: 'Квантовые менторы',
                headerStyle: {
                  backgroundColor: '#1a1a2e',
                  borderBottomColor: 'rgba(0, 212, 255, 0.3)',
                },
                headerTintColor: '#00d4ff',
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen 
              name="Analytics" 
              component={AnalyticsScreen}
              options={{
                headerShown: true,
                headerTitle: 'Аналитика',
                headerStyle: {
                  backgroundColor: '#1a1a2e',
                  borderBottomColor: 'rgba(0, 212, 255, 0.3)',
                },
                headerTintColor: '#00d4ff',
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Main App Component
export default function App() {
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const getDeviceInfo = async () => {
      try {
        const info = {
          deviceId: await DeviceInfo.getUniqueId(),
          deviceName: await DeviceInfo.getDeviceName(),
          systemName: await DeviceInfo.getSystemName(),
          systemVersion: await DeviceInfo.getSystemVersion(),
          appVersion: await DeviceInfo.getVersion(),
          buildNumber: await DeviceInfo.getBuildNumber(),
          isTablet: await DeviceInfo.isTablet(),
          hasNotch: await DeviceInfo.hasNotch(),
          brand: await DeviceInfo.getBrand(),
          model: await DeviceInfo.getModel(),
        };
        setDeviceInfo(info);
        console.log('Device Info:', info);
      } catch (error) {
        console.error('Error getting device info:', error);
      }
    };

    getDeviceInfo();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <View style={styles.container}>
          <LinearGradient
            colors={['#0f0f23', '#1a1a2e', '#16213e']}
            style={styles.gradient}
          >
            <AppNavigator />
          </LinearGradient>
        </View>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});
