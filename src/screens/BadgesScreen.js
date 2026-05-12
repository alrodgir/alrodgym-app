// Badges & Achievements — Grid completo de medallas
// Basada en el Figma: 06-badges-v2.png

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '../theme';
import { Card, MedalBadge } from '../components';
import { MEDALS, userMedals } from '../data';

export default function BadgesScreen() {
  const [selectedMedal, setSelectedMedal] = useState(null);
  const unlockedCount = userMedals.length;
  const progress = (unlockedCount / MEDALS.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <Ionicons name="barbell-outline" size={18} color={colors.primary} />
            <Text style={styles.brandText}>ALRODGYM</Text>
          </View>
        </View>

        <Text style={styles.screenTitle}>MEDALLAS</Text>

        {/* Progress */}
        <Card style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              {unlockedCount}/{MEDALS.length} DESBLOQUEADAS
            </Text>
            <Text style={styles.progressPercent}>
              {Math.round(progress)}%
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </Card>

        {/* Medals Grid */}
        <View style={styles.medalsContainer}>
          {MEDALS.map((m) => (
            <MedalBadge
              key={m.id}
              name={m.name}
              icon={m.icon}
              unlocked={userMedals.includes(m.id)}
              iconBg={m.iconBg}
              onPress={() => setSelectedMedal(m)}
            />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Medal Detail Modal */}
      <Modal
        visible={!!selectedMedal}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedMedal(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedMedal(null)}
        >
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Card style={styles.modalCard}>
              {selectedMedal && (
                <>
                  <View style={[styles.modalIcon, {
                    backgroundColor: (selectedMedal.iconBg || '#FFD700') + '30',
                  }]}>
                    <Ionicons
                      name={selectedMedal.icon}
                      size={48}
                      color={selectedMedal.iconBg || '#FFD700'}
                    />
                  </View>
                  <Text style={styles.modalTitle}>{selectedMedal.name}</Text>
                  <Text style={styles.modalDesc}>{selectedMedal.desc}</Text>

                  {userMedals.includes(selectedMedal.id) ? (
                    <View style={styles.modalUnlocked}>
                      <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                      <Text style={styles.modalUnlockedText}>DESBLOQUEADA</Text>
                    </View>
                  ) : (
                    <View style={styles.modalLockedBadge}>
                      <Ionicons name="lock-closed" size={16} color={colors.textMuted} />
                      <Text style={styles.modalLockedText}>BLOQUEADA</Text>
                    </View>
                  )}
                </>
              )}
            </Card>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    marginBottom: spacing.sm,
  },
  progressCard: {
    marginHorizontal: 20,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressText: {
    ...typography.label,
    color: colors.textSecondary,
  },
  progressPercent: {
    ...typography.h3,
    color: colors.primary,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  medalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: 280,
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalIcon: {
    width: 88, height: 88, borderRadius: 44,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  modalDesc: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: spacing.sm,
  },
  modalUnlocked: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  modalUnlockedText: {
    ...typography.label,
    color: colors.success,
    marginLeft: 6,
  },
  modalLockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  modalLockedText: {
    ...typography.label,
    color: colors.textMuted,
    marginLeft: 6,
  },
});
