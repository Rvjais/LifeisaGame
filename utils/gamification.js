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

    // Level 1 at 0 XP
    // Level 2 at 500 XP
    // Level 3 at 1500 XP (500 + 1000)
    // Formula: Level = Math.floor((Math.sqrt(100 * (2 * totalPoints + 25)) + 50) / 100)
    // Simplified: Level = 1 + Math.floor(totalPoints / 1000); -> Linear is boring.

    // Let's use a simple quadratic curve: XP = Level^2 * 100
    // Level = Sqrt(XP / 100)
    if (netXp < 0) return { level: 1, progress: 0, nextLevelXp: 100, currentLevelXp: 0, netXp, decay };

    const level = Math.floor(Math.sqrt(netXp / 100)) + 1;
    const currentLevelXp = Math.pow(level - 1, 2) * 100;
    const nextLevelXp = Math.pow(level, 2) * 100;
    const progress = (netXp - currentLevelXp) / (nextLevelXp - currentLevelXp);

    return { level, progress, nextLevelXp, currentLevelXp, netXp, decay };
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
