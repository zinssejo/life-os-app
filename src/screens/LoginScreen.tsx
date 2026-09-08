import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { signIn, signUp } from '../services/auth';
import { theme } from '../theme';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    try {
      isSignUp ? await signUp(email, password) : await signIn(email, password);
      onLogin();
    } catch (e: any) {
      Alert.alert('Fehler', e.message);
    }
    setLoading(false);
  };

  return (
    <View style={theme.container}>
      <Text style={styles.emoji}>🌟</Text>
      <Text style={styles.title}>Life OS</Text>
      <Text style={styles.sub}>{isSignUp ? 'Konto erstellen' : 'Anmelden'}</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#64748b" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Passwort" placeholderTextColor="#64748b" value={password} onChangeText={setPassword} secureTextEntry />
      <Pressable style={styles.btn} onPress={handle}>
        <Text style={styles.btnText}>{loading ? '...' : isSignUp ? 'Registrieren' : 'Anmelden'}</Text>
      </Pressable>
      <Pressable onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.toggle}>{isSignUp? 'Bereits ein Konto? Anmelden' : 'Kein Konto? Registrieren'}</Text>
      </Pressable>
      <Pressable onPress={onLogin}>
        <Text style={styles.skip}>Überspringen (lokal)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  emoji: { fontSize: 64, textAlign: 'center', marginBottom: 8 },
  title: { color: '#f1f5f9', fontSize: 32, fontWeight: 'bold', textAlign: 'center' },
  sub: { color: '#94a3b8', fontSize: 16, textAlign: 'center', marginBottom: 24 },
  input: { backgroundColor: '#1e293b', color: '#f1f5f9', borderRadius: 12, padding: 14, marginBottom: 12 },
  btn: { backgroundColor: '#4ade80', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 12 },
  btnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 16 },
  toggle: { color: '#94a3b8', textAlign: 'center', marginBottom: 8 },
  skip: { color: '#64748b', textAlign: 'center', marginTop: 16 },
});
