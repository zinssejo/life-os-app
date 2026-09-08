import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useLifeStore } from '../store';
import { SHOP_ITEMS } from '../data';
import { theme } from '../theme';

// Coins ausgeben: Belohnungen einloesen statt prokrastinieren.
export default function ShopScreen() {
  const { coins, buyItem, purchases } = useLifeStore();
  return (
    <View style={theme.container}>
      <Text style={styles.h1}>Shop</Text>
      <Text style={styles.balance}>🪙 {coins} Coins</Text>
      <FlatList
        data={SHOP_ITEMS}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
            <Pressable
              style={[styles.buy, coins < item.cost && styles.poor]}
              onPress={() => {
                const ok = buyItem(item.id, item.title, item.cost);
                Alert.alert(ok ? 'Gegönnt! 🎉' : 'Zu teuer', ok ? item.title : `Brauchst ${item.cost} Coins.`);
              }}
            >
              <Text style={styles.buyText}>{item.cost} 🪙</Text>
            </Pressable>
          </View>
        )}
      />
      <Text style={styles.h2}>Zuletzt eingelöst</Text>
      {purchases.slice(0, 3).map((p) => (
        <Text key={p.id} style={styles.log}>
          ✅ {p.title} (−{p.cost} 🪙)
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { color: '#f1f5f9', fontSize: 24, fontWeight: 'bold' },
  balance: { color: '#fbbf24', fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginBottom: 8 },
  emoji: { fontSize: 28, marginRight: 10 },
  title: { color: '#f1f5f9', fontSize: 15, fontWeight: 'bold' },
  desc: { color: '#94a3b8', fontSize: 12 },
  buy: { backgroundColor: '#fbbf24', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  poor: { opacity: 0.4 },
  buyText: { color: '#0f172a', fontWeight: 'bold' },
  h2: { color: '#f1f5f9', fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  log: { color: '#94a3b8', fontSize: 13, marginTop: 4 },
});
