import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { areaById } from '../data';

export function AreaChip({ areaId }: { areaId: string }) {
  const area = areaById(areaId);
  return (
    <Text style={[styles.chip, { backgroundColor: area.color + '20', color: area.color, borderColor: area.color + '40' }]}>
      {area.emoji} {area.name}
    </Text>
  );
}

const styles = StyleSheet.create({
  chip: { fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
});
