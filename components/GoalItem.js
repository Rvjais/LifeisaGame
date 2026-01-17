import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default function GoalItem({ item, completed, onToggle, onLongPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onToggle} onLongPress={onLongPress} delayLongPress={500}>
      <View style={[styles.checkbox, completed && styles.checkboxOn]}>
        {completed ? <View style={styles.inner} /> : null}
      </View>
      <View style={styles.meta}>
        <Text style={[styles.title, completed && styles.titleDone]}>{item.title}</Text>
        <Text style={styles.points}>{item.points} pts</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#222', backgroundColor: '#000' },
  checkbox: { width: 24, height: 24, borderRadius: 2, borderWidth: 2, borderColor: '#777', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  checkboxOn: { backgroundColor: '#fff', borderColor: '#fff' },
  inner: { width: 12, height: 12, backgroundColor: '#000', borderRadius: 0 },
  meta: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 0.5, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  titleDone: { color: '#777', textDecorationLine: 'line-through' },
  points: { color: '#ccc', fontWeight: '700', fontSize: 12 }
});
