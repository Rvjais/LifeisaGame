import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Stats({ history = [], todayPoints = 0, baselineHint = 50 }) {
  const stats = useMemo(() => {
    const days = history.length;
    const total = history.reduce((s, h) => s + (h.points || 0), 0);
    const avg = days ? Math.round(total / days) : 0;
    const baseline = Math.max(baselineHint, avg);
    const best = history.reduce((m, h) => Math.max(m, h.points || 0), 0);
    return { days, total, avg, baseline, best };
  }, [history, baselineHint]);

  const progressPercent = stats.baseline ? Math.min(100, Math.round((todayPoints / stats.baseline) * 100)) : 0;

  return (
    <View>
      <View style={styles.row}>
        <View>
          <Text style={styles.small}>Today</Text>
          <Text style={styles.big}>{todayPoints} pts</Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.small}>Baseline</Text>
          <Text style={styles.big}>{stats.baseline} pts</Text>
        </View>
      </View>

      <View style={styles.progressWrap}>
        <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
      </View>

      <View style={styles.rowSmall}>
        <Text style={styles.stat}>Days tracked: {stats.days}</Text>
        <Text style={styles.stat}>Avg: {stats.avg} pts</Text>
        <Text style={styles.stat}>Best: {stats.best} pts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  small: { color: '#ccc', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  big: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 1 },
  progressWrap: { height: 8, backgroundColor: '#333', borderRadius: 2, marginTop: 10, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#fff' },
  rowSmall: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  stat: { color: '#888', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }
});
