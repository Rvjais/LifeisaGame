import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { API_URL } from '../utils/config';

const { width } = Dimensions.get('window');

export default function AuthScreen({ onLogin }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!username || !password) {
            return Alert.alert('Error', 'Please fill in all fields');
        }

        setLoading(true);
        const endpoint = isRegister ? '/auth/register' : '/auth/login';

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, name: username })
            });

            const data = await response.json();

            if (response.ok) {
                onLogin({ username, password, serverUrl: API_URL, user: data.user });
            } else {
                Alert.alert('Error', data.error || 'Authentication failed');
            }
        } catch (e) {
            Alert.alert('Error', 'Connection failed: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0f0c29', '#302b63', '#24243e']}
                style={styles.background}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
                <View style={styles.card}>
                    <Text style={styles.title}>LIFE IS A GAME</Text>
                    <Text style={styles.subtitle}>{isRegister ? 'INITIATE PROTOCOL' : 'RESUME MISSION'}</Text>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>CODENAME</Text>
                            <TextInput
                                style={styles.input}
                                value={username}
                                onChangeText={setUsername}
                                placeholder="ENTER ID"
                                placeholderTextColor="#666"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>ACCESS CODE</Text>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="ENTER KEY"
                                placeholderTextColor="#666"
                                secureTextEntry
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#000" />
                            ) : (
                                <Text style={styles.btnText}>{isRegister ? 'ESTABLISH LINK' : 'AUTHENTICATE'}</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsRegister(!isRegister)} style={styles.switchBtn}>
                            <Text style={styles.switchText}>
                                {isRegister ? 'ALREADY OPERATIONAL? LOGIN' : "NEW RECRUIT? REGISTER"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.8
    },
    keyboardView: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    card: {
        width: width * 0.9,
        padding: 30,
        backgroundColor: '#111',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 4, // Sharper corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 2,
        textTransform: 'uppercase'
    },
    subtitle: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        marginBottom: 40,
        fontWeight: '700',
        letterSpacing: 3,
        textTransform: 'uppercase'
    },
    form: { gap: 24 },
    inputContainer: { gap: 10 },
    label: {
        fontSize: 10,
        fontWeight: '900',
        color: '#555',
        letterSpacing: 2,
        textTransform: 'uppercase'
    },
    input: {
        backgroundColor: '#000',
        borderRadius: 2,
        padding: 18,
        fontSize: 16,
        color: '#fff',
        borderWidth: 1,
        borderColor: '#333',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', // Monospaced for tech feel
    },
    submitBtn: {
        backgroundColor: '#fff', // High contrast
        padding: 18,
        borderRadius: 2,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    btnText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
        textTransform: 'uppercase'
    },
    switchBtn: { alignItems: 'center', marginTop: 20 },
    switchText: {
        color: '#444',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase'
    }
});
