import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { areaById } from '../data';
import { Quest } from '../types';

interface Props {
  quest: Quest;
  onToggle: (id: string) => void;
}

export function QuestCard({ quest, onToggle }: Props) {
  const area = areaById(quest.area);
  return (
    <Pressable style={[styles.card, quest.done && styles.done]} onPress={() => onToggle(quest.id)}>
      <Text style={styles.check}>{quest.done ? '☑' : '☐'}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, quest.done && styles.strike]}>{quest.title}</Text>
        <Text style={[styles.meta, { color: area.color }]}>
          {area.emoji} {area.name} · +{quest.xp} XP · +{quest.coins} 🪙
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 12, padding: 14, marginBottom: 8 },
  done: { opacity: 0.5 },
  check: { color: '#4ade80', fontSize: 22, marginRight: 10 },
  title: { color: '#f1f5f9', fontSize: 15, fontWeight: '500' },
  strike: { textDecorationLine: 'line-through' },
  meta: { fontSize: 12, marginTop: 3 },
});
