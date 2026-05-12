// Routines & Planning — Vista semanal de entrenamiento
// Basada en el Figma: 05-routines-v2.png

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, useThemeColors, typography, spacing, radius } from '../theme';
import { Card, DayCard } from '../components';
import { ROUTINES, activeUser } from '../data';

export default function PlanScreen() {
  const colors = useThemeColors();
  const routine = ROUTINES[activeUser.routine];
  const [selectedDay, setSelectedDay] = useState(
    routine.days.findIndex(d => d.type !== 'rest')
  );

  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <Ionicons name="barbell-outline" size={18} color={colors.primary} />
            <Text style={styles.brandText}>ALRODGYM</Text>
          </View>
          <Ionicons name="flame" size={20} color={colors.primary} />
        </View>

        <Text style={styles.screenTitle}>PLAN SEMANAL</Text>
        <Text style={styles.routineName}>{routine.name}</Text>

        {/* Week Horizontal */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekContainer}
        >
          {routine.days.map((day, i) => (
            <DayCard
              key={i}
              day={day.day}
              type={day.type}
              label={day.label}
              active={i === selectedDay}
              onPress={() => setSelectedDay(i)}
            />
          ))}
        </ScrollView>

        {/* Selected Day Detail */}
        {routine.days[selectedDay] && (
          <View style={styles.dayDetail}>
            <View style={styles.dayDetailHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.typeDot, {
                  backgroundColor: {
                    power: '#FF6B35', pump: '#0F3460',
                    upper: '#00C853', lower: '#9C27B0', rest: '#594139',
                  }[routine.days[selectedDay].type]
                }]} />
                <Text style={styles.dayDetailTitle}>
                  {routine.days[selectedDay].day.toUpperCase()} — {routine.days[selectedDay].label}
                </Text>
              </View>
            </View>

            {routine.days[selectedDay].exercises.length === 0 ? (
              <Card style={{ alignItems: 'center', padding: spacing.xl }}>
                <Ionicons name="bed-outline" size={48} color={colors.textMuted} />
                <Text style={{ ...typography.body, color: colors.textMuted, marginTop: spacing.sm }}>
                  Día de descanso. Recupérate bien.
                </Text>
                {/* Mobility suggestion */}
                <View style={{ marginTop: spacing.md, width: '100%' }}>
                  <Text style={{ ...typography.label, color: colors.textSecondary, marginBottom: spacing.sm }}>
                    MOVILIDAD SUGERIDA
                  </Text>
                  {['Doorway Chest Stretch', 'Bar Hang', '90/90 Hip', 'Hamstring Touch'].map((m, i) => (
                    <View key={i} style={styles.exerciseItem}>
                      <Ionicons name="ellipse" size={6} color={colors.primary} />
                      <Text style={styles.exerciseName}>{m}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            ) : (
              routine.days[selectedDay].exercises.map((ex, i) => (
                <Card key={i}>
                  <View style={styles.exerciseHeader}>
                    <Text style={styles.exerciseMainName}>{ex.name}</Text>
                  </View>
                  <View style={styles.exerciseDetails}>
                    <View style={styles.detailBadge}>
                      <Text style={styles.detailBadgeText}>{ex.sets}×{ex.targetReps}</Text>
                    </View>
                    {ex.weight && (
                      <View style={[styles.detailBadge, { backgroundColor: colors.primary + '20' }]}>
                        <Text style={[styles.detailBadgeText, { color: colors.primary }]}>{ex.weight} kg</Text>
                      </View>
                    )}
                    <View style={[styles.detailBadge, { backgroundColor: colors.rir0 + '20' }]}>
                      <Text style={[styles.detailBadgeText, { color: colors.rir1 }]}>RIR {ex.rir}</Text>
                    </View>
                  </View>
                </Card>
              ))
            )}
          </View>
        )}

        {/* Change Routine */}
        <TouchableOpacity style={styles.changeRoutine}>
          <Ionicons name="swap-horizontal-outline" size={18} color={colors.textMuted} />
          <Text style={styles.changeRoutineText}>CAMBIAR RUTINA</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: spacing.sm,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    ...typography.h3,
    color: colors.primary,
    marginLeft: 8,
    letterSpacing: 2,
  },
  screenTitle: {
    ...typography.label,
    color: colors.textSecondary,
    paddingHorizontal: 20,
    marginTop: spacing.sm,
  },
  routineName: {
    ...typography.h1,
    color: colors.textPrimary,
    paddingHorizontal: 20,
    marginBottom: spacing.md,
  },
  weekContainer: {
    paddingHorizontal: 20,
    paddingBottom: spacing.sm,
  },
  dayDetail: {
    paddingHorizontal: 20,
  },
  dayDetailHeader: {
    marginBottom: spacing.sm,
  },
  typeDot: {
    width: 10, height: 10, borderRadius: 5, marginRight: 8,
  },
  dayDetailTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  exerciseName: {
    ...typography.body,
    color: colors.textPrimary,
    marginLeft: 10,
  },
  exerciseHeader: {
    marginBottom: spacing.xs,
  },
  exerciseMainName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  exerciseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailBadge: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: spacing.xs,
    marginTop: spacing.xs,
  },
  detailBadgeText: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
  changeRoutine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    marginVertical: spacing.md,
  },
  changeRoutineText: {
    ...typography.label,
    color: colors.textMuted,
    marginLeft: 6,
  },
});
