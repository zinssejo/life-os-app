import NfcManager, { NfcTech } from 'react-native-nfc-manager';

export async function initNfc() {
  await NfcManager.start();
}

export async function readNfcTag(): Promise<string | null> {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    return tag?.id ?? null;
  } catch {
    return null;
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

export const NFC_PRESETS: Record<string, { mode: string; area: string }> = {
  'fll-building': { mode: 'fll', area: 'fll' },
  'gym-entry': { mode: 'fitness', area: 'fitness' },
  'school-gate': { mode: 'schule', area: 'schule' },
  'chill-zone': { mode: 'erholung', area: 'erholung' },
};
