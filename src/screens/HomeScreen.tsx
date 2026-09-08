import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useLifeStore } from '../store';
import { areaById, levelForXp, xpForLevel, AREAS } from '../data';
import { theme } from '../theme';

// Glance-Screen: Level, XP-Balken, Coins, offene Quests, Area-Warnung. Kein Scroll-Feed.
export default function HomeScreen() {
  const { xp, coins, quests, events, toggleQuest } = useLifeStore();
  const level = levelForXp(xp);
  const cur = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const progress = next === cur ? 1 : (xp - cur) / (next - cur);
  const open = quests.filter((q) => !q.done);

  // Fruehwarnsystem: Area ohne XP in den letzten 5 Tagen?
  const fiveDays = Date.now() - 5 * 24 * 3600 * 1000;
  const quiet = AREAS.filter(
    (a) => !events.some((e) => e.area === a.id && e.at > fiveDays && e.xp > 0)
  );

  return (
    <View style={theme.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.level}>Level {level}</Text>
          <Text style={styles.xpText}>{xp} XP</Text>
        </View>
        <View style={styles.coins}>
          <Text style={styles.coinsText}>🪙 {coins}</Text>
        </View>
      </View>
      <View style={styles.bar}>
        <View style={[styles.fill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>
      <Text style={styles.nextText}>
        Noch {next - xp} XP bis Level {level + 1}
      </Text>

      {quiet.length > 0 && (
        <View style={styles.warn}>
          <Text style={styles.warnText}>
            ⚠️ Vernachlässigt: {quiet.map((a) => `${a.emoji} ${a.name}`).join(', ')}
          </Text>
        </View>
      )}

      <Text style={styles.section}>Heute offen ({open.length})</Text>
      <FlatList
        data={open.slice(0, 5)}
        keyExtractor={(q) => q.id}
        renderItem={({ item }) => {
          const a = areaById(item.area);
          return (
            <Pressable style={styles.quest} onPress={() => toggleQuest(item.id)}>
              <Text style={styles.check}>☐</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.questTitle}>{item.title}</Text>
                <Text style={[styles.area, { color: a.color }]}>
                  {a.emoji} {a.name} · +{item.xp} XP · +{item.coins} 🪙
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  level: { color: '#f1f5f9', fontSize: 28, fontWeight: 'bold' },
  xpText: { color: '#94a3b8', fontSize: 14 },
  coins: { backgroundColor: '#1e293b', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  coinsText: { color: '#fbbf24', fontSize: 18, fontWeight: 'bold' },
  bar: { flexDirection: 'row', height: 12, backgroundColor: '#1e293b', borderRadius: 6, overflow: 'hidden' },
  fill: { backgroundColor: '#4ade80' },
  nextText: { color: '#64748b', fontSize: 12, marginTop: 4, marginBottom: 12 },
  warn: { backgroundColor: '#451a1a', borderRadius: 10, padding: 10, marginBottom: 12 },
  warnText: { color: '#fca5a5', fontSize: 13 },
  section: { color: '#f1f5f9', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  quest: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginBottom: 8 },
  check: { color: '#4ade80', fontSize: 22, marginRight: 10 },
  questTitle: { color: '#f1f5f9', fontSize: 15 },
  area: { fontSize: 12, marginTop: 2 },
});
