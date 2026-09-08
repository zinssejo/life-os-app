import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import QuestsScreen from './src/screens/QuestsScreen';
import ShopScreen from './src/screens/ShopScreen';
import StatsScreen from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();
const EMOJI: Record<string, string> = { Heute: '🏠', Quests: '✅', Shop: '🪙', Stats: '📊' };

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { backgroundColor: '#0f172a', borderTopColor: '#1e293b' },
            tabBarActiveTintColor: '#4ade80',
            tabBarInactiveTintColor: '#64748b',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>{EMOJI[route.name]}</Text>,
          })}
        >
          <Tab.Screen name="Heute" component={HomeScreen} />
          <Tab.Screen name="Quests" component={QuestsScreen} />
          <Tab.Screen name="Shop" component={ShopScreen} />
          <Tab.Screen name="Stats" component={StatsScreen} />
        </Tab.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
