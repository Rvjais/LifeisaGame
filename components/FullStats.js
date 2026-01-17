import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function FullStats({ history, goals, baseline, todayPoints, todayCompletions }) {
    const stats = useMemo(() => {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        const startOfYear = new Date(today.getFullYear(), 0, 1);

        let weekPoints = 0;
        let yearPoints = 0;
        const lossMap = {};
        const dailyPoints = {};

        // Initialize last 7 days with 0
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const k = d.toISOString().slice(0, 10);
            dailyPoints[k] = 0;
        }

        // Process History
        history.forEach(entry => {
            const entryDate = new Date(entry.date);
            const dateKey = entry.date;

            // Week & Year Points
            if (entryDate >= oneWeekAgo) weekPoints += entry.points;
            if (entryDate >= startOfYear) yearPoints += entry.points;

            // Graph Data
            if (dailyPoints.hasOwnProperty(dateKey)) {
                dailyPoints[dateKey] = entry.points;
            }

            // Loss Analysis
            if (entry.completions) {
                Object.keys(entry.completions).forEach(goalId => {
                    if (entry.completions[goalId]) {
                        const goal = goals.find(g => g.id === goalId);
                        if (goal && goal.points < 0) {
                            if (!lossMap[goalId]) lossMap[goalId] = { title: goal.title, totalLoss: 0, count: 0 };
                            lossMap[goalId].totalLoss += goal.points;
                            lossMap[goalId].count += 1;
                        }
                    }
                });
            }
        });

        // Process Today (Live Data)
        const todayKey = today.toISOString().slice(0, 10);
        weekPoints += todayPoints;
        yearPoints += todayPoints;
        dailyPoints[todayKey] = todayPoints;

        if (todayCompletions) {
            Object.keys(todayCompletions).forEach(goalId => {
                if (todayCompletions[goalId]) {
                    const goal = goals.find(g => g.id === goalId);
                    if (goal && goal.points < 0) {
                        if (!lossMap[goalId]) lossMap[goalId] = { title: goal.title, totalLoss: 0, count: 0 };
                        lossMap[goalId].totalLoss += goal.points;
                        lossMap[goalId].count += 1;
                    }
                }
            });
        }

        const losses = Object.values(lossMap).sort((a, b) => a.totalLoss - b.totalLoss);
        const graphData = Object.keys(dailyPoints).sort().map(date => ({
            date: date.slice(5), // MM-DD
            points: dailyPoints[date]
        }));

        return { weekPoints, yearPoints, losses, graphData };
    }, [history, goals, todayPoints, todayCompletions]);

    const todayPercent = baseline ? Math.min(100, Math.round((todayPoints / baseline) * 100)) : 0;
    const weekPercent = baseline ? Math.min(100, Math.round((stats.weekPoints / (baseline * 7)) * 100)) : 0;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Progress</Text>

            <View style={styles.row}>
                <View style={[styles.card, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.label}>Today</Text>
                    <Text style={styles.value}>{todayPercent}%</Text>
                    <Text style={styles.subValue}>{todayPoints} / {baseline}</Text>
                </View>
                <View style={[styles.card, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.label}>This Week</Text>
                    <Text style={styles.value}>{weekPercent}%</Text>
                    <Text style={styles.subValue}>{stats.weekPoints} pts</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Last 7 Days</Text>
                <View style={styles.graphContainer}>
                    {stats.graphData.map((day, index) => {
                        const height = Math.min(100, Math.max(10, (day.points / (baseline * 1.5)) * 100)); // Scale relative to baseline
                        return (
                            <View key={index} style={styles.barContainer}>
                                <View style={[styles.bar, { height: `${height}%`, backgroundColor: day.points >= baseline ? '#4caf50' : '#222' }]} />
                                <Text style={styles.barLabel}>{day.date}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>This Year</Text>
                <Text style={styles.value}>{stats.yearPoints} pts</Text>
            </View>

            <Text style={[styles.header, { marginTop: 24 }]}>What drags me down?</Text>
            {stats.losses.length === 0 ? (
                <Text style={styles.empty}>No bad habits recorded yet.</Text>
            ) : (
                stats.losses.map((loss, index) => (
                    <View key={index} style={styles.lossItem}>
                        <Text style={styles.lossTitle}>{loss.title}</Text>
                        <Text style={styles.lossValue}>{loss.totalLoss} pts</Text>
                        <Text style={styles.lossCount}>{loss.count} times</Text>
                    </View>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 22, fontWeight: '700', marginBottom: 16, color: '#222' },
    row: { flexDirection: 'row', marginBottom: 12 },
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 12, elevation: 1 },
    label: { fontSize: 14, color: '#666', marginBottom: 4 },
    value: { fontSize: 24, fontWeight: '700', color: '#222' },
    subValue: { fontSize: 12, color: '#888', marginTop: 2 },
    empty: { color: '#888', fontStyle: 'italic' },
    lossItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 8 },
    lossTitle: { flex: 1, fontSize: 16, color: '#333' },
    lossValue: { fontSize: 16, fontWeight: '700', color: '#d32f2f', marginRight: 12 },
    lossCount: { fontSize: 12, color: '#888' },
    graphContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 150, marginTop: 10, paddingBottom: 20 },
    barContainer: { alignItems: 'center', flex: 1 },
    bar: { width: 12, borderRadius: 4 },
    barLabel: { fontSize: 10, color: '#666', marginTop: 4 }
});
