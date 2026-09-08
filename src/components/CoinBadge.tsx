import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function CoinBadge({ coins }: { coins: number }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>🪙 {coins}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { backgroundColor: '#1e293b', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  text: { color: '#fbbf24', fontSize: 18, fontWeight: 'bold' },
});
