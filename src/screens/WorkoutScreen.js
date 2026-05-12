// Live Workout — Pantalla de entrenamiento en vivo (V2)
// Basada en el Figma: 10-workout-v2.png

import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '../theme';
import { Card, PrimaryButton, SetRow } from '../components';
import { TODAY } from '../data';

function Timer({ initial = 90 }) {
  const [time, setTime] = useState(initial);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(t => { if (t <= 1) { setRunning(false); return 0; } return t - 1; });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, time]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerLabel}>REST TIMER</Text>
      <Text style={styles.timerDisplay}>{formatTime(time)}</Text>
      <View style={styles.timerControls}>
        <TouchableOpacity
          style={styles.timerBtn}
          onPress={() => setTime(t => Math.max(0, t - 30))}
        >
          <Text style={styles.timerBtnText}>-30s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timerBtn, styles.timerBtnPrimary]}
          onPress={() => setRunning(!running)}
        >
          <Ionicons name={running ? 'pause' : 'play'} size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timerBtn}
          onPress={() => setTime(t => t + 30)}
        >
          <Text style={styles.timerBtnText}>+30s</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function WorkoutScreen() {
  const exercise = TODAY.currentExercise;
  const [sets, setSets] = useState(
    exercise.sets.map((s, i) => ({ ...s, number: i + 1 }))
  );
  const activeSetIndex = sets.findIndex(s => !s.done);

  const toggleSet = (index) => {
    const copy = [...sets];
    copy[index] = { ...copy[index], done: !copy[index].done };
    setSets(copy);
  };

  const addSet = () => {
    setSets([...sets, {
      number: sets.length + 1, weight: 60, reps: 8, rir: 2, done: false,
    }]);
  };

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

        {/* Timer */}
        <Timer initial={102} />

        {/* Exercise Info */}
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseCategory}>LEGS / HYPERTROPHY</Text>
          <Text style={styles.exerciseName}>{exercise.name || 'Barbell Back Squat'}</Text>
          <Text style={styles.exerciseProgress}>SET {activeSetIndex + 1} / {sets.length}</Text>
        </View>

        {/* Exercise Image Placeholder */}
        <Card style={styles.exerciseImgCard}>
          <View style={styles.exerciseImgPlaceholder}>
            <Ionicons name="videocam-outline" size={40} color={colors.textMuted} />
            <Text style={{ color: colors.textMuted, marginTop: 8 }}>Squat Demo</Text>
          </View>
          <View style={styles.lastLiftRow}>
            <Text style={styles.lastLiftText}>LAST LIFT: 120kg x 8 reps</Text>
            <Ionicons name="information-circle-outline" size={20} color={colors.textMuted} />
          </View>
        </Card>

        {/* Sets Table */}
        <View style={styles.setsHeader}>
          <Text style={styles.setsHeaderTitle}>SERIES</Text>
        </View>
        <View style={styles.setsContainer}>
          {/* Column headers */}
          <View style={styles.setsColHeader}>
            <Text style={styles.colHeaderText}>SET</Text>
            <Text style={styles.colHeaderText}>KG</Text>
            <Text style={styles.colHeaderText}>REPS</Text>
            <Text style={styles.colHeaderText}>RIR</Text>
            <View style={{ width: 24 }} />
          </View>

          {sets.map((set, i) => (
            <SetRow
              key={i}
              number={set.number}
              weight={set.weight}
              reps={set.reps}
              rir={set.rir || 0}
              done={set.done}
              active={i === activeSetIndex}
              onPress={() => toggleSet(i)}
            />
          ))}

          <TouchableOpacity style={styles.addSetBtn} onPress={addSet}>
            <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
            <Text style={styles.addSetText}>+ ADD SET</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.historyBtn}>
            <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            <Text style={styles.historyText}>HISTORY</Text>
          </TouchableOpacity>
        </View>

        {/* Metrics Summary */}
        <View style={styles.summaryRow}>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>INTENSITY</Text>
            <Text style={styles.summaryValue}>85%</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>VOLUME</Text>
            <Text style={styles.summaryValue}>4.2 T</Text>
          </Card>
        </View>

        {/* Finish Button */}
        <PrimaryButton
          title="FINISH WORKOUT"
          icon="checkmark-circle"
          onPress={() => {}}
          style={{ marginHorizontal: 20, marginBottom: 100 }}
        />
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
  // Timer
  timerContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  timerLabel: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  timerDisplay: {
    fontFamily: 'Anybody_800ExtraBold',
    fontSize: 56,
    lineHeight: 60,
    color: colors.textPrimary,
    letterSpacing: -0.02,
  },
  timerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  timerBtn: {
    width: 56, height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  timerBtnPrimary: {
    backgroundColor: colors.primary,
    width: 48, height: 48, borderRadius: 24,
  },
  timerBtnText: {
    ...typography.captionBold,
    color: colors.textSecondary,
  },
  // Exercise Info
  exerciseInfo: {
    paddingHorizontal: 20,
    marginBottom: spacing.sm,
  },
  exerciseCategory: {
    ...typography.caption,
    color: colors.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  exerciseName: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  exerciseProgress: {
    ...typography.body,
    color: colors.primary,
  },
  // Exercise Image
  exerciseImgCard: {
    marginHorizontal: 20,
    padding: 0,
    overflow: 'hidden',
  },
  exerciseImgPlaceholder: {
    height: 180,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastLiftRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  lastLiftText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  // Sets
  setsContainer: {
    paddingHorizontal: 20,
  },
  setsHeader: {
    paddingHorizontal: 20,
    marginBottom: spacing.sm,
  },
  setsHeaderTitle: {
    ...typography.label,
    color: colors.textSecondary,
  },
  setsColHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingLeft: 36,
  },
  colHeaderText: {
    ...typography.caption,
    color: colors.textMuted,
    width: 70,
    fontSize: 11,
  },
  addSetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary + '40',
    borderRadius: radius.md,
    borderStyle: 'dashed',
    marginTop: spacing.xs,
  },
  addSetText: {
    ...typography.label,
    color: colors.primary,
    marginLeft: 6,
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  historyText: {
    ...typography.caption,
    color: colors.textMuted,
    marginLeft: 6,
    letterSpacing: 2,
  },
  // Summary
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  summaryCard: {
    width: '48%',
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.label,
    color: colors.textMuted,
  },
  summaryValue: {
    ...typography.displaySmall,
    color: colors.primary,
  },
});
