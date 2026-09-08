// Life OS – Datenmodell (Phase 1 lokal, Phase 2 Supabase-ready)
// xp_events-Typen sind bewusst schon fuer NFC/Health/Geofencing angelegt.

export type AreaId = 'schule' | 'fll' | 'fitness' | 'soziales' | 'erholung';

export interface LifeArea {
  id: AreaId;
  name: string;
  color: string;
  emoji: string;
}

export type XpEventType =
  | 'task_done' // Quest abgehakt
  | 'rest_logged' // Pause/Schlaf/Sozialzeit – gibt genauso XP
  | 'nfc_scan' // Phase 2: NFC-Tag gescannt (Modus-Wechsel)
  | 'health' // Phase 2: Health Connect (Schritte/Training)
  | 'geofence' // Phase 2: Ort betreten (Fitness/Schule)
  | 'manual'; // manuell eingetragen

export interface XpEvent {
  id: string;
  type: XpEventType;
  area: AreaId;
  xp: number;
  note: string;
  at: number; // timestamp ms
}

export interface Quest {
  id: string;
  title: string;
  area: AreaId;
  xp: number;
  coins: number;
  done: boolean;
  doneAt: number | null;
}

export interface ShopItem {
  id: string;
  title: string;
  description: string;
  cost: number; // Coins
  emoji: string;
}

export interface Purchase {
  id: string;
  itemId: string;
  title: string;
  cost: number;
  at: number;
}
