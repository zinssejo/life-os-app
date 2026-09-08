import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function AchievementBadge({ emoji, title, unlocked }: { emoji: string; title: string; unlocked: boolean }) {
  return (
    <View style={[styles.badge, !unlocked && styles.locked]}>
      <Text style={styles.emoji}>{unlocked ? emoji : '🔒'}</Text>
      <Text style={[styles.title, !unlocked && styles.titleLocked]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 12, padding: 12, width: 90 },
  locked: { opacity: 0.4 },
  emoji: { fontSize: 28, marginBottom: 4 },
  title: { color: '#f1f5f9', fontSize: 11, textAlign: 'center' },
  titleLocked: { color: '#64748b' },
});
