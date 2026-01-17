import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';

export default function ProfileModal({ visible, onClose, levelData, streak, onBackup, onRestore }) {

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: onRestore }
            ]
        );
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content}>

                    {/* Gamification Stats */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Level {levelData.level}</Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${levelData.progress * 100}%` }]} />
                        </View>
                        <Text style={styles.xpText}>
                            {Math.round(levelData.progress * (levelData.nextLevelXp - levelData.currentLevelXp))} / {levelData.nextLevelXp - levelData.currentLevelXp} XP to next level
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.card, { flex: 1, marginRight: 8 }]}>
                            <Text style={styles.statLabel}>Current Streak</Text>
                            <Text style={styles.statValue}>🔥 {streak}</Text>
                        </View>
                        <View style={[styles.card, { flex: 1, marginLeft: 8 }]}>
                            <Text style={styles.statLabel}>Net XP</Text>
                            <Text style={styles.statValue}>{levelData.netXp}</Text>
                            <Text style={styles.hint}>-{levelData.decay} decay</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Daily Decay</Text>
                        <Text style={styles.infoText}>
                            You lose 10 XP every day to simulate "forgetting" or "laziness".
                            Keep earning points to stay ahead and level up!
                        </Text>
                    </View>

                    {/* Sync & Account */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Account & Sync</Text>
                        <Text style={styles.infoText}>
                            Your data is automatically synced when you are online.
                        </Text>

                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.backupBtn} onPress={onBackup}>
                                <Text style={styles.btnText}>Force Sync</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.restoreBtn, { borderColor: '#ff3b30' }]} onPress={handleLogout}>
                                <Text style={[styles.btnText, { color: '#ff3b30' }]}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
    title: { fontSize: 24, fontWeight: '700' },
    closeBtn: { padding: 8 },
    closeText: { fontSize: 16, color: '#007AFF' },
    content: { padding: 20 },
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
    progressBar: { height: 10, backgroundColor: '#eee', borderRadius: 5, overflow: 'hidden', marginBottom: 8 },
    progressFill: { height: '100%', backgroundColor: '#4caf50' },
    xpText: { fontSize: 12, color: '#666', textAlign: 'center' },
    row: { flexDirection: 'row', marginBottom: 16 },
    statLabel: { fontSize: 14, color: '#666', marginBottom: 4 },
    statValue: { fontSize: 24, fontWeight: '700' },
    hint: { fontSize: 12, color: '#888', marginBottom: 8 },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16, backgroundColor: '#fafafa' },
    buttons: { flexDirection: 'row', gap: 12 },
    backupBtn: { flex: 1, backgroundColor: '#222', padding: 14, borderRadius: 8, alignItems: 'center' },
    restoreBtn: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#222', padding: 14, borderRadius: 8, alignItems: 'center' },
    btnText: { fontSize: 16, fontWeight: '600', color: '#fff' },
    restoreBtnText: { color: '#222' } // This style wasn't used but logic implies restoreBtn has different text color if we want.
});
// Fix restore button text color
styles.restoreBtn = { ...styles.restoreBtn, backgroundColor: '#fff' };
// Actually let's fix the styles object directly in the code above before writing.
