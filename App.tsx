import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setupNotificationHandler } from './src/services/notifications';
import { getCurrentUser } from './src/services/auth';

import HomeScreen from './src/screens/HomeScreen';
import QuestsScreen from './src/screens/QuestsScreen';
import ShopScreen from './src/screens/ShopScreen';
import StatsScreen from './src/screens/StatsScreen';
import LoginScreen from './src/screens/LoginScreen';
import NFCScannerScreen from './src/screens/NFCScannerScreen';
import HealthScreen from './src/screens/HealthScreen';
import GeofenceScreen from './src/screens/GeofenceScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ExtendedTasksScreen from './src/screens/ExtendedTasksScreen';

setupNotificationHandler();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_ICONS: Record<string, string> = {
  Heute: '🏠', Quests: '✅', Shop: '🪙', Stats: '📊',
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0f172a', borderTopColor: '#1e293b', height: 60, paddingBottom: 8 },
        tabBarActiveTintColor: '#4ade80',
        tabBarInactiveTintColor: '#64748b',
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>{TAB_ICONS[route.name]}</Text>,
      })}
    >
      <Tab.Screen name="Heute" component={HomeScreen} />
      <Tab.Screen name="Quests" component={QuestsScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    getCurrentUser().then((u) => setLoggedIn(!!u)).catch(() => setLoggedIn(false));
  }, []);

  if (loggedIn === null) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#4ade80', fontSize: 32 }}>🌟</Text>
        <Text style={{ color: '#f1f5f9', marginTop: 8 }}>Lade...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!loggedIn ? (
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLogin={() => setLoggedIn(true)} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Main" component={HomeTabs} />
              <Stack.Screen name="NFC" component={NFCScannerScreen} options={{ headerShown: true, headerStyle: { backgroundColor: '#0f172a' }, headerTintColor: '#f1f5f9' }} />
              <Stack.Screen name="Health" component={HealthScreen} options={{ headerShown: true, headerStyle: { backgroundColor: '#0f172a' }, headerTintColor: '#f1f5f9' }} />
              <Stack.Screen name="Geofence" component={GeofenceScreen} options={{ headerShown: true, headerStyle: { backgroundColor: '#0f172a' }, headerTintColor: '#f1f5f9' }} />
              <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: true, headerStyle: { backgroundColor: '#0f172a' }, headerTintColor: '#f1f5f9' }} />
              <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: true, headerStyle: { backgroundColor: '#0f172a' }, headerTintColor: '#f1f5f9' }} />
              <Stack.Screen name="ExtendedTasks" component={ExtendedTasksScreen} options={{ headerShown: true, headerStyle: { backgroundColor: '#0f172a' }, headerTintColor: '#f1f5f9' }} />
            </>
          )}
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
