import { supabase } from './supabase';
import { useLifeStore } from '../store';

export async function syncToCloud() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const state = useLifeStore.getState();
  await supabase.from('user_data').upsert({
    user_id: user.id,
    xp: state.xp,
    coins: state.coins,
    quests: state.quests,
    events: state.events.slice(0, 200),
    purchases: state.purchases,
    updated_at: new Date().toISOString(),
  });
}

export async function syncFromCloud() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data } = await supabase.from('user_data').select('*').eq('user_id', user.id).single();
  if (!data) return;

  useLifeStore.setState({
    xp: data.xp ?? 0,
    coins: data.coins ?? 0,
    quests: data.quests ?? [],
    events: data.events ?? [],
    purchases: data.purchases ?? [],
  });
}
