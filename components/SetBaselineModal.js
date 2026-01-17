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
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
    modal: { backgroundColor: '#111', borderRadius: 4, padding: 24, borderWidth: 1, borderColor: '#333' },
    title: { fontSize: 20, fontWeight: '900', marginBottom: 8, textAlign: 'center', color: '#fff', textTransform: 'uppercase', letterSpacing: 1 },
    desc: { fontSize: 12, color: '#ccc', marginBottom: 24, textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
    input: { borderWidth: 1, borderColor: '#333', borderRadius: 2, padding: 14, marginBottom: 24, fontSize: 24, textAlign: 'center', backgroundColor: '#000', color: '#fff', fontWeight: 'bold' },
    buttons: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
    cancelBtn: { padding: 14, flex: 1, alignItems: 'center', borderWidth: 1, borderColor: '#333', borderRadius: 2 },
    cancelText: { color: '#ccc', fontSize: 14, fontWeight: '700', textTransform: 'uppercase' },
    saveBtn: { backgroundColor: '#fff', paddingVertical: 14, borderRadius: 2, flex: 1, alignItems: 'center' },
    saveText: { color: '#000', fontSize: 14, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 }
});
