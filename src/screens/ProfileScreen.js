// User Profile — Pantalla de perfil con estadísticas y configuración
// Basada en el Figma: 09-profile.png

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, useTheme, useThemeColors, typography, spacing, radius } from '../theme';
import { Card, MedalBadge } from '../components';
import { activeUser, USERS, MEDALS, userMedals } from '../data';

export default function ProfileScreen() {
  const { theme: currentTheme, themeId, setTheme, themeList } = useTheme();
  const colors = useThemeColors();
  const user = activeUser;
  const [mode, setMode] = useState(user.mode);
  const [routine, setRoutine] = useState(user.routine);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <Ionicons name="barbell-outline" size={18} color={colors.primary} />
            <Text style={styles.brandText}>ALRODGYM</Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="log-out-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={colors.primary} />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userTag}>
            {user.mode === 'enhanced' ? '🏋️ Testo+Oxa' : '🌿 Natural'}
          </Text>
        </Card>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>PESO</Text>
            <Text style={styles.statValue}>{user.weight || '—'} kg</Text>
            <Text style={styles.statTrend}>→ estable</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>CINTURA</Text>
            <Text style={styles.statValue}>{user.waist || '—'} cm</Text>
            <Text style={styles.statTrend}>→ estable</Text>
          </Card>
        </View>

        {/* PRs */}
        <Text style={styles.sectionTitle}>MEJORES MARCAS</Text>
        {Object.entries(user.prs).length > 0 ? (
          Object.entries(user.prs).map(([key, pr]) => (
            <Card key={key} style={styles.prCard}>
              <View style={styles.prRow}>
                <Text style={styles.prName}>
                  {key === 'bench' ? 'Press Banca' : key === 'squat' ? 'Sentadilla' : 'Peso Muerto'}
                </Text>
                <Text style={styles.prValue}>{pr.weight} kg</Text>
                <Text style={styles.prDate}>{new Date(pr.date).toLocaleDateString('es')}</Text>
              </View>
            </Card>
          ))
        ) : (
          <Card style={{ alignItems: 'center', padding: spacing.md, marginHorizontal: 20 }}>
            <Text style={{ ...typography.body, color: colors.textMuted }}>
              No hay marcas registradas
            </Text>
          </Card>
        )}

        {/* Configuration */}
        <Text style={styles.sectionTitle}>CONFIGURACIÓN</Text>

        <Card style={{ marginHorizontal: 20 }}>
          <Text style={styles.configLabel}>TEMA VISUAL</Text>
          <View style={styles.configOptions}>
            {themeList.map(t => (
              <TouchableOpacity
                key={t.id}
                style={[styles.configBtn, themeId === t.id && styles.configBtnActive]}
                onPress={() => setTheme(t.id)}
              >
                <View style={[styles.colorDot, { backgroundColor: t.colors.primary }]} />
                <Text style={[styles.configBtnText, themeId === t.id && { color: '#000' }]}>
                  {t.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.configLabel}>RUTINA ACTIVA</Text>
          <View style={styles.configOptions}>
            <TouchableOpacity
              style={[styles.configBtn, routine === 'power-pump' && styles.configBtnActive]}
              onPress={() => setRoutine('power-pump')}
            >
              <Ionicons
                name="barbell-outline"
                size={16}
                color={routine === 'power-pump' ? '#000' : colors.textMuted}
              />
              <Text style={[styles.configBtnText, routine === 'power-pump' && { color: '#000' }]}>
                Power & Pump
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.configBtn, routine === 'upper-lower' && styles.configBtnActive]}
              onPress={() => setRoutine('upper-lower')}
            >
              <Ionicons
                name="repeat-outline"
                size={16}
                color={routine === 'upper-lower' ? '#000' : colors.textMuted}
              />
              <Text style={[styles.configBtnText, routine === 'upper-lower' && { color: '#000' }]}>
                Upper/Lower
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <Text style={styles.configLabel}>MODO FARMACOLÓGICO</Text>
          <View style={styles.configOptions}>
            <TouchableOpacity
              style={[styles.configBtn, mode === 'natural' && styles.configBtnActive]}
              onPress={() => setMode('natural')}
            >
              <Ionicons
                name="leaf-outline"
                size={16}
                color={mode === 'natural' ? '#000' : colors.textMuted}
              />
              <Text style={[styles.configBtnText, mode === 'natural' && { color: '#000' }]}>
                Natural
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.configBtn, mode === 'enhanced' && styles.configBtnActive]}
              onPress={() => setMode('enhanced')}
            >
              <Ionicons
                name="flask-outline"
                size={16}
                color={mode === 'enhanced' ? '#000' : colors.textMuted}
              />
              <Text style={[styles.configBtnText, mode === 'enhanced' && { color: '#000' }]}>
                Testo+Oxa
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Medals Preview */}
        <Text style={styles.sectionTitle}>MEDALLAS ({userMedals.length}/{MEDALS.length})</Text>
        <Card style={{ marginHorizontal: 20 }}>
          <View style={styles.medalsGrid}>
            {MEDALS.map((m) => (
              <MedalBadge
                key={m.id}
                name={m.name}
                icon={m.icon}
                unlocked={userMedals.includes(m.id)}
                iconBg={m.iconBg}
              />
            ))}
          </View>
        </Card>

        {/* Switch User */}
        <TouchableOpacity style={styles.switchUser}>
          <Ionicons name="people-outline" size={18} color={colors.textMuted} />
          <Text style={styles.switchUserText}>CAMBIAR DE USUARIO</Text>
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
  profileCard: {
    marginHorizontal: 20,
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.sm,
  },
  userName: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  userTag: {
    ...typography.body,
    color: colors.textMuted,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
  },
  statLabel: {
    ...typography.label,
    color: colors.textMuted,
  },
  statValue: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  statTrend: {
    ...typography.caption,
    color: colors.textMuted,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    paddingHorizontal: 20,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  prCard: {
    marginHorizontal: 20,
    padding: spacing.sm,
  },
  prRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prName: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  prValue: {
    ...typography.h3,
    color: colors.primary,
  },
  prDate: {
    ...typography.caption,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
  configLabel: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  configOptions: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  configBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainer,
    marginRight: spacing.sm,
  },
  configBtnActive: {
    backgroundColor: colors.primary,
  },
  configBtnText: {
    ...typography.captionBold,
    color: colors.textMuted,
    marginLeft: 6,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  medalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  switchUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  switchUserText: {
    ...typography.label,
    color: colors.textMuted,
    marginLeft: 6,
  },
});
