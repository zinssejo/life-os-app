import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { useLifeStore } from '../store';
import { areaById, AREAS } from '../data';
import { AreaId } from '../types';
import { theme } from '../theme';

export default function QuestsScreen() {
  const { quests, toggleQuest, addQuest, resetDay } = useLifeStore();
  const [title, setTitle] = useState('');
  const [area, setArea] = useState<AreaId>('schule');

  return (
    <View style={theme.container}>
      <Text style={styles.h1}>Quests</Text>
      <FlatList
        data={quests}
        keyExtractor={(q) => q.id}
        renderItem={({ item }) => {
          const a = areaById(item.area);
          return (
            <Pressable
              style={[styles.quest, item.done && styles.done]}
              onPress={() => toggleQuest(item.id)}
            >
              <Text style={styles.check}>{item.done ? '☑' : '☐'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, item.done && styles.strike]}>{item.title}</Text>
                <Text style={[styles.meta, { color: a.color }]}>
                  {a.emoji} {a.name} · +{item.xp} XP · +{item.coins} 🪙
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Neue Quest..."
        placeholderTextColor="#64748b"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.row}>
        {AREAS.map((a) => (
          <Pressable
            key={a.id}
            onPress={() => setArea(a.id)}
            style={[styles.chip, area === a.id && { borderColor: a.color }]}
          >
            <Text style={{ color: area === a.id ? a.color : '#94a3b8' }}>{a.emoji}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        style={styles.add}
        onPress={() => {
          if (!title.trim()) return;
          addQuest(title.trim(), area, 20, 8);
          setTitle('');
        }}
      >
        <Text style={styles.addText}>+ Hinzufügen (20 XP)</Text>
      </Pressable>
      <Pressable onPress={resetDay}>
        <Text style={styles.reset}>↺ Neuer Tag (alle zurücksetzen)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { color: '#f1f5f9', fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  quest: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginBottom: 8 },
  done: { opacity: 0.55 },
  check: { color: '#4ade80', fontSize: 22, marginRight: 10 },
  title: { color: '#f1f5f9', fontSize: 15 },
  strike: { textDecorationLine: 'line-through' },
  meta: { fontSize: 12, marginTop: 2 },
  input: { backgroundColor: '#1e293b', color: '#f1f5f9', borderRadius: 10, padding: 12, marginTop: 8 },
  row: { flexDirection: 'row', marginVertical: 8 },
  chip: { borderWidth: 2, borderColor: '#334155', borderRadius: 20, padding: 8, marginRight: 8 },
  add: { backgroundColor: '#4ade80', borderRadius: 10, padding: 12, alignItems: 'center' },
  addText: { color: '#0f172a', fontWeight: 'bold' },
  reset: { color: '#64748b', textAlign: 'center', marginTop: 10 },
});
