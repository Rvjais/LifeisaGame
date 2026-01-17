import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#efefef' },
  checkbox: { width: 28, height: 28, borderRadius: 6, borderWidth: 1.5, borderColor: '#999', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  checkboxOn: { backgroundColor: '#222', borderColor: '#222' },
  inner: { width: 12, height: 12, backgroundColor: '#fff', borderRadius: 2 },
  meta: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#111', fontSize: 16 },
  titleDone: { color: '#999', textDecorationLine: 'line-through' },
  points: { color: '#666' }
});
