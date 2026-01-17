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
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
    modal: { backgroundColor: '#fff', borderRadius: 12, padding: 20 },
    title: { fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 14, color: '#666', marginBottom: 6 },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 },
    buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    cancelBtn: { padding: 12 },
    cancelText: { color: '#666', fontSize: 16 },
    addBtn: { backgroundColor: '#222', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
    addText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
