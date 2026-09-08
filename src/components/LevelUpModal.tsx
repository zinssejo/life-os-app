import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';

interface Props {
  visible: boolean;
  level: number;
  onDone: () => void;
}

export function LevelUpModal({ visible, level, onDone }: Props) {
  const scale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSequence(withSpring(1.3), withSpring(1));
      const t = setTimeout(onDone, 3000);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, style]}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>LEVEL UP!</Text>
          <Text style={styles.level}>Level {level}</Text>
          <Text style={styles.sub}>Weiter so!</Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#0f172acc', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#1e293b', borderRadius: 24, padding: 40, alignItems: 'center', borderWidth: 2, borderColor: '#4ade80' },
  emoji: { fontSize: 64, marginBottom: 12 },
  title: { color: '#4ade80', fontSize: 32, fontWeight: 'bold' },
  level: { color: '#f1f5f9', fontSize: 48, fontWeight: 'bold', marginVertical: 8 },
  sub: { color: '#94a3b8', fontSize: 16 },
});
