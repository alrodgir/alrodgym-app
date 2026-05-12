// History & Progress — Pantalla de histórico con gráficos de progresión
// Basada en el Figma: 08-history-v2.png

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, useThemeColors, typography, spacing, radius } from '../theme';
import { Card } from '../components';
import { workoutHistory } from '../data';

const PERIODS = ['1M', '3M', '6M', '1A', 'TODO'];
const LIFTS = ['Press Banca', 'Sentadilla', 'Peso Muerto'];

export default function ProgressScreen() {
  const colors = useThemeColors();
  const [selectedLift, setSelectedLift] = useState(0);
  const [period, setPeriod] = useState('3M');
  const [expandedWorkout, setExpandedWorkout] = useState(null);

  // Simulated PR data for charts
  const prData = {
    'Press Banca': [95, 100, 105, 110, 115, 120],
    'Sentadilla': [120, 130, 140, 145, 150, 155],
    'Peso Muerto': [160, 170, 175, 185, 190, 195],
  };

  const weekVolume = [
    { week: 'S1', power: 8500, pump: 6200, upper: 0, lower: 0 },
    { week: 'S2', power: 9200, pump: 5800, upper: 0, lower: 0 },
    { week: 'S3', power: 8800, pump: 6500, upper: 0, lower: 0 },
    { week: 'S4', power: 10200, pump: 7100, upper: 0, lower: 0 },
    { week: 'S5', power: 9800, pump: 6900, upper: 0, lower: 0 },
    { week: 'S6', power: 11200, pump: 7400, upper: 0, lower: 0 },
  ];

  const maxVolume = Math.max(...weekVolume.map(w => w.power + w.pump));

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

        <Text style={styles.screenTitle}>PROGRESIÓN</Text>

        {/* 1RM Progress Chart */}
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>1RM EVOLUTION</Text>

          {/* Lift selector */}
          <View style={styles.liftSelector}>
            {LIFTS.map((lift, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedLift(i)}
                style={[styles.liftTab, i === selectedLift && styles.liftTabActive]}
              >
                <Text style={[styles.liftTabText, i === selectedLift && { color: colors.primary }]}>
                  {lift}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Mini chart (dots + lines) */}
          <View style={styles.miniChart}>
            {prData[LIFTS[selectedLift]].map((val, i) => {
              const max = Math.max(...prData[LIFTS[selectedLift]]);
              const height = (val / max) * 120;
              return (
                <View key={i} style={styles.chartBar}>
                  <View style={[styles.chartDot, { height: Math.max(height, 20) }]}>
                    <View style={styles.chartDotInner} />
                  </View>
                  <Text style={styles.chartLabel}>{val}</Text>
                </View>
              );
            })}
          </View>

          {/* Period selector */}
          <View style={styles.periodSelector}>
            {PERIODS.map((p, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setPeriod(p)}
                style={[styles.periodTab, p === period && styles.periodTabActive]}
              >
                <Text style={[styles.periodText, p === period && { color: '#000' }]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Weekly Volume Chart */}
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>VOLUMEN SEMANAL</Text>
          <View style={styles.barChart}>
            {weekVolume.map((w, i) => (
              <View key={i} style={styles.barCol}>
                <View style={styles.barStack}>
                  <View style={[styles.barSegment, {
                    height: (w.power / maxVolume) * 100,
                    backgroundColor: colors.primary,
                  }]} />
                  <View style={[styles.barSegment, {
                    height: (w.pump / maxVolume) * 100,
                    backgroundColor: colors.accentCyan,
                  }]} />
                </View>
                <Text style={styles.barLabel}>{w.week}</Text>
              </View>
            ))}
          </View>
          <View style={styles.legend}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.legendText}>Power</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.legendDot, { backgroundColor: colors.accentCyan }]} />
              <Text style={styles.legendText}>Pump</Text>
            </View>
          </View>
        </Card>

        {/* History Timeline */}
        <Text style={[styles.screenTitle, { marginTop: spacing.md }]}>HISTORIAL</Text>

        {workoutHistory.map((w) => (
          <TouchableOpacity
            key={w.id}
            onPress={() => setExpandedWorkout(expandedWorkout === w.id ? null : w.id)}
          >
            <Card style={styles.historyCard}>
              <View style={styles.historyRow}>
                <View style={styles.historyDate}>
                  <Text style={styles.historyDay}>
                    {new Date(w.date).getDate()}
                  </Text>
                  <Text style={styles.historyMonth}>
                    {new Date(w.date).toLocaleString('es', { month: 'short' }).toUpperCase()}
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.historyRoutine}>{w.routine}</Text>
                  <Text style={styles.historyMeta}>
                    {w.duration} · {w.volume} kg
                  </Text>
                </View>
                <View style={styles.historyBadges}>
                  {w.medals.map((m, i) => (
                    <Ionicons key={i} name="medal" size={16} color="#FFD700" style={{ marginLeft: -4 }} />
                  ))}
                </View>
                <Ionicons
                  name={expandedWorkout === w.id ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={colors.textMuted}
                />
              </View>

              {expandedWorkout === w.id && (
                <View style={styles.expandedDetail}>
                  {w.exercises.map((ex, i) => (
                    <View key={i} style={styles.exHistoryRow}>
                      <Ionicons name="barbell-outline" size={14} color={colors.textMuted} />
                      <Text style={styles.exHistoryText}>{ex}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Card>
          </TouchableOpacity>
        ))}

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
    marginBottom: spacing.sm,
  },
  // Charts
  chartCard: {
    marginHorizontal: 20,
  },
  chartTitle: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  liftSelector: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  liftTab: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: radius.sm,
    marginRight: 6,
    backgroundColor: colors.surfaceContainer,
  },
  liftTabActive: {
    backgroundColor: colors.primary + '20',
  },
  liftTabText: {
    ...typography.captionBold,
    color: colors.textMuted,
    fontSize: 11,
  },
  miniChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
    paddingBottom: 20,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  chartDot: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chartDotInner: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: colors.primary,
  },
  chartLabel: {
    ...typography.caption,
    color: colors.textPrimary,
    marginTop: 4,
    fontSize: 11,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  periodTab: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: radius.sm,
    marginHorizontal: 3,
    backgroundColor: colors.surfaceContainer,
  },
  periodTabActive: {
    backgroundColor: colors.primary,
  },
  periodText: {
    ...typography.captionBold,
    color: colors.textMuted,
    fontSize: 11,
  },
  // Bar Chart
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 120,
    alignItems: 'flex-end',
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
  },
  barStack: {
    width: 20,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barSegment: {
    width: '100%',
    borderRadius: 2,
  },
  barLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 4,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  legendDot: {
    width: 8, height: 8, borderRadius: 4, marginRight: 4,
  },
  legendText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  // History
  historyCard: {
    marginHorizontal: 20,
    padding: spacing.sm,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyDate: {
    width: 44,
    alignItems: 'center',
  },
  historyDay: {
    ...typography.h2,
    color: colors.primary,
    lineHeight: 26,
  },
  historyMonth: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 10,
    letterSpacing: 1,
  },
  historyRoutine: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  historyMeta: {
    ...typography.caption,
    color: colors.textMuted,
  },
  historyBadges: {
    flexDirection: 'row',
    marginRight: spacing.sm,
  },
  expandedDetail: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  exHistoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },
  exHistoryText: {
    ...typography.caption,
    color: colors.textPrimary,
    marginLeft: 8,
  },
});
