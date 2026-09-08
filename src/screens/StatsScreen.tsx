import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLifeStore } from '../store';
import { AREAS, levelForXp } from '../data';
import { theme } from '../theme';

// Balance der letzten 7 Tage pro Area – dein Stress-Fruehwarnsystem.
export default function StatsScreen() {
  const { xp, events, logRest } = useLifeStore();
  const week = Date.now() - 7 * 24 * 3600 * 1000;
  const perArea = AREAS.map((a) => ({
    ...a,
    xp: events.filter((e) => e.area === a.id && e.at > week && e.xp > 0).reduce((s, e) => s + e.xp, 0),
  }));
  const max = Math.max(1, ...perArea.map((a) => a.xp));

  return (
    <View style={theme.container}>
      <Text style={styles.h1}>Balance (7 Tage)</Text>
      <Text style={styles.total}>Gesamt: {xp} XP · Level {levelForXp(xp)}</Text>
      {perArea.map((a) => (
        <View key={a.id} style={styles.row}>
          <Text style={styles.label}>{a.emoji} {a.name}</Text>
          <View style={styles.bar}>
            <View style={[styles.fill, { flex: a.xp / max, backgroundColor: a.color }]} />
            <View style={{ flex: 1 - a.xp / max }} />
          </View>
          <Text style={styles.val}>{a.xp}</Text>
        </View>
      ))}
      <Text style={styles.h2}>Erholung loggen (+20 XP)</Text>
      <View style={styles.btnRow}>
        <Pressable style={styles.btn} onPress={() => logRest('erholung', 'Pause gemacht')}>
          <Text style={styles.btnText}>☕ Pause</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => logRest('erholung', 'Gut geschlafen')}>
          <Text style={styles.btnText}>😴 Schlaf</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => logRest('soziales', 'Zeit mit Leuten')}>
          <Text style={styles.btnText}>🎉 Sozial</Text>
        </Pressable>
      </View>
      <Text style={styles.hint}>Pause & Schlaf geben genauso XP wie Aufgaben – gegen Dauer-Stress.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { color: '#f1f5f9', fontSize: 24, fontWeight: 'bold' },
  total: { color: '#94a3b8', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  label: { color: '#f1f5f9', width: 100, fontSize: 14 },
  bar: { flex: 1, flexDirection: 'row', height: 14, backgroundColor: '#1e293b', borderRadius: 7, overflow: 'hidden' },
  fill: {},
  val: { color: '#94a3b8', width: 40, textAlign: 'right' },
  h2: { color: '#f1f5f9', fontSize: 16, fontWeight: 'bold', marginTop: 16 },
  btnRow: { flexDirection: 'row', marginTop: 8 },
  btn: { backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginRight: 8 },
  btnText: { color: '#f1f5f9' },
  hint: { color: '#64748b', fontSize: 12, marginTop: 12 },
});
