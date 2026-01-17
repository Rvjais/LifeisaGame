import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function Onboarding({ onFinish }) {
    const [name, setName] = useState('');

    const handleFinish = () => {
        if (name.trim()) {
            onFinish(name.trim());
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to Life is a Game</Text>
                <Text style={styles.subtitle}>What should we call you?</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    autoFocus
                />

                <TouchableOpacity onPress={handleFinish} style={styles.btn}>
                    <Text style={styles.btnText}>Start Game</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20 },
    content: { alignItems: 'center' },
    title: { fontSize: 28, fontWeight: '700', color: '#222', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
    input: { width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 16, fontSize: 18, marginBottom: 20, textAlign: 'center' },
    btn: { backgroundColor: '#222', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 8, width: '100%', alignItems: 'center' },
    btnText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});
