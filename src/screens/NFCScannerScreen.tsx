import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { initNfc, readNfcTag, NFC_PRESETS } from '../services/nfc';
import { useLifeStore } from '../store';
import { uid } from '../store';
import { areaById } from '../data';
import { theme } from '../theme';

export default function NFCScannerScreen() {
  const [scanning, setScanning] = useState(false);
  const [lastTag, setLastTag] = useState<string | null>(null);

  const scan = async () => {
    setScanning(true);
    await initNfc();
    const tag = await readNfcTag();
    setScanning(false);

    if (tag) {
      setLastTag(tag);
      const preset = NFC_PRESETS[tag];
      if (preset) {
        const state = useLifeStore.getState();
        const ev = { id: uid(), type: 'nfc_scan' as const, area: preset.area as any, xp: 20, note: `NFC: ${preset.mode}`, at: Date.now() };
        useLifeStore.setState({ xp: state.xp + 20, events: [ev, ...state.events].slice(0, 500) });
        Alert.alert('NFC erkannt!', `${areaById(preset.area).emoji} +20 XP`);
      } else {
        Alert.alert('Tag gelesen', tag);
      }
    }
  };

  return (
    <View style={theme.container}>
      <Text style={styles.h1}>NFC Scanner</Text>
      <Text style={styles.sub}>Halte dein Handy an ein NFC-Tag</Text>
      <View style={styles.scanner}>
        <Text style={styles.nfc}>📡</Text>
        <Text style={styles.scanText}>{scanning ? 'Scanne...' : 'Tippen zum Scannen'}</Text>
      </View>
      <Pressable style={styles.btn} onPress={scan} disabled={scanning}>
        <Text style={styles.btnText}>{scanning ? '⏳ Scanne...' : '📡 NFC scannen'}</Text>
      </Pressable>
      {lastTag && (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>Letztes Tag:</Text>
          <Text style={styles.resultId}>{lastTag}</Text>
        </View>
      )}
      <Text style={styles.hint}>NFC-Tags können programmiert werden für: FLL, Fitnessstudio, Schule, Chill-Zone</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { color: '#f1f5f9', fontSize: 24, fontWeight: 'bold' },
  sub: { color: '#94a3b8', marginBottom: 20 },
  scanner: { alignItems: 'center', marginBottom: 20 },
  nfc: { fontSize: 80 },
  scanText: { color: '#64748b', marginTop: 8 },
  btn: { backgroundColor: '#38bdf8', borderRadius: 12, padding: 14, alignItems: 'center' },
  btnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 16 },
  result: { backgroundColor: '#1e293b', borderRadius: 12, padding: 14, marginTop: 16 },
  resultTitle: { color: '#94a3b8', fontSize: 12 },
  resultId: { color: '#f1f5f9', fontSize: 14, fontFamily: 'monospace' },
  hint: { color: '#64748b', fontSize: 12, marginTop: 16, textAlign: 'center' },
});
