import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView, Platform } from 'react-native';

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
    container: { flex: 1, backgroundColor: '#000' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#111', borderBottomWidth: 1, borderBottomColor: '#333' },
    title: { fontSize: 24, fontWeight: '900', color: '#fff', letterSpacing: 1, textTransform: 'uppercase' },
    closeBtn: { padding: 8 },
    closeText: { fontSize: 16, color: '#ccc', fontWeight: '700', textTransform: 'uppercase' },
    content: { padding: 20 },
    card: { backgroundColor: '#111', padding: 20, borderRadius: 4, marginBottom: 16, borderWidth: 1, borderColor: '#333' },
    sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 12, color: '#fff', letterSpacing: 1, textTransform: 'uppercase' },
    progressBar: { height: 12, backgroundColor: '#333', borderRadius: 2, overflow: 'hidden', marginBottom: 8 },
    progressFill: { height: '100%', backgroundColor: '#fff' },
    xpText: { fontSize: 12, color: '#ccc', textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
    row: { flexDirection: 'row', marginBottom: 16 },
    statLabel: { fontSize: 12, color: '#ccc', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
    statValue: { fontSize: 24, fontWeight: '900', color: '#fff' },
    hint: { fontSize: 12, color: '#999', marginBottom: 8 },
    input: { borderWidth: 1, borderColor: '#333', borderRadius: 2, padding: 12, marginBottom: 16, fontSize: 16, backgroundColor: '#000', color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
    buttons: { flexDirection: 'row', gap: 12 },
    backupBtn: { flex: 1, backgroundColor: '#fff', padding: 14, borderRadius: 2, alignItems: 'center' },
    restoreBtn: { flex: 1, backgroundColor: '#000', borderWidth: 1, borderColor: '#333', padding: 14, borderRadius: 2, alignItems: 'center' },
    btnText: { fontSize: 14, fontWeight: '900', color: '#000', textTransform: 'uppercase', letterSpacing: 1 },
    restoreBtnText: { color: '#fff' }
});
// Fix restore button text color
styles.restoreBtn = { ...styles.restoreBtn, backgroundColor: '#fff' };
// Actually let's fix the styles object directly in the code above before writing.
