// Componentes reutilizables de AlrodGym

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '../theme';

// ─── Progress Ring ───
export function ProgressRing({ percent = 0, size = 60, strokeWidth = 6, children }) {
  const dimension = size + strokeWidth;
  const radius_val = size / 2;
  const circumference = 2 * Math.PI * radius_val;
  const progress = Math.min(Math.max(percent, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  // We'll use a simple View-based ring instead of SVG for simplicity
  return (
    <View style={{ width: dimension, height: dimension, justifyContent: 'center', alignItems: 'center' }}>
      {/* Background ring */}
      <View style={{
        position: 'absolute', width: dimension, height: dimension, borderRadius: dimension / 2,
        borderWidth: strokeWidth, borderColor: `${colors.secondary}80`,
      }} />
      {/* Progress indicator - simple approach */}
      <View style={{
        position: 'absolute', width: dimension, height: dimension, borderRadius: dimension / 2,
        borderWidth: strokeWidth,
        borderColor: colors.primary,
        opacity: progress / 100,
      }} />
      {children || (
        <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '800' }}>
          {Math.round(progress)}%
        </Text>
      )}
    </View>
  );
}

// ─── Card ───
export function Card({ children, style, onPress }) {
  const Container = onPress ? TouchableOpacity : View;
  return (
    <Container onPress={onPress} style={[styles.card, style]}>
      {children}
    </Container>
  );
}

// ─── Metric Card ───
export function MetricCard({ icon, label, value, sub, iconColor = colors.primary }) {
  return (
    <Card style={styles.metricCard}>
      <View style={[styles.metricIcon, { backgroundColor: iconColor + '20' }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      {sub && <Text style={styles.metricSub}>{sub}</Text>}
    </Card>
  );
}

// ─── Primary Button ───
export function PrimaryButton({ title, onPress, icon, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.primaryBtn, style]}>
      {icon && <Ionicons name={icon} size={20} color="#000" style={{ marginRight: 8 }} />}
      <Text style={styles.primaryBtnText}>{title}</Text>
    </TouchableOpacity>
  );
}

// ─── Set Row ───
export function SetRow({ number, weight, reps, rir, done, active, onPress }) {
  const rirColors = { 0: colors.rir0, 1: colors.rir1, 2: colors.rir2 };
  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.setRow,
      active && styles.setRowActive,
      done && styles.setRowDone,
    ]}>
      <View style={[styles.setNumber, active && { backgroundColor: colors.primary }]}>
        <Text style={[styles.setNumberText, active && { color: '#000' }]}>{number}</Text>
      </View>
      <Text style={[styles.setData, done && { color: colors.textMuted }]}>{weight} kg</Text>
      <Text style={[styles.setData, done && { color: colors.textMuted }]}>x {reps}</Text>
      <Text style={[styles.setRir, { color: rirColors[rir] || colors.textMuted }]}>
        RIR {rir}
      </Text>
      <Ionicons
        name={done ? 'checkmark-circle' : 'ellipse-outline'}
        size={24}
        color={done ? colors.success : colors.textMuted}
      />
    </TouchableOpacity>
  );
}

// ─── Badge / Medal ───
export function MedalBadge({ name, icon, unlocked = false, iconBg = '#FFD700', onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.medal, !unlocked && styles.medalLocked]}>
      <View style={[styles.medalIcon, { backgroundColor: unlocked ? iconBg + '30' : '#352722' }]}>
        <Ionicons
          name={icon}
          size={28}
          color={unlocked ? iconBg : colors.textMuted}
        />
      </View>
      <Text style={[styles.medalName, !unlocked && { color: colors.textMuted }]}>{name}</Text>
    </TouchableOpacity>
  );
}

// ─── Stat Bar ───
export function StatBar({ label, value, color = colors.primary }) {
  return (
    <View style={styles.statBar}>
      <View style={styles.statBarFill} />
    </View>
  );
}

// ─── Day Card (Plan) ───
export function DayCard({ day, type, label, active, onPress }) {
  const typeColors = {
    power: '#FF6B35',
    pump: '#0F3460',
    upper: '#00C853',
    lower: '#9C27B0',
    rest: '#594139',
  };
  const color = typeColors[type] || '#594139';
  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.dayCard,
      active && { borderColor: color, borderWidth: 1.5 },
    ]}>
      <Text style={[styles.dayName, { color }]}>{day.toUpperCase().slice(0, 3)}</Text>
      {type !== 'rest' ? (
        <View style={[styles.dayDot, { backgroundColor: color }]} />
      ) : (
        <Ionicons name="bed-outline" size={14} color={colors.textMuted} />
      )}
      <Text style={[styles.dayLabel, active && { color: colors.textPrimary }]} numberOfLines={1}>
        {type !== 'rest' ? label || 'Entreno' : 'Rest'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  // Metric Card
  metricCard: {
    width: '48%',
    padding: spacing.sm,
    alignItems: 'center',
  },
  metricIcon: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.xs,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metricValue: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  metricSub: {
    ...typography.caption,
    color: colors.textMuted,
  },
  // Primary Button
  primaryBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
  },
  primaryBtnText: {
    ...typography.h3,
    color: '#000',
    fontWeight: '800',
  },
  // Set Row
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    marginBottom: spacing.xs,
  },
  setRowActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
    borderWidth: 0.5,
  },
  setRowDone: {
    opacity: 0.6,
  },
  setNumber: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center', alignItems: 'center',
    marginRight: spacing.sm,
  },
  setNumberText: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
  setData: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    width: 70,
  },
  setRir: {
    ...typography.captionBold,
    width: 45,
    textAlign: 'center',
  },
  // Medal
  medal: {
    width: '30%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  medalLocked: {
    opacity: 0.5,
  },
  medalIcon: {
    width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.xs,
  },
  medalName: {
    ...typography.captionBold,
    color: colors.textPrimary,
    textAlign: 'center',
    fontSize: 11,
  },
  // Day Card (Plan)
  dayCard: {
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginRight: spacing.sm,
    width: 56,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dayName: {
    ...typography.captionBold,
    fontSize: 11,
    marginBottom: 2,
  },
  dayDot: {
    width: 8, height: 8, borderRadius: 4,
    marginBottom: 2,
  },
  dayLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 9,
    textAlign: 'center',
  },
});
