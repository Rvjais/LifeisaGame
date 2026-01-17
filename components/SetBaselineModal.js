import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function SetBaselineModal({ visible, currentBaseline, onClose, onSave }) {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (visible) {
            setValue(currentBaseline.toString());
        }
    }, [visible, currentBaseline]);

    const handleSave = () => {
        const num = parseInt(value, 10);
        if (!isNaN(num) && num > 0) {
            onSave(num);
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Set Daily Baseline</Text>
                    <Text style={styles.desc}>The target points you want to achieve each day.</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 50"
                        value={value}
                        onChangeText={setValue}
                        keyboardType="numeric"
                        autoFocus
                    />

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                            <Text style={styles.saveText}>Save</Text>
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
    title: { fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
    desc: { fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 18, textAlign: 'center' },
    buttons: { flexDirection: 'row', justifyContent: 'space-between' },
    cancelBtn: { padding: 12, flex: 1, alignItems: 'center' },
    cancelText: { color: '#666', fontSize: 16 },
    saveBtn: { backgroundColor: '#222', paddingVertical: 12, borderRadius: 8, flex: 1, alignItems: 'center', marginLeft: 10 },
    saveText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
