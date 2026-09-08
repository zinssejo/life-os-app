import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { DEFAULT_ZONES, GeofenceZone } from '../services/geofence';
import { areaById } from '../data';
import { theme } from '../theme';

export default function GeofenceScreen() {
  return (
    <View style={theme.container}>
      <Text style={styles.h1}>Geofencing</Text>
      <Text style={styles.sub}>Orte betreten → automatisch XP (Phase 2: echte GPS-API)</Text>
      <FlatList
        data={DEFAULT_ZONES}
        keyExtractor={(z) => z.id}
        renderItem={({ item }) => {
          const a = areaById(item.area);
          return (
            <View style={styles.card}>
              <Text style={styles.emoji}>📍</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={[styles.area, { color: a.color }]}>{a.emoji} {a.name} · Radius: {item.radius}m</Text>
              </View>
              <Text style={styles.xp}>+{item.xpReward} XP</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { color: '#f1f5f9', fontSize: 24, fontWeight: 'bold' },
  sub: { color: '#94a3b8', marginBottom: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 12, padding: 14, marginBottom: 8 },
  emoji: { fontSize: 28, marginRight: 10 },
  name: { color: '#f1f5f9', fontSize: 16, fontWeight: 'bold' },
  area: { fontSize: 12, marginTop: 2 },
  xp: { color: '#4ade80', fontWeight: 'bold', fontSize: 16 },
});
