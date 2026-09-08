import { useLifeStore } from '../store';
import { uid } from '../store';
import { AreaId } from '../types';

export interface GeofenceZone {
  id: string;
  name: string;
  area: AreaId;
  lat: number;
  lng: number;
  radius: number; // meters
  xpReward: number;
}

export const DEFAULT_ZONES: GeofenceZone[] = [
  { id: 'gym', name: 'Fitnessstudio', area: 'fitness', lat: 0, lng: 0, radius: 100, xpReward: 30 },
  { id: 'school', name: 'Schule', area: 'schule', lat: 0, lng: 0, radius: 150, xpReward: 25 },
];

let lastZone: string | null = null;

export function checkGeofence(userLat: number, userLng: number) {
  for (const zone of DEFAULT_ZONES) {
    const dist = haversine(userLat, userLng, zone.lat, zone.lng);
    if (dist <= zone.radius && lastZone !== zone.id) {
      lastZone = zone.id;
      const state = useLifeStore.getState();
      const ev = {
        id: uid(),
        type: 'geofence' as const,
        area: zone.area,
        xp: zone.xpReward,
        note: `${zone.name} betreten`,
        at: Date.now(),
      };
      useLifeStore.setState({
        xp: state.xp + zone.xpReward,
        events: [ev, ...state.events].slice(0, 500),
      });
      return zone;
    }
    if (dist > zone.radius * 1.5 && lastZone === zone.id) {
      lastZone = null;
    }
  }
  return null;
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
