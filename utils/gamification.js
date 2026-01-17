export const calculateLevel = (totalPoints, startDate) => {
    // Daily Decay: Lose 10 XP per day since start
    const DAILY_DECAY = 10;

    let daysSinceStart = 0;
    if (startDate) {
        const start = new Date(startDate);
        const now = new Date();
        const diffTime = Math.abs(now - start);
        daysSinceStart = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const decay = daysSinceStart * DAILY_DECAY;
    const netXp = Math.max(0, totalPoints - decay);

    // New Formula:
    // Lvl 1 -> 2: 1000 XP
    // Lvl 2 -> 3: 2000 XP (+1000 increment)
    // Lvl 3 -> 4: 3500 XP (+1500 increment)
    // Lvl 4 -> 5: 5500 XP (+2000 increment)

    let level = 1;
    let xpRequiredForNextLevel = 1000;
    let increment = 1000;
    let currentLevelBaseXp = 0;

    while (netXp >= currentLevelBaseXp + xpRequiredForNextLevel) {
        currentLevelBaseXp += xpRequiredForNextLevel;
        level++;

        // Prepare for next level
        xpRequiredForNextLevel += increment;
        increment += 500;
    }

    const nextLevelTotalXp = currentLevelBaseXp + xpRequiredForNextLevel;
    const progress = (netXp - currentLevelBaseXp) / (nextLevelTotalXp - currentLevelBaseXp);

    return { level, progress, nextLevelXp: nextLevelTotalXp, currentLevelXp: currentLevelBaseXp, netXp, decay };
};

export const calculateStreak = (history, baseline, todayPoints) => {
    if (!baseline) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check today
    if (todayPoints >= baseline) {
        streak++;
    }

    // Check history backwards
    // History is typically sorted by date ascending, so we reverse or iterate backwards
    // But history dates are strings "YYYY-MM-DD"

    const sortedHistory = [...history].sort((a, b) => b.date.localeCompare(a.date));

    let currentCheckDate = new Date(today);
    currentCheckDate.setDate(currentCheckDate.getDate() - 1); // Start checking from yesterday

    for (let i = 0; i < sortedHistory.length; i++) {
        const entry = sortedHistory[i];
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0); // Normalize

        // If we skip a day in history (gap), streak breaks
        // We need to ensure the entry date matches currentCheckDate

        // Calculate difference in days
        const diffTime = currentCheckDate.getTime() - entryDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            // This is the day we are looking for
            if (entry.points >= baseline) {
                streak++;
                currentCheckDate.setDate(currentCheckDate.getDate() - 1); // Move to previous day
            } else {
                break; // Baseline not met, streak ends
            }
        } else if (diffDays > 0) {
            // Gap found, streak ends (unless we haven't started counting history yet and today wasn't done? No, if gap, streak breaks)
            break;
        }
        // If diffDays < 0, it means history has future dates? Should not happen with sorted desc.
    }

    return streak;
};
