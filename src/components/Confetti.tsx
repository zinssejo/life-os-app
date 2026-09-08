import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const COLORS = ['#4ade80', '#fbbf24', '#fb7185', '#38bdf8', '#c084fc'];

interface Props {
  visible: boolean;
}

export function Confetti({ visible }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: 30 }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </View>
  );
}

function ConfettiPiece({ index }: { index: number }) {
  const y = useSharedValue(-20);
  const opacity = useSharedValue(1);
  const x = Math.random() * width;
  const color = COLORS[index % COLORS.length];
  const delay = Math.random() * 500;
  const duration = 1500 + Math.random() * 1000;

  useEffect(() => {
    y.value = withDelay(delay, withTiming(height + 20, { duration }));
    opacity.value = withDelay(delay + duration - 200, withTiming(0, { duration: 200 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }, { rotate: `${Math.random() * 360}deg` }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.piece,
        { left: x, backgroundColor: color, width: 8 + Math.random() * 6, height: 8 + Math.random() * 6 },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFill, zIndex: 999 },
  piece: { position: 'absolute', top: 0, borderRadius: 2 },
});
