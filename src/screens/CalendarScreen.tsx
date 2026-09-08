import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useLifeStore } from '../store';
import { areaById } from '../data';
import { theme } from '../theme';

const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export default function CalendarScreen() {
  const { events, quests } = useLifeStore();
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1);

  const weekDays = DAYS.map((d, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    const dayEvents = events.filter((e) => {
      const eDate = new Date(e.at);
      return eDate.toDateString() === date.toDateString();
    });
    return { name: d, date, xp: dayEvents.reduce((s, e) => s + Math.max(0, e.xp), 0), isToday: date.toDateString() === today.toDateString() };
  });

  const dayEvents = events.filter((e) => {
    const eDate = new Date(e.at);
    return eDate.getDay() === (selectedDay === 0 ? 7 : selectedDay);
  }).slice(0, 10);

  return (
    <View style={theme.container}>
      <Text style={styles.h1}>Kalender</Text>
      <View style={styles.week}>
        {weekDays.map((d, i) => (
          <Pressable key={i} style={[styles.day, d.isToday && styles.today]} onPress={() => setSelectedDay(i + 1)}>
            <Text style={styles.dayName}>{d.name}</Text>
            <Text style={[styles.dayXp, d.xp > 0 && { color: '#4ade80' }]}>{d.xp > 0 ? d.xp : '-'}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.h2}>Events an {DAYS[selectedDay === 0 ? 6 : selectedDay - 1]}</Text>
      <FlatList
        data={dayEvents}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => {
          const a = areaById(item.area);
          return (
            <View style={styles.event}>
              <Text style={[styles.eventXp, { color: a.color }]}>+{item.xp}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.eventNote}>{item.note}</Text>
                <Text style={[styles.eventArea, { color: a.color }]}>{a.emoji} {a.name}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { color: '#f1f5f9', fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  week: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  day: { alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 10, padding: 10, width: 44 },
  today: { backgroundColor: '#4ade8030', borderWidth: 1, borderColor: '#4ade80' },
  dayName: { color: '#94a3b8', fontSize: 12 },
  dayXp: { color: '#64748b', fontSize: 14, fontWeight: 'bold', marginTop: 4 },
  h2: { color: '#f1f5f9', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  event: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginBottom: 6 },
  eventXp: { fontWeight: 'bold', fontSize: 16, marginRight: 10 },
  eventNote: { color: '#f1f5f9', fontSize: 14 },
  eventArea: { fontSize: 12, marginTop: 2 },
});
