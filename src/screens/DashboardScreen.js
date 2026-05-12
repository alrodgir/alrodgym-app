// Dashboard — Pantalla Home (V2 refinada)
// Basada en el Figma: 11-dashboard-v2.png

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '../theme';
import {
  Card, MetricCard, PrimaryButton, ProgressRing, SetRow,
} from '../components';
import { TODAY, activeUser, DAILY_MOBILITY } from '../data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DashboardScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [mobility, setMobility] = useState(DAILY_MOBILITY);
  const today = TODAY;
  const isRest = today.isRestDay;

  const toggleMobility = (index) => {
    const copy = [...mobility];
    copy[index] = { ...copy[index], done: !copy[index].done };
    setMobility(copy);
  };

  const getDayName = () => {
    const days = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
    return days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] || today.dayName;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <Ionicons name="barbell-outline" size={20} color={colors.primary} />
            <Text style={styles.brandText}>ALRODGYM</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="flame" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Date + Routine */}
        <Text style={styles.date}>{`HOY ES ${getDayName()}, ${today.date}`}</Text>
        <Text style={styles.routineName}>{activeUser.routine === 'power-pump' ? 'POWER UPPER A' : today.routineLabel}</Text>

        {isRest ? (
          /* Rest Day Card */
          <Card style={styles.restCard}>
            <Ionicons name="bed-outline" size={40} color={colors.textMuted} />
            <Text style={styles.restTitle}>Día de Recuperación</Text>
            <Text style={styles.restSub}>Toca movilidad y estiramientos</Text>
            {/* Mobility checklist */}
            {mobility.map((m, i) => (
              <TouchableOpacity
                key={i}
                style={styles.mobilityRow}
                onPress={() => toggleMobility(i)}
              >
                <Ionicons
                  name={m.done ? 'checkmark-circle' : 'ellipse-outline'}
                  size={22}
                  color={m.done ? colors.success : colors.textMuted}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.mobilityName, m.done && { color: colors.textMuted, textDecorationLine: 'line-through' }]}>
                    {m.name}
                  </Text>
                  <Text style={styles.mobilityDur}>{m.duration}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        ) : (
          /* Current Exercise Card */
          <Card style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.sectionLabel}>PRÓXIMO EJERCICIO</Text>
              <ProgressRing percent={today.currentExercise.progress.percent} size={50} strokeWidth={5}>
                <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '800' }}>
                  {today.currentExercise.progress.current}/{today.currentExercise.progress.total}
                </Text>
              </ProgressRing>
            </View>
            <Text style={styles.exerciseName}>{today.currentExercise.name}</Text>

            {/* Sets preview */}
            {today.currentExercise.sets.map((set, i) => (
              <SetRow
                key={set.id}
                number={i + 1}
                weight={set.weight}
                reps={set.reps}
                rir={set.rir}
                done={set.done}
                active={
                  i === today.currentExercise.sets.findIndex(s => !s.done)
                }
              />
            ))}

            <View style={styles.lastLift}>
              <Text style={styles.lastLiftText}>
                Último: {today.currentExercise.lastLift}
              </Text>
            </View>

            <PrimaryButton
              title="CONTINUAR ENTRENO"
              icon="play-forward"
              onPress={() => navigation.navigate('Workout')}
              style={{ marginTop: spacing.sm }}
            />
          </Card>
        )}

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          <MetricCard icon="flame" label="RACHA" value="3 DÍAS" sub="¡Sigue así!" />
          <MetricCard
            icon="trophy" label="MEDALLAS" value="7/10"
            sub="Próxima: Veterano" iconColor={colors.accentCyan}
          />
          <MetricCard
            icon="stats-chart" label="VOLUMEN" value="15.2K"
            sub="kg esta semana" iconColor={colors.success}
          />
          <MetricCard
            icon="fitness" label="ESTADO" value="ÓPTIMO"
            sub="Recuperado" iconColor={colors.warning}
          />
        </View>

        {/* Achievement Banner */}
        <Card style={styles.achievementCard}>
          <View style={styles.achievementContent}>
            <View style={styles.achievementIcon}>
              <Ionicons name="medal" size={32} color="#FFD700" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.achievementTitle}>Elite Bencher</Text>
              <Text style={styles.achievementSub}>NIVEL 4 ALCANZADO AYER</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </View>
        </Card>

        {/* Weekly volume mini */}
        <Card style={styles.volumeCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.sectionLabel}>VOLUMEN SEMANAL</Text>
            <Text style={styles.volumeTotal}>15.2K kg</Text>
          </View>
          <View style={styles.volumeBars}>
            {['POWER', 'PUMP', 'UPPER', 'LOWER'].map((type, i) => (
              <View key={i} style={styles.volumeBarRow}>
                <Text style={styles.volumeBarLabel}>{type}</Text>
                <View style={styles.volumeBarBg}>
                  <View style={[
                    styles.volumeBarFill,
                    { width: `${[40, 30, 0, 0][i]}%`, backgroundColor: [colors.primary, colors.accentCyan, colors.success, '#9C27B0'][i] }
                  ]} />
                </View>
              </View>
            ))}
          </View>
        </Card>
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
  date: {
    ...typography.caption,
    color: colors.textSecondary,
    paddingHorizontal: 20,
    marginTop: spacing.xs,
  },
  routineName: {
    ...typography.h1,
    color: colors.textPrimary,
    paddingHorizontal: 20,
    marginBottom: spacing.md,
  },
  // Exercise Card
  exerciseCard: {
    marginHorizontal: 20,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.textSecondary,
  },
  exerciseName: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  lastLift: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  lastLiftText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  // Metrics
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: spacing.sm,
  },
  // Achievement
  achievementCard: {
    marginHorizontal: 20,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#FFD70020',
    justifyContent: 'center', alignItems: 'center',
  },
  achievementTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  achievementSub: {
    ...typography.caption,
    color: colors.textMuted,
  },
  // Volume
  volumeCard: {
    marginHorizontal: 20,
  },
  volumeTotal: {
    ...typography.h3,
    color: colors.primary,
  },
  volumeBars: {
    marginTop: spacing.sm,
  },
  volumeBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  volumeBarLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    width: 55,
    fontSize: 10,
  },
  volumeBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 4,
    overflow: 'hidden',
  },
  volumeBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  // Rest Day
  restCard: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  restTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  restSub: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  mobilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mobilityName: {
    ...typography.body,
    color: colors.textPrimary,
  },
  mobilityDur: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
