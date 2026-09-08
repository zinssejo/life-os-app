import { View, Text, StyleSheet, FlatList, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLifeStore } from '../store';
import { areaById, levelForXp, xpForLevel, AREAS } from '../data';
import { XPBar } from '../components/XPBar';
import { CoinBadge } from '../components/CoinBadge';
import { LevelBadge } from '../components/LevelBadge';
import { theme } from '../theme';

export default function HomeScreen() {
  const nav = useNavigation<any>();
  const { xp, coins, quests, events, toggleQuest } = useLifeStore();
  const level = levelForXp(xp);
  const cur = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const open = quests.filter((q) => !q.done);

  const fiveDays = Date.now() - 5 * 24 * 3600 * 1000;
  const quiet = AREAS.filter(
    (a) => !events.some((e) => e.area === a.id && e.at > fiveDays && e.xp > 0)
  );

  return (
    <ScrollView style={theme.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <LevelBadge level={level} />
          <Text style={styles.level}>{xp} XP</Text>
        </View>
        <CoinBadge coins={coins} />
      </View>
      <XPBar current={xp - cur} max={next - cur} />
      <Text style={styles.nextText}>Noch {next - xp} XP bis Level {level + 1}</Text>

      {quiet.length > 0 && (
        <View style={styles.warn}>
          <Text style={styles.warnText}>⚠️ Vernachlässigt: {quiet.map((a) => `${a.emoji} ${a.name}`).join(', ')}</Text>
        </View>
      )}

      <View style={styles.shortcuts}>
        {[
          { icon: '📡', label: 'NFC', screen: 'NFC' },
          { icon: '💪', label: 'Health', screen: 'Health' },
          { icon: '📍', label: 'Orte', screen: 'Geofence' },
          { icon: '🔔', label: 'Alarm', screen: 'Notifications' },
          { icon: '📅', label: 'Kalender', screen: 'Calendar' },
          { icon: '📋', label: 'Aufgaben', screen: 'ExtendedTasks' },
        ].map((s) => (
          <Pressable key={s.screen} style={styles.shortcut} onPress={() => nav.navigate(s.screen)}>
            <Text style={styles.shortcutIcon}>{s.icon}</Text>
            <Text style={styles.shortcutLabel}>{s.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.section}>Heute offen ({open.length})</Text>
      <FlatList
        data={open.slice(0, 5)}
        keyExtractor={(q) => q.id}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const a = areaById(item.area);
          return (
            <Pressable style={styles.quest} onPress={() => toggleQuest(item.id)}>
              <Text style={styles.check}>☐</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.questTitle}>{item.title}</Text>
                <Text style={[styles.area, { color: a.color }]}>{a.emoji} {a.name} · +{item.xp} XP · +{item.coins} 🪙</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  level: { color: '#f1f5f9', fontSize: 18, fontWeight: 'bold' },
  nextText: { color: '#64748b', fontSize: 12, marginBottom: 12 },
  warn: { backgroundColor: '#451a1a', borderRadius: 10, padding: 10, marginBottom: 12 },
  warnText: { color: '#fca5a5', fontSize: 13 },
  shortcuts: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  shortcut: { backgroundColor: '#1e293b', borderRadius: 12, padding: 12, alignItems: 'center', width: '30%' },
  shortcutIcon: { fontSize: 24 },
  shortcutLabel: { color: '#94a3b8', fontSize: 11, marginTop: 4 },
  section: { color: '#f1f5f9', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  quest: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginBottom: 8 },
  check: { color: '#4ade80', fontSize: 22, marginRight: 10 },
  questTitle: { color: '#f1f5f9', fontSize: 15 },
  area: { fontSize: 12, marginTop: 2 },
});
