import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { API_URL } from '../utils/config';

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
                body: JSON.stringify({ username, password, name: username }) // Use username as name for simplicity
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
            <Text style={styles.title}>Life is a Game</Text>
            <Text style={styles.subtitle}>{isRegister ? 'Create Account' : 'Welcome Back'}</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter username"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    secureTextEntry
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.btnText}>{isRegister ? 'Register & Start' : 'Login & Sync'}</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsRegister(!isRegister)} style={styles.switchBtn}>
                    <Text style={styles.switchText}>
                        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 18, color: '#666', textAlign: 'center', marginBottom: 40 },
    form: { gap: 16 },
    label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4 },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fafafa' },
    submitBtn: { backgroundColor: '#222', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    switchBtn: { alignItems: 'center', marginTop: 20 },
    switchText: { color: '#007AFF', fontSize: 14 }
});
