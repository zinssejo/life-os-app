import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { getTodayHealth, logHealthActivity, HealthData } from '../services/health';
import { theme } from '../theme';

export default function HealthScreen() {
  const [health, setHealth] = useState<HealthData>({ steps: 0, distance: 0, activeMinutes: 0, calories: 0 });

  useEffect(() => { getTodayHealth().then(setHealth); }, []);

  const quickLog = (steps: number, min: number) => {
    const xp = logHealthActivity(steps, min);
    setHealth((h) => ({ ...h, steps: h.steps + steps, activeMinutes: h.activeMinutes + min }));
  };

  return (
    <View style={theme.container}>
      <Text style={styles.h1}>Health Connect</Text>
      <Text style={styles.sub}>Bewegung = XP (Phase 2: echte Health Connect API)</Text>
      <View style={styles.stats}>
        <View style={styles.stat}><Text style={styles.statVal}>🚶 {health.steps}</Text><Text style={styles.statLabel}>Schritte</Text></View>
        <View style={styles.stat}><Text style={styles.statVal}>⏱️ {health.activeMinutes}</Text><Text style={styles.statLabel}>Min aktiv</Text></View>
        <View style={styles.stat}><Text style={styles.statVal}>🔥 {health.calories}</Text><Text style={styles.statLabel}>Kalorien</Text></View>
      </View>
      <Text style={styles.h2}>Quick-Log</Text>
      <View style={styles.row}>
        <Pressable style={styles.qbtn} onPress={() => quickLog(1000, 10)}><Text>🚶 1000 Schritte</Text></Pressable>
        <Pressable style={styles.qbtn} onPress={() => quickLog(5000, 30)}><Text>🏃 5000 Schritte</Text></Pressable>
      </View>
      <View style={styles.row}>
        <Pressable style={styles.qbtn} onPress={() => quickLog(0, 15)}><Text>🧘 15 Min Training</Text></Pressable>
        <Pressable style={styles.qbtn} onPress={() => quickLog(0, 45)}><Text>💪 45 Min Training</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { color: '#f1f5f9', fontSize: 24, fontWeight: 'bold' },
  sub: { color: '#94a3b8', marginBottom: 16 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  stat: { backgroundColor: '#1e293b', borderRadius: 12, padding: 16, flex: 1, marginHorizontal: 4, alignItems: 'center' },
  statVal: { color: '#f1f5f9', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#64748b', fontSize: 12, marginTop: 4 },
  h2: { color: '#f1f5f9', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  row: { flexDirection: 'row', marginBottom: 8 },
  qbtn: { flex: 1, backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginHorizontal: 4, alignItems: 'center' },
});
