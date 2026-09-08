import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { useLifeStore } from '../store';
import { AREAS } from '../data';
import { AreaId } from '../types';
import { theme } from '../theme';

export default function ExtendedTasksScreen() {
  const { quests, addQuest } = useLifeStore();
  const [title, setTitle] = useState('');
  const [area, setArea] = useState<AreaId>('schule');
  const [xp, setXp] = useState('30');
  const [coins, setCoins] = useState('10');

  const customQuests = quests.filter((q) => !['q1', 'q2', 'q3', 'q4', 'q5', 'q6'].includes(q.id));

  return (
    <View style={theme.container}>
      <Text style={styles.h1}>Erweiterte Aufgaben</Text>
      <Text style={styles.sub}>Eigene Quests mit XP/Coin-Belohnung erstellen</Text>
      <TextInput style={styles.input} placeholder="Quest-Titel" placeholderTextColor="#64748b" value={title} onChangeText={setTitle} />
      <View style={styles.row}>
        {AREAS.map((a) => (
          <Pressable key={a.id} style={[styles.chip, area === a.id && { borderColor: a.color }]} onPress={() => setArea(a.id)}>
            <Text style={{ color: area === a.id ? a.color : '#94a3b8' }}>{a.emoji}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.row}>
        <View style={styles.numInput}>
          <Text style={styles.numLabel}>XP</Text>
          <TextInput style={styles.num} value={xp} onChangeText={setXp} keyboardType="numeric" />
        </View>
        <View style={styles.numInput}>
          <Text style={styles.numLabel}>Coins</Text>
          <TextInput style={styles.num} value={coins} onChangeText={setCoins} keyboardType="numeric" />
        </View>
      </View>
      <Pressable style={styles.addBtn} onPress={() => {
        if (!title.trim()) return;
        addQuest(title.trim(), area, parseInt(xp) || 20, parseInt(coins) || 8);
        setTitle('');
      }}>
        <Text style={styles.addText}>+ Quest erstellen</Text>
      </Pressable>
      <Text style={styles.h2}>Eigene Quests ({customQuests.length})</Text>
      <FlatList
        data={customQuests}
        keyExtractor={(q) => q.id}
        renderItem={({ item }) => (
          <View style={styles.quest}>
            <Text style={styles.questTitle}>{item.title}</Text>
            <Text style={styles.questMeta}>+{item.xp} XP · +{item.coins} 🪙</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { color: '#f1f5f9', fontSize: 24, fontWeight: 'bold' },
  sub: { color: '#94a3b8', marginBottom: 12 },
  input: { backgroundColor: '#1e293b', color: '#f1f5f9', borderRadius: 10, padding: 12, marginBottom: 8 },
  row: { flexDirection: 'row', marginBottom: 8 },
  chip: { borderWidth: 2, borderColor: '#334155', borderRadius: 20, padding: 8, marginRight: 8 },
  numInput: { flex: 1, backgroundColor: '#1e293b', borderRadius: 10, padding: 8, marginHorizontal: 4, alignItems: 'center' },
  numLabel: { color: '#64748b', fontSize: 12 },
  num: { color: '#f1f5f9', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  addBtn: { backgroundColor: '#4ade80', borderRadius: 10, padding: 12, alignItems: 'center', marginBottom: 12 },
  addText: { color: '#0f172a', fontWeight: 'bold' },
  h2: { color: '#f1f5f9', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  quest: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginBottom: 6 },
  questTitle: { color: '#f1f5f9', fontSize: 14 },
  questMeta: { color: '#94a3b8', fontSize: 12 },
});
