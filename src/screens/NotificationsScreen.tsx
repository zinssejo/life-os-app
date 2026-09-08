import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { initNotifications, scheduleDailyReminder } from '../services/notifications';
import { theme } from '../theme';

export default function NotificationsScreen() {
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState({ hour: 20, minute: 0 });

  const toggle = async (val: boolean) => {
    if (val) {
      await initNotifications();
      await scheduleDailyReminder(time.hour, time.minute);
    }
    setEnabled(val);
  };

  return (
    <View style={theme.container}>
      <Text style={styles.h1}>Notifications</Text>
      <Text style={styles.sub}>Tägliche Erinnerungen für deine Quests</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Tägliche Erinnerung</Text>
        <Switch value={enabled} onValueChange={toggle} trackColor={{ true: '#4ade80' }} />
      </View>
      {enabled && (
        <View style={styles.timeCard}>
          <Text style={styles.timeText}>⏰ {String(time.hour).padStart(2, '0')}:{String(time.minute).padStart(2, '0')} Uhr</Text>
          <Text style={styles.timeHint}>"Vergiss nicht deine Quests!"</Text>
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.label}>Quest-Erinnerung</Text>
        <Text style={styles.hint}>Erinnert dich an offene Quests</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Level-Up Benachrichtigung</Text>
        <Text style={styles.hint}>Feiert dein Level-Up!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { color: '#f1f5f9', fontSize: 24, fontWeight: 'bold' },
  sub: { color: '#94a3b8', marginBottom: 16 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 12, padding: 14, marginBottom: 8 },
  label: { color: '#f1f5f9', fontSize: 15 },
  hint: { color: '#64748b', fontSize: 12, marginTop: 2 },
  timeCard: { backgroundColor: '#1e293b', borderRadius: 12, padding: 14, marginBottom: 8, alignItems: 'center' },
  timeText: { color: '#f1f5f9', fontSize: 24, fontWeight: 'bold' },
  timeHint: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
});
