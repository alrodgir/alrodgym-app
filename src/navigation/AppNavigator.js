// Navegación inferior con 5 tabs
// Basada en el Figma

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../theme';

import DashboardScreen from '../screens/DashboardScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import PlanScreen from '../screens/PlanScreen';
import ProgressScreen from '../screens/ProgressScreen';
import BadgesScreen from '../screens/BadgesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ name, focused }) {
  return (
    <View style={styles.tabIconContainer}>
      <Ionicons
        name={name}
        size={22}
        color={focused ? colors.primary : colors.textMuted}
      />
      {focused && <View style={styles.activeDot} />}
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: styles.tabLabel,
          tabBarShowLabel: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="barbell" focused={focused} />,
            tabBarLabel: 'Entreno',
          }}
        />
        <Tab.Screen
          name="Plan"
          component={PlanScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="calendar" focused={focused} />,
            tabBarLabel: 'Plan',
          }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="stats-chart" focused={focused} />,
            tabBarLabel: 'Progreso',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} />,
            tabBarLabel: 'Perfil',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.navBackground + 'E6',
    borderTopWidth: 0.5,
    borderTopColor: colors.borderLight,
    paddingTop: 4,
    height: 70,
    paddingBottom: 16,
    position: 'absolute',
    elevation: 0,
  },
  tabLabel: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  tabIconContainer: {
    alignItems: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 2,
  },
});
