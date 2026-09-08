import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface Props {
  current: number;
  max: number;
  color?: string;
}

export function XPBar({ current, max, color = '#4ade80' }: Props) {
  const progress = useSharedValue(0);
  React.useEffect(() => {
    progress.value = withTiming(Math.min(current / max, 1), { duration: 800 });
  }, [current, max]);

  const animatedStyle = useAnimatedStyle(() => ({
    flex: progress.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Animated.View style={[styles.fill, { backgroundColor: color }, animatedStyle]} />
      </View>
      <Text style={styles.text}>{current} / {max} XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 8 },
  bar: { flexDirection: 'row', height: 14, backgroundColor: '#1e293b', borderRadius: 7, overflow: 'hidden' },
  fill: { minHeight: 14, borderRadius: 7 },
  text: { color: '#64748b', fontSize: 12, marginTop: 4, textAlign: 'right' },
});
