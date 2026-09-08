import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function LevelBadge({ level }: { level: number }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>⭐ Lvl {level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { backgroundColor: '#4ade8020', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#4ade8040' },
  text: { color: '#4ade80', fontSize: 14, fontWeight: 'bold' },
});
