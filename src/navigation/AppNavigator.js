import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { typography } from '../theme';
import { useTheme } from '../theme/ThemeContext';

import DashboardScreen from '../screens/DashboardScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import PlanScreen from '../screens/PlanScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ name, focused, c }) {
  return (
    <View style={tabIconStyles.container}>
      <Ionicons name={name} size={22} color={focused ? c.primary : c.textMuted} />
      {focused && <View style={[tabIconStyles.activeDot, { backgroundColor: c.primary }]} />}
    </View>
  );
}

const tabIconStyles = StyleSheet.create({
  container: { alignItems: 'center' },
  activeDot: { width: 4, height: 4, borderRadius: 2, marginTop: 2 },
});

export default function AppNavigator() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: c.surface + 'E6',
            borderTopWidth: 0.5,
            borderTopColor: c.border || 'rgba(255,255,255,0.06)',
            paddingTop: 4,
            height: 70,
            paddingBottom: 16,
            position: 'absolute',
            elevation: 0,
          },
          tabBarActiveTintColor: c.primary,
          tabBarInactiveTintColor: c.textMuted,
          tabBarLabelStyle: {
            fontFamily: 'SpaceGrotesk_700Bold',
            fontSize: 10,
            letterSpacing: 0.5,
          },
          tabBarShowLabel: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} c={c} />,
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="barbell" focused={focused} c={c} />,
            tabBarLabel: 'Entreno',
          }}
        />
        <Tab.Screen
          name="Plan"
          component={PlanScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="calendar" focused={focused} c={c} />,
            tabBarLabel: 'Plan',
          }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="stats-chart" focused={focused} c={c} />,
            tabBarLabel: 'Progreso',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} c={c} />,
            tabBarLabel: 'Perfil',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
