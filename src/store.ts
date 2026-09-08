import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quest, XpEvent, Purchase, AreaId } from './types';
import { STARTER_QUESTS } from './data';

const uid = () => `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

interface LifeState {
  xp: number;
  coins: number;
  quests: Quest[];
  events: XpEvent[];
  purchases: Purchase[];
  toggleQuest: (id: string) => void;
  addQuest: (title: string, area: AreaId, xp: number, coins: number) => void;
  resetDay: () => void;
  buyItem: (itemId: string, title: string, cost: number) => boolean;
  logRest: (area: AreaId, note: string) => void;
}

export const useLifeStore = create<LifeState>()(
  persist(
    (set, get) => ({
      xp: 0,
      coins: 0,
      quests: STARTER_QUESTS,
      events: [],
      purchases: [],

      toggleQuest: (id) => {
        const q = get().quests.find((x) => x.id === id);
        if (!q) return;
        const done = !q.done;
        const ev: XpEvent = {
          id: uid(),
          type: 'task_done',
          area: q.area,
          xp: done ? q.xp : -q.xp,
          note: q.title,
          at: Date.now(),
        };
        set((s) => ({
          quests: s.quests.map((x) =>
            x.id === id ? { ...x, done, doneAt: done ? Date.now() : null } : x
          ),
          xp: Math.max(0, s.xp + ev.xp),
          coins: Math.max(0, s.coins + (done ? q.coins : -q.coins)),
          events: [ev, ...s.events].slice(0, 500),
        }));
      },

      addQuest: (title, area, xp, coins) =>
        set((s) => ({
          quests: [...s.quests, { id: uid(), title, area, xp, coins, done: false, doneAt: null }],
        })),

      resetDay: () =>
        set((s) => ({
          quests: s.quests.map((q) => ({ ...q, done: false, doneAt: null })),
        })),

      buyItem: (itemId, title, cost) => {
        if (get().coins < cost) return false;
        set((s) => ({
          coins: s.coins - cost,
          purchases: [{ id: uid(), itemId, title, cost, at: Date.now() }, ...s.purchases],
        }));
        return true;
      },

      logRest: (area, note) => {
        const xp = 20;
        const ev: XpEvent = { id: uid(), type: 'rest_logged', area, xp, note, at: Date.now() };
        set((s) => ({ xp: s.xp + xp, events: [ev, ...s.events].slice(0, 500) }));
      },
    }),
    { name: 'life-os-v1', storage: createJSONStorage(() => AsyncStorage) }
  )
);
