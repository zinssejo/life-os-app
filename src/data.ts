import { LifeArea, Quest, ShopItem } from './types';

export const AREAS: LifeArea[] = [
  { id: 'schule', name: 'Schule', color: '#38bdf8', emoji: '📚' },
  { id: 'fll', name: 'FLL', color: '#fb7185', emoji: '🤖' },
  { id: 'fitness', name: 'Fitness', color: '#4ade80', emoji: '💪' },
  { id: 'soziales', name: 'Soziales', color: '#c084fc', emoji: '🎉' },
  { id: 'erholung', name: 'Erholung', color: '#fbbf24', emoji: '😴' },
];

export const areaById = (id: string) =>
  AREAS.find((a) => a.id === id) ?? AREAS[0];

// Level: Level n braucht n*(n-1)*50 XP gesamt. L1=0, L2=100, L3=300, L4=600 ...
export const xpForLevel = (level: number) => 50 * level * (level - 1);
export const levelForXp = (xp: number) => {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  return level;
};

export const STARTER_QUESTS: Quest[] = [
  { id: 'q1', title: 'Hausaufgaben erledigen', area: 'schule', xp: 30, coins: 10, done: false, doneAt: null },
  { id: 'q2', title: '30 Min für FLL bauen/coden', area: 'fll', xp: 40, coins: 15, done: false, doneAt: null },
  { id: 'q3', title: 'Bewegen: Spazieren oder Sport', area: 'fitness', xp: 30, coins: 10, done: false, doneAt: null },
  { id: 'q4', title: 'Zimmer/Desk aufräumen (5 Min)', area: 'erholung', xp: 15, coins: 5, done: false, doneAt: null },
  { id: 'q5', title: 'Rechtzeitig ins Bett (vor 23 Uhr)', area: 'erholung', xp: 25, coins: 10, done: false, doneAt: null },
  { id: 'q6', title: 'Zeit mit Freunden/Familie', area: 'soziales', xp: 25, coins: 10, done: false, doneAt: null },
];

export const SHOP_ITEMS: ShopItem[] = [
  { id: 's1', title: '30 Min Zocken', description: 'Guthaben für freies Gaming', cost: 30, emoji: '🎮' },
  { id: 's2', title: '1 Folge Serie', description: 'Entspannt eine Folge schauen', cost: 20, emoji: '📺' },
  { id: 's3', title: 'Snack holen', description: 'Lieblingssnack gönnen', cost: 15, emoji: '🍫' },
  { id: 's4', title: 'Freier Nachmittag', description: 'Keine Quests, nur chillen', cost: 60, emoji: '🏖️' },
];
