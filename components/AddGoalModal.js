import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function AddGoalModal({ visible, onClose, onAdd, goalToEdit }) {
    const [title, setTitle] = useState('');
    const [points, setPoints] = useState('');

    useEffect(() => {
        if (visible) {
            if (goalToEdit) {
                setTitle(goalToEdit.title);
                setPoints(goalToEdit.points.toString());
            } else {
                setTitle('');
                setPoints('');
            }
        }
    }, [visible, goalToEdit]);

    const handleAdd = () => {
        if (!title.trim() || !points.trim()) return;
        const pointsNum = parseInt(points, 10);
        if (isNaN(pointsNum)) return;

        onAdd({ title: title.trim(), points: pointsNum });
        setTitle('');
        setPoints('');
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{goalToEdit ? 'Edit Goal' : 'New Goal'}</Text>

                    <Text style={styles.label}>Goal Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Ate Junk Food"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.label}>Points (negative for bad habits)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. -50 or 20"
                        value={points}
                        onChangeText={setPoints}
                        keyboardType="numeric"
                    />

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleAdd} style={styles.addBtn}>
                            <Text style={styles.addText}>{goalToEdit ? 'Save' : 'Add Goal'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
    modal: { backgroundColor: '#111', borderRadius: 4, padding: 24, borderWidth: 1, borderColor: '#333' },
    title: { fontSize: 20, fontWeight: '900', marginBottom: 24, textAlign: 'center', color: '#fff', textTransform: 'uppercase', letterSpacing: 1 },
    label: { fontSize: 12, color: '#ccc', marginBottom: 8, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
    input: { borderWidth: 1, borderColor: '#333', borderRadius: 2, padding: 14, marginBottom: 20, fontSize: 16, backgroundColor: '#000', color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
    buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
    cancelBtn: { padding: 14, flex: 1, alignItems: 'center', borderWidth: 1, borderColor: '#333', borderRadius: 2 },
    cancelText: { color: '#ccc', fontSize: 14, fontWeight: '700', textTransform: 'uppercase' },
    addBtn: { backgroundColor: '#fff', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 2, flex: 1, alignItems: 'center' },
    addText: { color: '#000', fontSize: 14, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 }
});
