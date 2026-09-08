import { useLifeStore } from '../store';
import { uid } from '../store';

// Simulierte Health-Daten (Phase 2: echte Health Connect API)
export interface HealthData {
  steps: number;
  distance: number; // meters
  activeMinutes: number;
  calories: number;
}

export async function getTodayHealth(): Promise<HealthData> {
  // Simulated – echte Integration kommt mit Health Connect
  return { steps: 0, distance: 0, activeMinutes: 0, calories: 0 };
}

export function logHealthActivity(steps: number, activeMinutes: number) {
  const xpFromSteps = Math.floor(steps / 100) * 5; // 5 XP pro 100 Schritte
  const xpFromActive = activeMinutes * 3;
  const totalXp = xpFromSteps + xpFromActive;

  if (totalXp > 0) {
    const state = useLifeStore.getState();
    const ev = {
      id: uid(),
      type: 'health' as const,
      area: 'fitness' as const,
      xp: totalXp,
      note: `${steps} Schritte, ${activeMinutes} Min aktiv`,
      at: Date.now(),
    };
    useLifeStore.setState({
      xp: state.xp + totalXp,
      events: [ev, ...state.events].slice(0, 500),
    });
  }
  return totalXp;
}
